export interface RepairStep {
  step_number: number;
  title: string;
  description: string;
  tools_needed: string[];
}

export interface PartRecommendation {
  part_id: number | null;
  name: string;
  reason: string;
  estimated_price_usd: number | null;
  is_catalog_part: boolean;
}

export interface DiagnosisResult {
  summary: string;
  likely_causes: string[];
  difficulty: "easy" | "medium" | "hard";
  estimated_time_minutes: number;
  estimated_cost_usd: { min: number; max: number };
  repair_steps: RepairStep[];
  parts_needed: PartRecommendation[];
  safety_warnings: string[];
  sustainability_note: string;
}

// OpenAI strict JSON schema for structured output
export const diagnosisJsonSchema = {
  name: "diagnosis_result",
  strict: true,
  schema: {
    type: "object" as const,
    required: [
      "summary",
      "likely_causes",
      "difficulty",
      "estimated_time_minutes",
      "estimated_cost_usd",
      "repair_steps",
      "parts_needed",
      "safety_warnings",
      "sustainability_note",
    ],
    additionalProperties: false,
    properties: {
      summary: { type: "string" },
      likely_causes: { type: "array", items: { type: "string" } },
      difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
      estimated_time_minutes: { type: "integer" },
      estimated_cost_usd: {
        type: "object",
        required: ["min", "max"],
        additionalProperties: false,
        properties: {
          min: { type: "number" },
          max: { type: "number" },
        },
      },
      repair_steps: {
        type: "array",
        items: {
          type: "object",
          required: ["step_number", "title", "description", "tools_needed"],
          additionalProperties: false,
          properties: {
            step_number: { type: "integer" },
            title: { type: "string" },
            description: { type: "string" },
            tools_needed: { type: "array", items: { type: "string" } },
          },
        },
      },
      parts_needed: {
        type: "array",
        items: {
          type: "object",
          required: [
            "part_id",
            "name",
            "reason",
            "estimated_price_usd",
            "is_catalog_part",
          ],
          additionalProperties: false,
          properties: {
            part_id: { type: ["integer", "null"] },
            name: { type: "string" },
            reason: { type: "string" },
            estimated_price_usd: { type: ["number", "null"] },
            is_catalog_part: { type: "boolean" },
          },
        },
      },
      safety_warnings: { type: "array", items: { type: "string" } },
      sustainability_note: { type: "string" },
    },
  },
};
