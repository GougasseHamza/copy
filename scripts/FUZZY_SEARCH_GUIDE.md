# Medicine Fuzzy Search Implementation Guide

## Overview
This guide explains how to implement fuzzy search for the medicine database in your Java backend.

## Data Files
- **Original CSV**: `assets/medicament_filtered_price_usage.csv`
- **Cleaned JSON**: `assets/medicines_cleaned.json` (3,141 medicines)

## Fuzzy Search Strategies

### Option 1: Apache Commons Text (Simple, Fast)
Best for: Small to medium datasets, simple queries

**Maven Dependency:**
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-text</artifactId>
    <version>1.10.0</version>
</dependency>
```

**Implementation:**
```java
import org.apache.commons.text.similarity.LevenshteinDistance;

public class MedicineFuzzySearch {
    private final LevenshteinDistance levenshtein = new LevenshteinDistance();
    private final int THRESHOLD = 3; // Max edit distance

    public List<Medicine> search(String query, List<Medicine> medicines) {
        return medicines.stream()
            .map(med -> new ScoredMedicine(
                med,
                calculateScore(query.toLowerCase(), med.getSearchName())
            ))
            .filter(sm -> sm.score <= THRESHOLD)
            .sorted(Comparator.comparingInt(sm -> sm.score))
            .map(sm -> sm.medicine)
            .limit(20)
            .collect(Collectors.toList());
    }

    private int calculateScore(String query, String target) {
        // Exact match - score 0
        if (target.contains(query)) {
            return 0;
        }

        // Levenshtein distance
        return levenshtein.apply(query, target);
    }
}
```

### Option 2: PostgreSQL Full-Text Search with pg_trgm
Best for: Database-level search, better performance for large datasets

**Setup:**
```sql
-- Enable pg_trgm extension
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create medicines table
CREATE TABLE medicines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    search_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    usage TEXT,
    dosage VARCHAR(50),
    form VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create GIN index for trigram search
CREATE INDEX idx_medicine_search ON medicines USING GIN (search_name gin_trgm_ops);
CREATE INDEX idx_medicine_name ON medicines USING GIN (name gin_trgm_ops);
```

**Query:**
```sql
-- Fuzzy search with similarity threshold
SELECT
    id,
    name,
    price,
    usage,
    similarity(search_name, 'atorva') as score
FROM medicines
WHERE search_name % 'atorva'  -- % operator uses pg_trgm
ORDER BY score DESC
LIMIT 20;

-- Or with configurable threshold
SELECT
    id,
    name,
    price,
    similarity(search_name, ?) as score
FROM medicines
WHERE similarity(search_name, ?) > 0.3
ORDER BY score DESC
LIMIT 20;
```

**Java Repository:**
```java
@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    @Query(value = "SELECT m.*, similarity(m.search_name, :query) as score " +
                   "FROM medicines m " +
                   "WHERE m.search_name % :query " +
                   "ORDER BY score DESC " +
                   "LIMIT :limit",
           nativeQuery = true)
    List<Medicine> fuzzySearch(
        @Param("query") String query,
        @Param("limit") int limit
    );

    // For partial matches (starts with)
    @Query("SELECT m FROM Medicine m WHERE LOWER(m.name) LIKE LOWER(CONCAT(:query, '%'))")
    List<Medicine> searchByPrefix(@Param("query") String query);
}
```

### Option 3: Elasticsearch (Advanced)
Best for: Large datasets, complex queries, symptom-based search with AI

**Benefits:**
- Built-in fuzzy search
- Autocomplete/suggestions
- Full-text search on usage/symptoms
- Scalable

**Elasticsearch Mapping:**
```json
{
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "analyzer": "standard",
        "fields": {
          "keyword": { "type": "keyword" },
          "suggest": {
            "type": "completion"
          }
        }
      },
      "searchName": {
        "type": "text",
        "analyzer": "simple"
      },
      "price": { "type": "float" },
      "usage": {
        "type": "text",
        "analyzer": "french"
      },
      "dosage": { "type": "keyword" },
      "form": { "type": "keyword" }
    }
  }
}
```

**Search Query:**
```json
{
  "query": {
    "multi_match": {
      "query": "atorva",
      "fields": ["name^3", "searchName^2"],
      "fuzziness": "AUTO",
      "prefix_length": 1
    }
  },
  "size": 20
}
```

## Recommended Approach

### For your use case, I recommend:

1. **Database-level (PostgreSQL + pg_trgm)** for:
   - Drug name fuzzy search
   - Fast, reliable
   - No additional infrastructure

2. **AI Assistant** for:
   - Symptom-based search
   - Natural language queries
   - Use OpenAI API or similar

## Sample Service Implementation

```java
@Service
public class MedicineSearchService {

    @Autowired
    private MedicineRepository medicineRepository;

    public List<MedicineDTO> searchByName(String query) {
        // Normalize query
        String normalizedQuery = query.toLowerCase()
            .replaceAll("[^a-z0-9\\s]", "")
            .trim();

        if (normalizedQuery.isEmpty()) {
            return Collections.emptyList();
        }

        // Try exact/prefix match first
        List<Medicine> results = medicineRepository.searchByPrefix(normalizedQuery);

        // If no results, use fuzzy search
        if (results.isEmpty()) {
            results = medicineRepository.fuzzySearch(normalizedQuery, 20);
        }

        return results.stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public List<MedicineDTO> searchBySymptoms(String symptoms) {
        // This would integrate with AI service
        // 1. Send symptoms to AI
        // 2. AI returns medicine names or categories
        // 3. Search database for those medicines
        return aiService.searchBySymptoms(symptoms);
    }
}
```

## Testing Examples

```bash
# These should all match "Atorvastatine":
- atorva
- atorvast
- atrvastatin (1 char off)
- atorbastatine (1 char substitution)

# These should match "Avepro":
- avepro
- avpro
- avepro comprime
```

## Next Steps

1. Import `medicines_cleaned.json` into your database
2. Enable pg_trgm extension in PostgreSQL
3. Create indexes
4. Implement fuzzy search in your API endpoints
5. Test with various query patterns

## Performance Tips

- Use index on `search_name` column
- Set similarity threshold (0.3 is good start)
- Limit results to prevent overload
- Cache common queries
- Consider autocomplete for UX improvement
