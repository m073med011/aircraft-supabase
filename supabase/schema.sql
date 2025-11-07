-- =====================================================
-- MILITARY DATA PLATFORM - COMPLETE DATABASE SCHEMA
-- =====================================================
-- This schema includes:
-- - User profiles with role-based access control
-- - Countries, Weapons, Armies, and Relations
-- - Reactions system (like, dislike, love)
-- - Storage buckets for media files
-- - Row Level Security (RLS) policies
-- - Helper functions and triggers
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE reaction_type AS ENUM ('like', 'dislike', 'love');
CREATE TYPE relation_type AS ENUM ('ownership', 'usage', 'export', 'import');

-- =====================================================
-- PROFILES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- COUNTRIES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL UNIQUE, -- ISO country code (e.g., 'US', 'RU', 'CN')
    flag_url TEXT,
    description TEXT,
    population BIGINT,
    gdp DECIMAL(15, 2),
    military_budget DECIMAL(15, 2),
    active_personnel INTEGER,
    reserve_personnel INTEGER,
    total_aircraft INTEGER,
    total_tanks INTEGER,
    total_naval_assets INTEGER,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- WEAPONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.weapons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g., 'Aircraft', 'Tank', 'Naval', 'Missile'
    type TEXT, -- e.g., 'Fighter Jet', 'Main Battle Tank'
    manufacturer TEXT,
    origin_country_id UUID REFERENCES public.countries(id) ON DELETE SET NULL,
    description TEXT,
    specifications JSONB, -- Store technical specs as JSON
    image_url TEXT,
    video_url TEXT,
    first_deployed INTEGER,
    unit_cost DECIMAL(15, 2),
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ARMIES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.armies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    branch TEXT NOT NULL, -- e.g., 'Air Force', 'Navy', 'Army', 'Special Forces'
    description TEXT,
    personnel_count INTEGER,
    headquarters TEXT,
    founded_year INTEGER,
    logo_url TEXT,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(country_id, name)
);

-- =====================================================
-- COUNTRY-WEAPON RELATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.country_weapon_relations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
    weapon_id UUID NOT NULL REFERENCES public.weapons(id) ON DELETE CASCADE,
    relation_type relation_type NOT NULL,
    quantity INTEGER,
    start_year INTEGER,
    end_year INTEGER,
    notes TEXT,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- REACTIONS TABLE (Polymorphic)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.reactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    entity_type TEXT NOT NULL, -- 'country', 'weapon', 'army', 'relation'
    entity_id UUID NOT NULL,
    reaction_type reaction_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, entity_type, entity_id, reaction_type)
);

-- Add indexes for reactions
CREATE INDEX idx_reactions_entity ON public.reactions(entity_type, entity_id);
CREATE INDEX idx_reactions_user ON public.reactions(user_id);

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================

