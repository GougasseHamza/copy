# Medicine Database Setup & Fuzzy Search

Complete guide for setting up the medicine database with fuzzy search functionality.

## 📁 Files Overview

### Data Files
- `assets/medicament_filtered_price_usage.csv` - Original medicine data (3,143 entries)
- `assets/medicines_cleaned.json` - Cleaned and normalized data (3,141 medicines)

### Scripts
- `analyze_medicines.py` - Analyze CSV structure and data quality
- `clean_medicines.py` - Clean and normalize medicine data
- `import_to_database.py` - Import data to PostgreSQL
- `create_medicines_table.sql` - SQL schema with fuzzy search setup

### Documentation
- `FUZZY_SEARCH_GUIDE.md` - Complete fuzzy search implementation guide

## 🚀 Quick Start

### Step 1: Analyze Original Data
```bash
python3 scripts/analyze_medicines.py
```

### Step 2: Clean and Normalize Data
```bash
python3 scripts/clean_medicines.py
```

This creates `assets/medicines_cleaned.json` with:
- Normalized drug names
- Cleaned prices
- Extracted dosage information
- Extracted pharmaceutical forms
- Search-friendly name variations

### Step 3: Setup Database

**Create PostgreSQL database:**
```bash
psql -U postgres
CREATE DATABASE pharmacy;
\c pharmacy
```

**Run schema script:**
```bash
psql -U postgres -d pharmacy -f scripts/create_medicines_table.sql
```

This will:
- Enable `pg_trgm` extension for fuzzy search
- Create `medicines` table with proper indexes
- Setup triggers for automatic search_name normalization

### Step 4: Import Data
```bash
# Install required Python package
pip install psycopg2-binary

# Run import script
python3 scripts/import_to_database.py --database pharmacy --user postgres
```

## 🔍 Fuzzy Search Implementation

### Option 1: PostgreSQL pg_trgm (Recommended)

**Advantages:**
- Built into PostgreSQL
- No additional dependencies
- Fast with proper indexes
- Works well for typos and partial matches

**Java Repository Example:**
```java
@Query(value = "SELECT m.*, similarity(m.search_name, :query) as score " +
               "FROM medicines m " +
               "WHERE m.search_name % :query " +
               "ORDER BY score DESC " +
               "LIMIT :limit",
       nativeQuery = true)
List<Medicine> fuzzySearch(@Param("query") String query, @Param("limit") int limit);
```

### Option 2: Apache Commons Text

**For in-memory search:**
```java
import org.apache.commons.text.similarity.LevenshteinDistance;

public List<Medicine> fuzzySearch(String query) {
    LevenshteinDistance distance = new LevenshteinDistance();
    return medicines.stream()
        .filter(m -> distance.apply(query, m.getSearchName()) <= 3)
        .sorted(Comparator.comparingInt(m -> distance.apply(query, m.getSearchName())))
        .limit(20)
        .collect(Collectors.toList());
}
```

## 📊 Data Structure

### Medicine Object
```json
{
  "id": 1,
  "name": "Atorvastatine",
  "searchName": "atorvastatine",
  "price": 57.8,
  "usage": "Hypercholestérolémie...",
  "dosage": "10 mg",
  "form": "Comprime"
}
```

### Database Schema
```sql
CREATE TABLE medicines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    search_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    usage TEXT,
    dosage VARCHAR(50),
    form VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing Fuzzy Search

### Test Queries

**Exact match:**
```sql
SELECT * FROM medicines WHERE name ILIKE '%atorvastatine%';
```

**Fuzzy search (handles typos):**
```sql
SELECT
    name,
    price,
    similarity(search_name, 'atorva') as score
FROM medicines
WHERE search_name % 'atorva'
ORDER BY score DESC
LIMIT 10;
```

**Search by symptoms:**
```sql
SELECT
    name,
    price,
    ts_rank(to_tsvector('french', usage), plainto_tsquery('french', 'hypertension')) as rank
