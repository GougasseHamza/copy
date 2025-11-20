# Frontend-Backend Integration Guide

Complete guide for connecting your Nuxt frontend with the Java Spring Boot backend and n8n AI assistant.

## 🔗 Backend Connection

### Step 1: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Backend API
API_BASE_URL=http://localhost:8080/api

# n8n AI Assistant Webhook
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/ai-assistant

# Google Maps (optional)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Step 2: Verify Configuration

The `nuxt.config.ts` is already configured:

```typescript
runtimeConfig: {
  public: {
    apiBase: process.env.API_BASE_URL || 'http://localhost:8080/api',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    n8nWebhookUrl: process.env.N8N_WEBHOOK_URL || ''
  }
}
```

### Step 3: Start Both Servers

**Terminal 1 - Backend (Java):**
```bash
cd backend-java
./start-backend.sh
# Backend running on http://localhost:8080
```

**Terminal 2 - Frontend (Nuxt):**
```bash
npm run dev
# Frontend running on http://localhost:3000
```

---

## 📡 Using the API

### Import the API Composable

```vue
<script setup lang="ts">
const api = useApi()
</script>
```

### Example 1: Search Products (Medicines)

```vue
<script setup lang="ts">
const api = useApi()
const searchQuery = ref('')
const products = ref([])
const isLoading = ref(false)

const searchMedicines = async () => {
  if (!searchQuery.value) return

  isLoading.value = true
  try {
    const results = await api.searchProducts(searchQuery.value, 20)
    products.value = results.data || []
  } catch (error) {
    console.error('Search failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <input
      v-model="searchQuery"
      @input="searchMedicines"
      placeholder="Rechercher un médicament..."
      type="text"
    />

    <div v-if="isLoading">Recherche en cours...</div>

    <div v-for="product in products" :key="product.id">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }} Dhs</p>
      <p>{{ product.usage }}</p>
    </div>
  </div>
</template>
```

### Example 2: Get Nearby Pharmacies

```vue
<script setup lang="ts">
const api = useApi()
const pharmacies = ref([])
const userLocation = ref({ lat: 33.5731, lng: -7.5898 }) // Casablanca

onMounted(async () => {
  // Get user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      userLocation.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      // Fetch nearby pharmacies (5km radius)
      const results = await api.getNearbyPharmacies(
        userLocation.value.lat,
        userLocation.value.lng,
        5000
      )

      pharmacies.value = results.data || []
    })
  }
})
</script>

<template>
  <div v-for="pharmacy in pharmacies" :key="pharmacy.id">
    <h3>{{ pharmacy.name }}</h3>
    <p>{{ pharmacy.address }}</p>
    <p>Distance: {{ pharmacy.distance }}km</p>
    <p>{{ pharmacy.isOpen ? 'Ouvert' : 'Fermé' }}</p>
  </div>
</template>
```

### Example 3: Check Medicine Availability

```vue
<script setup lang="ts">
const api = useApi()
const productId = ref('product-123')
const availability = ref(null)

const checkAvailability = async () => {
  const result = await api.checkProductAvailability(
    productId.value,
    33.5731, // latitude
    -7.5898  // longitude
  )

  availability.value = result.data
}
</script>

<template>
  <div v-if="availability">
    <h3>Disponible dans {{ availability.pharmacies.length }} pharmacies:</h3>
    <ul>
      <li v-for="pharmacy in availability.pharmacies" :key="pharmacy.id">
        {{ pharmacy.name }} - {{ pharmacy.stock }} unités
      </li>
    </ul>
  </div>
</template>
```

---

## 🤖 AI Assistant Integration (n8n)

### Setup n8n Webhook

#### 1. Create n8n Workflow

In your n8n instance:

1. Create a new workflow
2. Add **Webhook** trigger node
3. Configure webhook:
   - **HTTP Method**: POST
   - **Path**: `/ai-assistant` (or your custom path)
   - **Response Mode**: Last Node

4. Add your AI processing nodes (e.g., OpenAI, ChatGPT, etc.)

5. Return response in this format:
```json
{
  "success": true,
  "message": "AI response text here",
  "medicines": [
    {
      "name": "Medicine Name",
      "usage": "Usage description"
    }
  ],
  "timestamp": "2024-11-20T..."
}
```

6. Copy the webhook URL (e.g., `https://your-n8n-instance.com/webhook/ai-assistant`)

