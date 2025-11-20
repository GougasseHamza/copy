# Pharmacy Finder Java Backend

## 🏗️ Architecture Overview

This is a **Spring Boot 3.2.0** REST API backend for the Pharmacy Finder platform.

### Technology Stack
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: Google Cloud Firestore (NoSQL)
- **Authentication**: Firebase Admin SDK
- **API Documentation**: Swagger/OpenAPI
- **Build Tool**: Maven

### Project Structure
```
backend-java/
├── src/main/java/com/pharmfinder/
│   ├── PharmacyFinderApplication.java  # Main entry point
│   ├── controller/                      # REST API endpoints
│   │   ├── AuthController.java         # /api/auth/*
│   │   ├── PharmacyController.java     # /api/pharmacies/*
│   │   └── ProductController.java      # /api/products/*
│   ├── service/                         # Business logic
│   │   ├── AuthService.java
│   │   ├── PharmacyService.java
│   │   └── ProductService.java
│   ├── model/                           # Data models
│   │   ├── User.java
│   │   ├── Pharmacy.java
│   │   ├── Product.java
│   │   ├── Inventory.java
│   │   └── Review.java
│   ├── dto/                             # Data Transfer Objects
│   │   ├── request/                     # Request DTOs
│   │   └── response/                    # Response DTOs
│   └── config/                          # Configuration
│       ├── SecurityConfig.java
│       ├── CorsConfig.java
│       └── FirebaseConfig.java
├── src/main/resources/
│   ├── application.yml                  # Main configuration
│   └── firebase-service-account.json   # Firebase credentials
└── pom.xml                              # Maven dependencies
```

## 🚀 How to Run the Backend

### Prerequisites

1. **Java 17 or higher**
```bash
# Check Java version
java -version

# If not installed (Ubuntu/Debian)
sudo apt update
sudo apt install openjdk-17-jdk

# macOS
brew install openjdk@17
```

2. **Maven 3.6+**
```bash
# Check Maven version
mvn -version

# Install Maven (Ubuntu/Debian)
sudo apt install maven

# macOS
brew install maven
```

3. **Firebase Project Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Enable Firestore Database
   - Download service account key:
     - Go to Project Settings → Service Accounts
     - Click "Generate New Private Key"
     - Save as `firebase-service-account.json`

### Setup Steps

#### Step 1: Configure Firebase

1. Place your Firebase service account JSON in the resources folder:
```bash
cp /path/to/your/firebase-service-account.json backend-java/src/main/resources/
```

2. Update `application.yml` with your Firebase project URL:
```yaml
firebase:
  credentials:
    path: classpath:firebase-service-account.json
  database:
    url: https://your-project-id.firebaseio.com  # Replace with your project URL
```

#### Step 2: Configure Environment Variables (Optional)

Create a `.env` file or export environment variables:
```bash
export GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Or update `application.yml`:
```yaml
google:
  maps:
    api-key: your_actual_api_key_here
```

#### Step 3: Build the Project

```bash
cd backend-java

# Clean and compile
mvn clean compile

# Run tests (if any)
mvn test

# Package as JAR
mvn clean package
```

#### Step 4: Run the Application

**Option 1: Using Maven**
```bash
mvn spring-boot:run
```

**Option 2: Using JAR**
```bash
java -jar target/pharmacy-finder-api-1.0.0.jar
```

**Option 3: Development Mode with Auto-reload**
```bash
# Spring Boot DevTools is included, so changes will auto-reload
mvn spring-boot:run -Dspring-boot.run.fork=false
```

### Verify Backend is Running

1. **Check Health**
```bash
curl http://localhost:8080/api
```

2. **Access Swagger UI** (API Documentation)
```
http://localhost:8080/swagger-ui.html
```

3. **View API Docs**
```
http://localhost:8080/v3/api-docs
```

## 📡 API Endpoints

### Authentication (`/api/auth`)
```
POST   /api/auth/register     # Register new user
POST   /api/auth/login        # Login user
POST   /api/auth/logout       # Logout user
GET    /api/auth/me           # Get current user
```

### Products/Medicines (`/api/products`)
```
GET    /api/products                    # Get all products
GET    /api/products/search?query=X     # Search products (fuzzy)
GET    /api/products/{id}               # Get product by ID
GET    /api/products/{id}/availability  # Check availability in pharmacies
```

### Pharmacies (`/api/pharmacies`)
```
GET    /api/pharmacies                  # Get all pharmacies
GET    /api/pharmacies/nearby           # Get nearby pharmacies
GET    /api/pharmacies/{id}             # Get pharmacy by ID
GET    /api/pharmacies/{id}/inventory   # Get pharmacy inventory
POST   /api/pharmacies/{id}/reviews     # Add review
```

## 🔧 How the Backend Works

### 1. Request Flow

```
Client (Nuxt App)
    ↓ HTTP Request
CORS Filter (CorsConfig.java)
    ↓ Allow localhost:3000
Security Filter (SecurityConfig.java)
    ↓ Verify Firebase token
Controller (e.g., ProductController.java)
    ↓ Validate request
Service (e.g., ProductService.java)
    ↓ Business logic
Firestore Database
    ↓ Query/Save data
