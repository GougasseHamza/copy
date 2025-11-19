export default function StaffPage() {
  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Espace Personnel</h1>
        <p className="text-muted-foreground">Gérez l&apos;inventaire et les commandes</p>
      </div>

      <div className="bg-card rounded-lg border p-8 text-center">
        <svg className="h-16 w-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        <h2 className="text-2xl font-semibold mb-2">Portail du Personnel</h2>
        <p className="text-muted-foreground">Connectez-vous pour accéder à votre espace</p>
      </div>
    </div>
  )
}
