export default function ChatbotPage() {
  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Assistant Virtuel</h1>
        <p className="text-muted-foreground">Posez vos questions sur les médicaments et les pharmacies</p>
      </div>

      <div className="bg-card rounded-lg border p-8 text-center">
        <svg className="h-16 w-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
        <h2 className="text-2xl font-semibold mb-2">Chatbot AI</h2>
        <p className="text-muted-foreground">Intégration en cours de développement</p>
      </div>
    </div>
  )
}
