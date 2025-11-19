# Pharmacy Finder & Inventory Platform

A mobile-first web application for Moroccan citizens to find nearby pharmacies, check real-time medicine availability, and manage inventory.

## Tech Stack

- **Frontend**: Nuxt 3 (Vue 3)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Maps**: Google Maps APIs
- **Search**: Meilisearch
- **Chatbot**: Pinecone + n8n + OpenAI
- **Hosting**: Vercel / Firebase Hosting
- **Styling**: Tailwind CSS
- **State Management**: Pinia

## Features

- 🏥 Find nearby pharmacies using geolocation
- 💊 Real-time stock availability
- 🔍 Live product search with typeahead
- 👨‍⚕️ Staff inventory management portal
- ⭐ Pharmacy ratings & reviews
- 🤖 AI chatbot for drug recommendations
- 🔔 Notifications (restock alerts, reservations)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+ (for backend services)
- Firebase account
- Google Maps API key
- Pinecone account (for chatbot)
- OpenAI API key (for chatbot)
- Meilisearch instance

### Installation

1. Install Node.js dependencies:
```bash
npm install
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your configuration
```

4. Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

## Project Structure

```
pharmacy_app/
├── assets/          # CSS and static assets
├── pages/           # Nuxt pages (file-based routing)
│   ├── index.vue    # Home page (with hello world)
│   ├── pharmacies.vue
│   ├── products.vue
│   ├── product/
│   ├── staff/
│   ├── auth/
│   └── chatbot.vue
├── layouts/         # App layouts
├── components/      # Vue components
├── composables/    # Composables and utilities
├── stores/         # Pinia stores
├── server/         # Server-side code
├── nuxt.config.ts # Nuxt configuration
├── package.json    # Node.js dependencies
└── requirements.txt # Python dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run generate` - Generate static site

## License

MIT