Response → Client
```

### 2. Data Models

**Product (Medicine)**
```java
{
  "id": "uuid",
  "name": "Atorvastatine",
  "description": "Cholesterol medication",
  "price": 57.8,
  "category": "Cardiovascular",
  "uses": "Treatment of hypercholesterolemia...",
  "imageUrl": "https://...",
  "createdAt": "2024-11-20T..."
}
```

**Pharmacy**
```java
{
  "id": "uuid",
  "name": "Pharmacie Al Amal",
  "address": "12 Rue Allal Ben Abdellah",
  "city": "Casablanca",
  "phone": "+212 522 123456",
  "latitude": 33.5731,
  "longitude": -7.5898,
  "isOpen": true,
  "openingHours": {...},
  "rating": 4.7
}
```

### 3. Firebase Integration

The app uses **Firestore** (NoSQL database) for data storage:

**Collections:**
- `users` - User accounts
- `pharmacies` - Pharmacy data
- `products` - Medicine catalog
- `inventory` - Stock levels per pharmacy
- `reviews` - Pharmacy reviews

**Example Query (in Service):**
```java
public List<Product> searchProducts(String query) {
    // Firestore query
    ApiFuture<QuerySnapshot> future = firestore
        .collection("products")
        .whereGreaterThanOrEqualTo("name", query)
        .whereLessThan("name", query + "\uf8ff")
        .limit(20)
        .get();

    // Convert to Product objects
    return future.get().getDocuments().stream()
        .map(doc -> doc.toObject(Product.class))
        .collect(Collectors.toList());
}
```

### 4. Security

**Spring Security + Firebase Auth:**
```java
// JWT token validation
@Component
public class FirebaseAuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(...) {
        String token = extractToken(request);
        FirebaseToken decodedToken = FirebaseAuth.getInstance()
            .verifyIdToken(token);

        // Set authentication context
        SecurityContextHolder.getContext()
            .setAuthentication(authentication);
    }
}
```

### 5. CORS Configuration

Allows frontend (Nuxt) to access the API:
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowCredentials(true);
    }
}
```

## 🔄 Integration with Frontend

### Nuxt Configuration

In your `nuxt.config.ts`:
```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8080/api'
    }
  }
})
```

### API Client (Nuxt)

```typescript
// composables/useApi.ts
export const useApi = () => {
  const config = useRuntimeConfig()

  const searchProducts = async (query: string) => {
    return await $fetch(`${config.public.apiBase}/products/search`, {
      params: { query, limit: 20 }
    })
  }

  const getNearbyPharmacies = async (lat: number, lng: number) => {
    return await $fetch(`${config.public.apiBase}/pharmacies/nearby`, {
      params: { latitude: lat, longitude: lng, radius: 5000 }
    })
  }

  return { searchProducts, getNearbyPharmacies }
}
```

## 📊 Implementing Medicine Fuzzy Search

### Option 1: Firestore Query (Basic)

Current approach uses Firestore string range queries:
```java
public List<Product> searchProducts(String query) {
    String lowerQuery = query.toLowerCase();
    return firestore.collection("products")
        .whereGreaterThanOrEqualTo("searchName", lowerQuery)
        .whereLessThan("searchName", lowerQuery + "\uf8ff")
        .get()
        .get()
        .toObjects(Product.class);
}
```

**Limitations:**
- Doesn't handle typos well
- Not truly fuzzy
- Limited to prefix matching

### Option 2: Migrate to PostgreSQL + pg_trgm (Recommended)

See `scripts/FUZZY_SEARCH_GUIDE.md` for complete implementation.

**Why migrate?**
- ✅ True fuzzy search with typo tolerance
- ✅ Better query performance
- ✅ More flexible filtering
- ✅ Relational data model

**Migration Steps:**

1. **Add PostgreSQL dependency** to `pom.xml`:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
</dependency>
```

2. **Update `application.yml`**:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/pharmacy
    username: postgres
    password: your_password
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: update
```

3. **Create Entity**:
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

    // Getters/setters
}
```

4. **Create Repository with Fuzzy Search**:
```java
@Repository
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
}
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Or use different port
mvn spring-boot:run -Dserver.port=8081
```

### Firebase Connection Issues
```
ERROR: Could not find firebase-service-account.json
```
**Solution**: Make sure the file is in `src/main/resources/`

### CORS Errors
```
Access to fetch at 'http://localhost:8080/api/...' from origin 'http://localhost:3000' has been blocked
```
**Solution**: Check `CorsConfig.java` includes `http://localhost:3000`

### Maven Build Fails
```bash
# Clear Maven cache
mvn clean
rm -rf ~/.m2/repository

# Re-download dependencies
mvn clean install
```

## 📝 Development Tips

1. **Hot Reload**: Spring DevTools auto-reloads on file changes
2. **Logging**: Check `application.yml` logging levels
3. **Swagger**: Use `/swagger-ui.html` to test APIs
4. **Firebase Console**: Monitor Firestore queries and data

## 🎯 Next Steps

1. ✅ Setup Firebase project
2. ✅ Run backend on port 8080
3. Import medicine data (see `scripts/README.md`)
4. Implement fuzzy search endpoints
5. Connect with Nuxt frontend
6. Test API with Swagger

## 📚 Additional Resources

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [PostgreSQL Migration Guide](../scripts/FUZZY_SEARCH_GUIDE.md)