-- Create storage buckets for media files
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('weapons', 'weapons', true),
    ('armies', 'armies', true),
    ('countries', 'countries', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = user_id AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get reaction counts for an entity
CREATE OR REPLACE FUNCTION get_reaction_counts(entity_type_param TEXT, entity_id_param UUID)
RETURNS TABLE (
    like_count BIGINT,
    dislike_count BIGINT,
    love_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*) FILTER (WHERE reaction_type = 'like') as like_count,
        COUNT(*) FILTER (WHERE reaction_type = 'dislike') as dislike_count,
        COUNT(*) FILTER (WHERE reaction_type = 'love') as love_count
    FROM public.reactions
    WHERE entity_type = entity_type_param AND entity_id = entity_id_param;
END;
$$ LANGUAGE plpgsql;

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger to update updated_at on profiles
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at on countries
CREATE TRIGGER update_countries_updated_at
    BEFORE UPDATE ON public.countries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at on weapons
CREATE TRIGGER update_weapons_updated_at
    BEFORE UPDATE ON public.weapons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at on armies
CREATE TRIGGER update_armies_updated_at
    BEFORE UPDATE ON public.armies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at on relations
CREATE TRIGGER update_relations_updated_at
    BEFORE UPDATE ON public.country_weapon_relations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at on reactions
CREATE TRIGGER update_reactions_updated_at
    BEFORE UPDATE ON public.reactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger to handle new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weapons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.armies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.country_weapon_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PROFILES POLICIES
-- =====================================================

-- Anyone can view profiles
CREATE POLICY "Profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- =====================================================
-- COUNTRIES POLICIES
-- =====================================================

-- Everyone can view countries
CREATE POLICY "Countries are viewable by everyone"
    ON public.countries FOR SELECT
    USING (true);

-- Only admins can insert countries
CREATE POLICY "Admins can insert countries"
    ON public.countries FOR INSERT
    WITH CHECK (is_admin(auth.uid()));

-- Only admins can update countries
CREATE POLICY "Admins can update countries"
    ON public.countries FOR UPDATE
    USING (is_admin(auth.uid()));

-- Only admins can delete countries
CREATE POLICY "Admins can delete countries"
    ON public.countries FOR DELETE
    USING (is_admin(auth.uid()));

-- =====================================================
-- WEAPONS POLICIES
-- =====================================================

-- Everyone can view weapons
CREATE POLICY "Weapons are viewable by everyone"
    ON public.weapons FOR SELECT
    USING (true);

-- Only admins can insert weapons
CREATE POLICY "Admins can insert weapons"
    ON public.weapons FOR INSERT
    WITH CHECK (is_admin(auth.uid()));

-- Only admins can update weapons
CREATE POLICY "Admins can update weapons"
    ON public.weapons FOR UPDATE
    USING (is_admin(auth.uid()));

-- Only admins can delete weapons
CREATE POLICY "Admins can delete weapons"
    ON public.weapons FOR DELETE
    USING (is_admin(auth.uid()));

-- =====================================================
-- ARMIES POLICIES
-- =====================================================

-- Everyone can view armies
CREATE POLICY "Armies are viewable by everyone"
    ON public.armies FOR SELECT
    USING (true);

-- Only admins can insert armies
CREATE POLICY "Admins can insert armies"
    ON public.armies FOR INSERT
    WITH CHECK (is_admin(auth.uid()));

-- Only admins can update armies
CREATE POLICY "Admins can update armies"
    ON public.armies FOR UPDATE
    USING (is_admin(auth.uid()));

-- Only admins can delete armies
CREATE POLICY "Admins can delete armies"
    ON public.armies FOR DELETE
    USING (is_admin(auth.uid()));

-- =====================================================
-- RELATIONS POLICIES
-- =====================================================

-- Everyone can view relations
CREATE POLICY "Relations are viewable by everyone"
    ON public.country_weapon_relations FOR SELECT
    USING (true);

-- Only admins can insert relations
CREATE POLICY "Admins can insert relations"
    ON public.country_weapon_relations FOR INSERT
    WITH CHECK (is_admin(auth.uid()));

-- Only admins can update relations
CREATE POLICY "Admins can update relations"
    ON public.country_weapon_relations FOR UPDATE
    USING (is_admin(auth.uid()));

-- Only admins can delete relations
CREATE POLICY "Admins can delete relations"
    ON public.country_weapon_relations FOR DELETE
    USING (is_admin(auth.uid()));

-- =====================================================
-- REACTIONS POLICIES
-- =====================================================

-- Everyone can view reactions
CREATE POLICY "Reactions are viewable by everyone"
    ON public.reactions FOR SELECT
    USING (true);

-- Authenticated users can insert reactions
CREATE POLICY "Authenticated users can insert reactions"
    ON public.reactions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own reactions
CREATE POLICY "Users can update own reactions"
    ON public.reactions FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own reactions
CREATE POLICY "Users can delete own reactions"
    ON public.reactions FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- STORAGE POLICIES
-- =====================================================

-- Anyone can view files in public buckets
CREATE POLICY "Public Access"
    ON storage.objects FOR SELECT
    USING (bucket_id IN ('weapons', 'armies', 'countries'));

-- Only admins can upload files
CREATE POLICY "Admins can upload files"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id IN ('weapons', 'armies', 'countries') 
        AND is_admin(auth.uid())
    );