#### 2. Update Frontend Environment

Add to your `.env`:
```bash
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/ai-assistant
```

### Using AI Assistant in Frontend

#### Simple Usage:

```vue
<script setup lang="ts">
const api = useApi()
const userMessage = ref('')
const aiResponse = ref('')
const isThinking = ref(false)

const askAI = async () => {
  isThinking.value = true
  try {
    const response = await api.askAIAssistant(userMessage.value, {
      language: 'fr',
      userLocation: 'Morocco'
    })

    aiResponse.value = response.message
  } catch (error) {
    console.error('AI request failed:', error)
  } finally {
    isThinking.value = false
  }
}
</script>

<template>
  <div>
    <textarea
      v-model="userMessage"
      placeholder="J'ai mal à la tête, que puis-je prendre?"
    />

    <button @click="askAI" :disabled="isThinking">
      {{ isThinking ? 'Réflexion...' : 'Demander au chatbot' }}
    </button>

    <div v-if="aiResponse" class="ai-response">
      {{ aiResponse }}
    </div>
  </div>
</template>
```

#### Advanced Usage with Composable:

```vue
<script setup lang="ts">
const { ask, isLoading, error, response } = useAIAssistant()

const userQuestion = ref('')
const conversation = ref<Array<{role: string, message: string}>>([])

const handleSubmit = async () => {
  if (!userQuestion.value.trim()) return

  // Add user message to conversation
  conversation.value.push({
    role: 'user',
    message: userQuestion.value
  })

  const currentQuestion = userQuestion.value
  userQuestion.value = ''

  // Get AI response
  const result = await ask(currentQuestion, {
    conversation: conversation.value.slice(-5) // Last 5 messages for context
  })

  // Add AI response to conversation
  if (result) {
    conversation.value.push({
      role: 'assistant',
      message: result.message
    })
  }
}
</script>

<template>
  <div class="chat-container">
    <!-- Chat History -->
    <div class="messages">
      <div
        v-for="(msg, index) in conversation"
        :key="index"
        :class="['message', msg.role]"
      >
        <p>{{ msg.message }}</p>
      </div>

      <div v-if="isLoading" class="message assistant">
        <p>💭 Réflexion...</p>
      </div>
    </div>

    <!-- Input -->
    <form @submit.prevent="handleSubmit">
      <input
        v-model="userQuestion"
        placeholder="Posez une question sur les médicaments..."
        :disabled="isLoading"
      />
      <button type="submit" :disabled="isLoading || !userQuestion.trim()">
        Envoyer
      </button>
    </form>

    <!-- Error -->
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style scoped>
.chat-container {
  max-width: 800px;
  margin: 0 auto;
}

.messages {
  height: 500px;
  overflow-y: auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.message {
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 8px;
}

.message.user {
  background: #e3f2fd;
  margin-left: 20%;
}

.message.assistant {
  background: #fff;
  margin-right: 20%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
```

---

## 🔄 Complete Integration Example

Here's a complete page showing product search + AI assistant:

```vue
<!-- pages/search.vue -->
<script setup lang="ts">
const api = useApi()
const { ask: askAI, isLoading: aiLoading, response: aiResponse } = useAIAssistant()

const searchQuery = ref('')
const products = ref([])
const selectedProduct = ref(null)
const showChat = ref(false)

// Search products
const search = async () => {
  if (!searchQuery.value) return

  const results = await api.searchProducts(searchQuery.value)
  products.value = results.data || []
}

// Ask AI about symptoms
const askAboutSymptoms = async (symptoms: string) => {
  showChat.value = true
  await askAI(symptoms, {
    type: 'symptom_search',
    language: 'fr'
  })

  // If AI suggests medicines, search for them
  if (aiResponse.value?.medicines) {
    const medicineNames = aiResponse.value.medicines.map((m: any) => m.name)
    // Search for first suggested medicine
    if (medicineNames.length > 0) {
      searchQuery.value = medicineNames[0]
      await search()
    }
  }
}

// Get product details
const selectProduct = async (productId: string) => {
  const result = await api.getProductById(productId)
  selectedProduct.value = result.data
}
</script>

<template>
  <div class="container">
    <h1>Recherche de Médicaments</h1>

    <!-- Search by Name -->
    <div class="search-section">
      <input
        v-model="searchQuery"
        @input="search"
        placeholder="Nom du médicament (ex: Doliprane, Atorva...)"
      />
    </div>

    <!-- Search by Symptoms (AI) -->
    <div class="ai-section">
      <p>Ou décrivez vos symptômes:</p>
      <button @click="askAboutSymptoms('J\'ai mal à la tête et de la fièvre')">
        💬 Demander au chatbot
      </button>
    </div>

    <!-- AI Response -->
    <div v-if="aiResponse" class="ai-response">
      <h3>🤖 Recommandation:</h3>
      <p>{{ aiResponse.message }}</p>
    </div>

    <!-- Search Results -->
    <div class="products-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
        @click="selectProduct(product.id)"
      >
        <h3>{{ product.name }}</h3>
        <p class="price">{{ product.price }} Dhs</p>
        <p class="usage">{{ product.usage?.substring(0, 100) }}...</p>
      </div>
    </div>

    <!-- Product Details Modal -->
    <div v-if="selectedProduct" class="modal">
      <div class="modal-content">
        <button @click="selectedProduct = null">✕</button>
        <h2>{{ selectedProduct.name }}</h2>
        <p class="price">{{ selectedProduct.price }} Dhs</p>
        <p>{{ selectedProduct.usage }}</p>

        <button @click="checkAvailability(selectedProduct.id)">
          📍 Vérifier la disponibilité
        </button>
      </div>
    </div>
  </div>
</template>
```

