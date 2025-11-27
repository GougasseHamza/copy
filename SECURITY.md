# Security Guide - API Keys & Secrets

## ⚠️ The Problem

Your API keys were visible in the browser's page source:

```javascript
window.__NUXT__.config = {
  public: {
    googleMapsApiKey: "AIzaSyAP2o4UnekV8oZ0YsERsUFF4dvnYo0ePDA",
    n8nWebhookUrl: "https://fcb615c950fd.ngrok-free.app"
  }
}
```

**Why?** In Nuxt 3, anything in `runtimeConfig.public` is intentionally exposed to the client-side JavaScript.

## ✅ The Solution

### 1. Google Maps API Key

**Status**: Can remain in public config **IF** properly restricted.

**Actions Required**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to: **APIs & Services → Credentials**
3. Find your Maps API key and click Edit
4. Set **Application restrictions**:
   - Choose "HTTP referrers (websites)"
   - Add your domains:
     - `localhost:3000/*` (for development)
     - `yourdomain.com/*` (for production)
     - `*.yourdomain.com/*` (for subdomains)
5. Set **API restrictions**:
   - Choose "Restrict key"
   - Only enable the APIs you use:
     - Maps JavaScript API
     - Places API
     - Geocoding API
     - etc.

**Result**: Even if someone steals your key, they can't use it on their domain.

---

### 2. n8n Webhook URL

**Status**: ❌ **CRITICAL** - Should NEVER be exposed to client

**What I Changed**:
- Moved `n8nWebhookUrl` out of `public` config
- It's now only available server-side
- Created `/server/api/webhook.post.ts` to handle webhook calls securely

**How to Use** (from your frontend):
```typescript
// ❌ OLD WAY (INSECURE):
const config = useRuntimeConfig()
await $fetch(config.public.n8nWebhookUrl, { ... })

// ✅ NEW WAY (SECURE):
await $fetch('/api/webhook', {
  method: 'POST',
  body: { your: 'data' }
})
```

---

## 🔐 Best Practices

### Environment Variables

1. **Create `.env` file** (never commit this):
```bash
API_BASE_URL=http://localhost:8080/api
GOOGLE_MAPS_API_KEY=your_actual_key_here
N8N_WEBHOOK_URL=your_actual_webhook_url_here
```

2. **Use `.env.example`** (commit this as a template):
```bash
API_BASE_URL=http://localhost:8080/api
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
N8N_WEBHOOK_URL=your_n8n_webhook_url_here
```

3. **Verify `.gitignore`** has:
```
.env
.env.*
!.env.example
```

### Nuxt Config Structure

```typescript
runtimeConfig: {
  // ⚠️ PRIVATE (server-side only)
  databaseUrl: process.env.DATABASE_URL,
  apiSecret: process.env.API_SECRET,
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,

  public: {
    // ✅ PUBLIC (exposed to client - use carefully!)
    apiBase: process.env.API_BASE_URL,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, // OK if restricted
    appVersion: '1.0.0',
    environment: process.env.NODE_ENV
  }
}
```

---

## 🚨 What Keys Should NEVER Be Public

- ❌ Database credentials
- ❌ API secret keys
- ❌ Webhook URLs
- ❌ Payment gateway secret keys (Stripe secret key, etc.)
- ❌ OAuth client secrets
- ❌ Encryption keys
- ❌ Admin tokens

## ✅ What Keys CAN Be Public (with restrictions)

- ✓ Google Maps API key (with domain + API restrictions)
- ✓ Firebase client config (with app restrictions)
- ✓ Stripe publishable key (starts with `pk_`)
- ✓ Public API endpoints
- ✓ App version, build ID

---

## 🔍 How to Check for Exposed Secrets

1. **View page source** in browser (Ctrl/Cmd + U)
2. Search for `window.__NUXT__`
3. Check what's in `config.public`
4. If you see sensitive data → move it to private config

---

## 📝 Summary

**What I Fixed**:
1. ✅ Moved n8n webhook URL to private config
2. ✅ Created secure server endpoint `/api/webhook`
3. ✅ Added comments to nuxt.config.ts
4. ✅ Created `.env.example` template
5. ✅ Wrote this security guide

**What You Need to Do**:
1. 🔧 Restrict your Google Maps API key in GCP Console
2. 🔧 Create `.env` file with your actual keys
3. 🔧 Update any frontend code that calls n8n directly
4. 🔧 Review all exposed keys in `runtimeConfig.public`

---

**Remember**: If a key appears in `window.__NUXT__.config.public`, assume the entire world can see it. Protect accordingly!
