-- Enable trigram extension for fast text search
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ─────────────────────────────────────────
-- categories
-- ─────────────────────────────────────────
CREATE TABLE public.categories (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  icon_emoji  TEXT,
  sort_order  INT DEFAULT 0
);

-- ─────────────────────────────────────────
-- devices
-- ─────────────────────────────────────────
CREATE TABLE public.devices (
  id              SERIAL PRIMARY KEY,
  category_id     INT REFERENCES public.categories(id),
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  brand           TEXT NOT NULL,
  model_year      INT,
  model_file      TEXT,
  thumbnail_url   TEXT,
  description     TEXT,
  common_issues   TEXT[],
  is_popular      BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX devices_name_search_idx ON public.devices
  USING GIN ((name || ' ' || brand) gin_trgm_ops);

-- ─────────────────────────────────────────
-- parts
-- ─────────────────────────────────────────
CREATE TABLE public.parts (
  id              SERIAL PRIMARY KEY,
  device_id       INT REFERENCES public.devices(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  part_number     TEXT,
  category        TEXT,
  description     TEXT,
  price_usd_est   NUMERIC(8,2),
  buy_links       JSONB NOT NULL DEFAULT '[]'::JSONB,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX parts_device_idx ON public.parts(device_id);

-- ─────────────────────────────────────────
-- profiles (extends Supabase auth.users)
-- ─────────────────────────────────────────
CREATE TABLE public.profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url   TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ─────────────────────────────────────────
-- repair_history
-- ─────────────────────────────────────────
CREATE TABLE public.repair_history (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  device_id       INT REFERENCES public.devices(id),
  problem_text    TEXT NOT NULL,
  diagnosis       JSONB NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX repair_history_user_idx ON public.repair_history(user_id, created_at DESC);

-- ─────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────
ALTER TABLE public.categories     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devices        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repair_history ENABLE ROW LEVEL SECURITY;

-- Public read access on catalog tables
CREATE POLICY "Public read categories" ON public.categories  FOR SELECT USING (true);
CREATE POLICY "Public read devices"    ON public.devices     FOR SELECT USING (true);
CREATE POLICY "Public read parts"      ON public.parts       FOR SELECT USING (true);

-- Profiles: own row only
CREATE POLICY "Users read own profile"   ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Repair history: own rows only
CREATE POLICY "Users read own history"   ON public.repair_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own history" ON public.repair_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own history" ON public.repair_history FOR DELETE USING (auth.uid() = user_id);
