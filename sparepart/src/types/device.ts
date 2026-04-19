export interface Category {
  id: number;
  slug: string;
  name: string;
  icon_emoji: string | null;
  sort_order: number;
}

export interface Device {
  id: number;
  category_id: number | null;
  slug: string;
  name: string;
  brand: string;
  model_year: number | null;
  model_file: string | null;
  thumbnail_url: string | null;
  description: string | null;
  common_issues: string[] | null;
  is_popular: boolean;
  created_at: string;
  category?: Category;
}

export interface BuyLink {
  store: string;
  label: string;
  url: string;
}

export interface Part {
  id: number;
  device_id: number;
  name: string;
  part_number: string | null;
  category: string | null;
  description: string | null;
  price_usd_est: number | null;
  buy_links: BuyLink[];
  created_at: string;
}

export interface RepairHistory {
  id: string;
  user_id: string;
  device_id: number;
  problem_text: string;
  diagnosis: DiagnosisResult;
  created_at: string;
  device?: Device;
}

// Import from diagnosis.ts
import type { DiagnosisResult } from "./diagnosis";
