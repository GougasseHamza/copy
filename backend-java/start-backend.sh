#!/bin/bash

echo "🚀 Starting Pharmacy Finder Backend..."

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check Java version
JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | cut -d'.' -f1)
if [ "$JAVA_VERSION" -lt "17" ]; then
    echo "❌ Java 17 or higher is required. Current version: $JAVA_VERSION"
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven 3.6 or higher."
    exit 1
fi

echo "✓ Java version: $(java -version 2>&1 | head -n 1)"
echo "✓ Maven version: $(mvn -version 2>&1 | head -n 1)"

# Check if Firebase credentials exist
if [ ! -f "src/main/resources/firebase-service-account.json" ]; then
    echo "⚠️  Warning: firebase-service-account.json not found in src/main/resources/"
    echo "   Please add your Firebase service account key before running."
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "📦 Building project..."
mvn clean compile

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""
echo "🚀 Starting Spring Boot application on port 8080..."
echo "   API will be available at: http://localhost:8080/api"
echo "   Swagger UI: http://localhost:8080/swagger-ui.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Run the application
mvn spring-boot:run