FROM medicines
WHERE to_tsvector('french', usage) @@ plainto_tsquery('french', 'hypertension')
ORDER BY rank DESC
LIMIT 10;
```

### Expected Results

Query: `atorva`
- Should match: Atorvastatine, Atorvastatine 10mg, etc.

Query: `avepro`
- Should match: Avepro, Avepro Comprime

Query: `dolipran` (with typo)
- Should match: Doliprane

## 🎯 Java Backend Integration

### 1. Entity Class
```java
@Entity
@Table(name = "medicines")
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "search_name")
    private String searchName;

    private BigDecimal price;

    @Column(columnDefinition = "TEXT")
    private String usage;

    private String dosage;
    private String form;

    // Getters and setters
}
```

### 2. Repository
```java
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    @Query(value = "SELECT m.* FROM medicines m " +
                   "WHERE m.search_name % :query " +
                   "ORDER BY similarity(m.search_name, :query) DESC " +
                   "LIMIT :limit",
           nativeQuery = true)
    List<Medicine> fuzzySearch(
        @Param("query") String query,
        @Param("limit") int limit
    );

    @Query("SELECT m FROM Medicine m WHERE LOWER(m.name) LIKE LOWER(CONCAT(:prefix, '%'))")
    List<Medicine> findByNamePrefix(@Param("prefix") String prefix);
}
```

### 3. Service
```java
@Service
public class MedicineSearchService {

    @Autowired
    private MedicineRepository repository;

    public List<Medicine> search(String query) {
        String normalized = query.toLowerCase()
            .replaceAll("[^a-z0-9\\s]", "")
            .trim();

        // Try prefix match first (faster)
        List<Medicine> results = repository.findByNamePrefix(normalized);

        // Fall back to fuzzy search if needed
        if (results.isEmpty()) {
            results = repository.fuzzySearch(normalized, 20);
        }

        return results;
    }
}
```

## 📈 Performance Tips

1. **Always use indexes** - pg_trgm indexes are crucial
2. **Normalize queries** - Remove special characters, lowercase
3. **Limit results** - Return top 20-50 results max
4. **Cache common queries** - Use Redis for popular searches
5. **Autocomplete** - Implement prefix search for better UX

## 🤖 AI Integration for Symptoms

For symptom-based search, integrate with OpenAI or similar:

```java
public List<Medicine> searchBySymptoms(String symptoms) {
    // 1. Send symptoms to AI
    String aiResponse = openAiService.extractMedicineNames(symptoms);

    // 2. Parse AI response to get medicine names
    List<String> medicineNames = parseAiResponse(aiResponse);

    // 3. Search database
    return medicineNames.stream()
        .flatMap(name -> repository.fuzzySearch(name, 5).stream())
        .distinct()
        .collect(Collectors.toList());
}
```

## 📝 Data Statistics

- **Total medicines**: 3,141
- **Price range**: 5.60 - 83,578.00 Dhs
- **Average price**: 1,140.08 Dhs
- **With dosage info**: 86%
- **With form info**: 95%

## 🔧 Troubleshooting

### pg_trgm extension not found
```sql
-- Install PostgreSQL contrib package
sudo apt-get install postgresql-contrib

-- Enable extension
CREATE EXTENSION pg_trgm;
```

### Slow searches
```sql
-- Rebuild indexes
REINDEX INDEX idx_medicine_search_gin;

-- Analyze table
ANALYZE medicines;
```

### No fuzzy matches
- Check similarity threshold (default 0.3)
- Verify search_name is properly normalized
- Test with simpler queries first

## 📚 Additional Resources

- [PostgreSQL pg_trgm docs](https://www.postgresql.org/docs/current/pgtrgm.html)
- [Apache Commons Text](https://commons.apache.org/proper/commons-text/)
- [Elasticsearch for advanced search](https://www.elastic.co/)

## ✅ Next Steps

1. ✓ Import data to database
2. ✓ Setup fuzzy search indexes
3. Implement search endpoints in Java backend
4. Test with various query patterns
5. Add autocomplete/suggestions
6. Integrate AI for symptom-based search
7. Add caching for performance
