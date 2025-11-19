'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { mockProducts, type Product } from '@/data/mockData'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts]

    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return products
  }, [searchQuery])

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Produits disponibles</h1>
        <p className="text-muted-foreground">Recherchez des médicaments et vérifiez leur disponibilité</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Rechercher un produit..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-all duration-300">
            <div className="mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-primary">{product.price} MAD</span>
              <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
              </span>
            </div>
            <Link
              href={`/product/${product.id}`}
              className="block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Voir les détails
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
