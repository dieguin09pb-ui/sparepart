import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import OpenAI from "openai";
import { buildSystemPrompt } from "@/lib/openai/prompts";
import { diagnosisJsonSchema, type DiagnosisResult } from "@/types/diagnosis";

// Simple in-memory rate limiter (resets on cold start — use Vercel KV for prod)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 }); // 1h window
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: {
    deviceId: number;
    deviceName: string;
    commonIssues: string[];
    problemText: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { deviceId, deviceName, commonIssues, problemText } = body;

  if (!deviceId || !deviceName || !problemText?.trim()) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Fetch device parts for AI context
  const supabase = await createClient();
  const { data: parts } = await supabase
    .from("parts")
    .select("id, name, category, description, price_usd_est")
    .eq("device_id", deviceId);

  const systemPrompt = buildSystemPrompt(
    deviceName,
    commonIssues ?? [],
    parts ?? []
  );

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_schema", json_schema: diagnosisJsonSchema },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: problemText.trim() },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return Response.json(
        { error: "No response from AI" },
        { status: 502 }
      );
    }

    const result: DiagnosisResult = JSON.parse(content);
    return Response.json(result);
  } catch (err) {
    console.error("OpenAI error:", err);
    return Response.json(
      { error: "AI service unavailable. Please try again." },
      { status: 502 }
    );
  }
}
