'use client'

import { use } from 'react'
import Link from 'next/link'
import { mockPharmacies, mockProducts, type Pharmacy, type Product } from '@/data/mockData'

export default function PharmacyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const pharmacy = mockPharmacies.find(p => p.id === id)
  const pharmacyProducts = mockProducts.filter(p => p.pharmacyId === id)

  if (!pharmacy) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Pharmacie non trouvée</h1>
        <Link href="/pharmacies" className="text-primary hover:underline">
          Retour aux pharmacies
        </Link>
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/pharmacies" className="text-primary hover:underline mb-4 inline-block">
          ← Retour aux pharmacies
        </Link>
        <h1 className="text-4xl font-bold mb-2">{pharmacy.name}</h1>
        <p className="text-muted-foreground">{pharmacy.address}, {pharmacy.city}</p>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Statut</h3>
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              pharmacy.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {pharmacy.isOpen ? 'Ouverte' : 'Fermée'}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Téléphone</h3>
          <p className="text-lg font-semibold">{pharmacy.phone}</p>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Évaluation</h3>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-lg font-semibold">{pharmacy.rating}</span>
            <span className="text-muted-foreground">({pharmacy.reviewCount} avis)</span>
          </div>
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Produits disponibles</h2>
        {pharmacyProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pharmacyProducts.map((product) => (
              <div key={product.id} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{product.price} MAD</span>
                  <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Aucun produit disponible pour le moment</p>
        )}
      </div>
    </div>
  )
}
