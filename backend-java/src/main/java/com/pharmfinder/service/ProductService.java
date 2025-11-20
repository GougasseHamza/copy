package com.pharmfinder.service;

import com.pharmfinder.model.Product;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final List<Product> products;

    public ProductService() {
        this.products = createMockProducts();
    }

    public List<Product> getAllProducts() {
        return new ArrayList<>(products);
    }

    public List<Product> searchProducts(String query, int limit) {
        if (query == null || query.trim().isEmpty()) {
            return new ArrayList<>();
        }
        
        String lowerQuery = query.toLowerCase();
        return products.stream()
                .filter(p -> p.getName().toLowerCase().contains(lowerQuery) ||
                        (p.getDescription() != null && p.getDescription().toLowerCase().contains(lowerQuery)) ||
                        (p.getCategory() != null && p.getCategory().toLowerCase().contains(lowerQuery)))
                .limit(limit)
                .collect(Collectors.toList());
    }

    public Product getProductById(String id) {
        return products.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    private List<Product> createMockProducts() {
        List<Product> list = new ArrayList<>();

        // Paracetamol products
        list.add(createProduct("1", "Doliprane 1000mg", "Paracétamol pour douleurs et fièvre", 35.0, "Antalgiques"));
        list.add(createProduct("2", "Doliprane 500mg", "Paracétamol dosage enfant", 25.0, "Antalgiques"));
        list.add(createProduct("3", "Paracétamol 500mg", "Antalgique et antipyrétique générique", 20.0, "Antalgiques"));
        list.add(createProduct("4", "Efferalgan 1g", "Paracétamol effervescent", 38.0, "Antalgiques"));

        // Anti-inflammatoires
        list.add(createProduct("5", "Ibuprofène 400mg", "Anti-inflammatoire non stéroïdien", 32.0, "Anti-inflammatoires"));
        list.add(createProduct("6", "Advil 400mg", "Ibuprofène pour douleurs", 42.0, "Anti-inflammatoires"));
        list.add(createProduct("7", "Voltarène 50mg", "Diclofénac anti-inflammatoire", 65.0, "Anti-inflammatoires"));

        // Antibiotiques
        list.add(createProduct("8", "Amoxicilline 1g", "Antibiotique à large spectre", 120.0, "Antibiotiques"));
        list.add(createProduct("9", "Azithromycine 250mg", "Antibiotique macrolide", 145.0, "Antibiotiques"));
        list.add(createProduct("10", "Augmentin 1g", "Amoxicilline + Acide clavulanique", 180.0, "Antibiotiques"));

        // Vitamines
        list.add(createProduct("11", "Vitamine C 1000mg", "Renforce le système immunitaire", 45.0, "Vitamines"));
        list.add(createProduct("12", "Vitamine D3 2000UI", "Pour les os et l'immunité", 55.0, "Vitamines"));
        list.add(createProduct("13", "Multivitamines", "Complexe vitaminique complet", 85.0, "Vitamines"));

        // Respiratoire
        list.add(createProduct("14", "Sirop contre la toux", "Expectorant et antitussif", 65.0, "Respiratoire"));
        list.add(createProduct("15", "Aerius 5mg", "Antihistaminique pour allergies", 95.0, "Respiratoire"));
        list.add(createProduct("16", "Rhinadvil", "Rhume et congestion nasale", 48.0, "Respiratoire"));

        // Cardiovasculaire - including Atorvastatine
        list.add(createProduct("17", "Atorvastatine 20mg", "Statine pour cholestérol", 85.0, "Cardiovasculaire"));
        list.add(createProduct("18", "Atorva 40mg", "Contrôle du cholestérol", 125.0, "Cardiovasculaire"));
        list.add(createProduct("19", "Aspirine 100mg", "Antiagrégant plaquettaire", 30.0, "Cardiovasculaire"));
        list.add(createProduct("20", "Lipitor 20mg", "Atorvastatine marque", 145.0, "Cardiovasculaire"));

        // Dermatologie
        list.add(createProduct("21", "Crème hydratante", "Soin visage et corps", 85.0, "Dermatologie"));
        list.add(createProduct("22", "Bépanthène", "Cicatrisant cutané", 72.0, "Dermatologie"));
        list.add(createProduct("23", "Diprosone crème", "Corticoïde dermique", 95.0, "Dermatologie"));

        // Ophtalmologie
        list.add(createProduct("24", "Collyre yeux secs", "Larmes artificielles", 55.0, "Ophtalmologie"));
        list.add(createProduct("25", "Vismed gel", "Hydratation oculaire", 78.0, "Ophtalmologie"));

        return list;
    }

    private Product createProduct(String id, String name, String description, Double price, String category) {
        Product p = new Product();
        p.setId(id);
        p.setName(name);
        p.setDescription(description);
        p.setPrice(price);
        p.setCategory(category);
        p.setImageUrl("https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300");
        p.setUses(description);
        p.setDisclaimer("Consultez votre médecin ou pharmacien avant utilisation");
        p.setCreatedAt(LocalDateTime.now());
        return p;
    }
}