-- Only admins can update files
CREATE POLICY "Admins can update files"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id IN ('weapons', 'armies', 'countries') 
        AND is_admin(auth.uid())
    );

-- Only admins can delete files
CREATE POLICY "Admins can delete files"
    ON storage.objects FOR DELETE
    USING (
        bucket_id IN ('weapons', 'armies', 'countries') 
        AND is_admin(auth.uid())
    );

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_countries_code ON public.countries(code);
CREATE INDEX idx_countries_name ON public.countries(name);
CREATE INDEX idx_weapons_category ON public.weapons(category);
CREATE INDEX idx_weapons_origin ON public.weapons(origin_country_id);
CREATE INDEX idx_armies_country ON public.armies(country_id);
CREATE INDEX idx_relations_country ON public.country_weapon_relations(country_id);
CREATE INDEX idx_relations_weapon ON public.country_weapon_relations(weapon_id);
CREATE INDEX idx_relations_type ON public.country_weapon_relations(relation_type);

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample countries
-- INSERT INTO public.countries (name, code, description, population, military_budget)
-- VALUES 
--     ('United States', 'US', 'United States of America', 331000000, 801000000000),
--     ('Russia', 'RU', 'Russian Federation', 145900000, 65900000000),
--     ('China', 'CN', 'People''s Republic of China', 1400000000, 293000000000)
-- ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- VIEWS FOR ENHANCED QUERIES
-- =====================================================

-- View for countries with reaction counts
CREATE OR REPLACE VIEW countries_with_reactions AS
SELECT 
    c.*,
    COALESCE(r.like_count, 0) as like_count,
    COALESCE(r.dislike_count, 0) as dislike_count,
    COALESCE(r.love_count, 0) as love_count
FROM public.countries c
LEFT JOIN LATERAL (
    SELECT 
        COUNT(*) FILTER (WHERE reaction_type = 'like') as like_count,
        COUNT(*) FILTER (WHERE reaction_type = 'dislike') as dislike_count,
        COUNT(*) FILTER (WHERE reaction_type = 'love') as love_count
    FROM public.reactions
    WHERE entity_type = 'country' AND entity_id = c.id
) r ON true;

-- View for weapons with reaction counts
CREATE OR REPLACE VIEW weapons_with_reactions AS
SELECT 
    w.*,
    COALESCE(r.like_count, 0) as like_count,
    COALESCE(r.dislike_count, 0) as dislike_count,
    COALESCE(r.love_count, 0) as love_count
FROM public.weapons w
LEFT JOIN LATERAL (
    SELECT 
        COUNT(*) FILTER (WHERE reaction_type = 'like') as like_count,
        COUNT(*) FILTER (WHERE reaction_type = 'dislike') as dislike_count,
        COUNT(*) FILTER (WHERE reaction_type = 'love') as love_count
    FROM public.reactions
    WHERE entity_type = 'weapon' AND entity_id = w.id
) r ON true;

-- View for armies with reaction counts
CREATE OR REPLACE VIEW armies_with_reactions AS
SELECT 
    a.*,
    COALESCE(r.like_count, 0) as like_count,
    COALESCE(r.dislike_count, 0) as dislike_count,
    COALESCE(r.love_count, 0) as love_count
FROM public.armies a
LEFT JOIN LATERAL (
    SELECT 
        COUNT(*) FILTER (WHERE reaction_type = 'like') as like_count,
        COUNT(*) FILTER (WHERE reaction_type = 'dislike') as dislike_count,
        COUNT(*) FILTER (WHERE reaction_type = 'love') as love_count
    FROM public.reactions
    WHERE entity_type = 'army' AND entity_id = a.id
) r ON true;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- =====================================================
-- END OF SCHEMA
-- =====================================================