---

## 🧪 Testing the Integration

### 1. Test Backend Connection

```bash
# In browser console or terminal
curl http://localhost:8080/api/products/search?query=doliprane
```

Expected response:
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "123",
      "name": "Doliprane 1000mg",
      "price": 25.50,
      "usage": "Traitement de la douleur..."
    }
  ]
}
```

### 2. Test n8n Webhook

```bash
curl -X POST https://your-n8n-instance.com/webhook/ai-assistant \
  -H "Content-Type: application/json" \
  -d '{
    "message": "J'\''ai mal à la tête",
    "context": {"language": "fr"}
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Je vous recommande du Paracétamol...",
  "medicines": [
    {"name": "Doliprane", "usage": "Contre la douleur"}
  ]
}
```

### 3. Test in Frontend

Open browser console:
```javascript
// Test API connection
const api = useApi()
const result = await api.searchProducts('atorva')
console.log(result)

// Test AI assistant
const aiResult = await api.askAIAssistant('mal de tête')
console.log(aiResult)
```

---

## 🚨 Troubleshooting

### CORS Errors

If you see CORS errors in console:

**Backend fix** (`backend-java/src/main/java/com/pharmfinder/config/CorsConfig.java`):
```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
        .allowedOrigins("http://localhost:3000")
        .allowedMethods("GET", "POST", "PUT", "DELETE")
        .allowCredentials(true);
}
```

### Backend Not Responding

1. Check backend is running: `curl http://localhost:8080/api`
2. Check Firebase credentials are configured
3. Check logs in backend terminal

### n8n Webhook Not Working

1. Test webhook directly with curl first
2. Check webhook URL in `.env` is correct
3. Verify n8n workflow is activated
4. Check n8n logs for errors

---

## 📚 API Reference

All available endpoints from the composable:

```typescript
const api = useApi()

// Pharmacies
api.fetchPharmacies()
api.getNearbyPharmacies(lat, lng, radius)
api.getPharmacyById(id)
api.getPharmacyInventory(id)

// Products/Medicines
api.searchProducts(query, limit)
api.getProductById(id)
api.checkProductAvailability(id, lat, lng)

// AI Assistant
api.askAIAssistant(message, context)
```

---

## ✅ Checklist

- [ ] Backend running on http://localhost:8080
- [ ] Frontend running on http://localhost:3000
- [ ] `.env` file created with API_BASE_URL
- [ ] n8n webhook created and URL added to `.env`
- [ ] Tested API connection in browser
- [ ] Tested AI assistant webhook
- [ ] No CORS errors in console
- [ ] Search products working
- [ ] AI assistant responding

---

## 🎯 Next Steps

1. Import medicine data to backend (see `scripts/README.md`)
2. Configure your n8n AI workflow
3. Add authentication (Firebase Auth)
4. Deploy to production
5. Set up real pharmacy data

---

For more details:
- Backend docs: `backend-java/README.md`
- Medicine data: `scripts/README.md`
- Firebase setup: `backend-java/FIREBASE_SETUP.md`
