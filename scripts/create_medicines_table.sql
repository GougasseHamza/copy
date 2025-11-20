-- Medicine Database Setup Script
-- PostgreSQL with pg_trgm extension for fuzzy search

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Drop existing table if needed
DROP TABLE IF EXISTS medicines CASCADE;

-- Create medicines table
CREATE TABLE medicines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    search_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    usage TEXT,
    dosage VARCHAR(50),
    form VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for fast search
CREATE INDEX idx_medicine_name ON medicines (name);
CREATE INDEX idx_medicine_search_gin ON medicines USING GIN (search_name gin_trgm_ops);
CREATE INDEX idx_medicine_name_gin ON medicines USING GIN (name gin_trgm_ops);
CREATE INDEX idx_medicine_price ON medicines (price);
CREATE INDEX idx_medicine_form ON medicines (form) WHERE form IS NOT NULL;

-- Create full-text search index for usage (symptoms)
CREATE INDEX idx_medicine_usage_fts ON medicines USING GIN (to_tsvector('french', usage));

-- Function to automatically update search_name
CREATE OR REPLACE FUNCTION update_search_name()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_name := regexp_replace(lower(unaccent(NEW.name)), '[^a-z0-9\s]', '', 'g');
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to maintain search_name
CREATE TRIGGER trigger_update_search_name
    BEFORE INSERT OR UPDATE OF name ON medicines
    FOR EACH ROW
    EXECUTE FUNCTION update_search_name();

-- Sample queries for testing

-- 1. Exact search
-- SELECT * FROM medicines WHERE name ILIKE '%atorva%' LIMIT 10;

-- 2. Fuzzy search by name
-- SELECT
--     id, name, price,
--     similarity(search_name, 'atorva') as score
-- FROM medicines
-- WHERE search_name % 'atorva'
-- ORDER BY score DESC
-- LIMIT 20;

-- 3. Search by symptoms (full-text search on usage)
-- SELECT
--     id, name, price,
--     ts_rank(to_tsvector('french', usage), plainto_tsquery('french', 'hypertension')) as rank
-- FROM medicines
-- WHERE to_tsvector('french', usage) @@ plainto_tsquery('french', 'hypertension')
-- ORDER BY rank DESC
-- LIMIT 20;

-- 4. Combined fuzzy + symptom search
-- WITH name_matches AS (
--     SELECT id, similarity(search_name, 'atorva') as name_score
--     FROM medicines
--     WHERE search_name % 'atorva'
-- ),
-- symptom_matches AS (
--     SELECT id, ts_rank(to_tsvector('french', usage), plainto_tsquery('french', 'cholesterol')) as symptom_score
--     FROM medicines
--     WHERE to_tsvector('french', usage) @@ plainto_tsquery('french', 'cholesterol')
-- )
-- SELECT
--     m.*,
--     COALESCE(nm.name_score, 0) + COALESCE(sm.symptom_score, 0) as total_score
-- FROM medicines m
-- LEFT JOIN name_matches nm ON m.id = nm.id
-- LEFT JOIN symptom_matches sm ON m.id = sm.id
-- WHERE nm.id IS NOT NULL OR sm.id IS NOT NULL
-- ORDER BY total_score DESC
-- LIMIT 20;

-- Grant permissions (adjust as needed)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON medicines TO your_api_user;
-- GRANT USAGE, SELECT ON SEQUENCE medicines_id_seq TO your_api_user;
