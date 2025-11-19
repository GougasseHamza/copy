'use client'

import { use } from 'react'
import Link from 'next/link'
import { mockProducts, mockPharmacies, type Product } from '@/data/mockData'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = mockProducts.find(p => p.id === id)
  const pharmacy = product ? mockPharmacies.find(ph => ph.id === product.pharmacyId) : null

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <Link href="/products" className="text-primary hover:underline">
          Retour aux produits
        </Link>
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <Link href="/products" className="text-primary hover:underline mb-4 inline-block">
          ← Retour aux produits
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg border"
          />
        </div>

        {/* Details */}
        <div>
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{product.description}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-primary">{product.price} MAD</span>
              <span className={`text-lg ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
              </span>
            </div>

            {product.uses && (
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">Utilisations</h3>
                <p className="text-sm text-muted-foreground">{product.uses}</p>
              </div>
            )}

            {product.disclaimer && (
              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-amber-900 dark:text-amber-100">Avertissement</h3>
                <p className="text-sm text-amber-800 dark:text-amber-200">{product.disclaimer}</p>
              </div>
            )}

            {pharmacy && (
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Disponible à</h3>
                <div className="bg-card rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{pharmacy.name}</h4>
                      <p className="text-sm text-muted-foreground">{pharmacy.address}</p>
                      <p className="text-sm text-muted-foreground">{pharmacy.phone}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        pharmacy.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {pharmacy.isOpen ? 'Ouverte' : 'Fermée'}
                    </div>
                  </div>
                  <Link
                    href={`/pharmacy/${pharmacy.id}`}
                    className="mt-4 block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Voir la pharmacie
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
