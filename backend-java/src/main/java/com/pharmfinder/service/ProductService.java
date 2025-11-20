package com.pharmfinder.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pharmfinder.dto.MedicineDTO;
import com.pharmfinder.model.Product;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final List<Product> products;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Random random = new Random();

    public ProductService() {
        this.products = loadProductsFromJson();
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

    private List<Product> loadProductsFromJson() {
        try {
            ClassPathResource resource = new ClassPathResource("data/medicines.json");
            List<MedicineDTO> medicines = objectMapper.readValue(
                    resource.getInputStream(),
                    new TypeReference<List<MedicineDTO>>() {}
            );
            
            System.out.println("Loaded " + medicines.size() + " medicines from JSON");
            
            return medicines.stream()
                    .map(this::convertToProduct)
                    .collect(Collectors.toList());
                    
        } catch (IOException e) {
            System.err.println("Error loading medicines data: " + e.getMessage());
            e.printStackTrace();
            return createFallbackProducts();
        }
    }

    private Product convertToProduct(MedicineDTO dto) {
        Product product = new Product();
        product.setId(String.valueOf(dto.getId()));
        product.setName(dto.getName());
        product.setDescription(truncate(dto.getUsage(), 200));
        product.setPrice(dto.getPrice());
        
        // Generate random stock (0-200)
        product.setStock(random.nextInt(201));
        
        // Assign random pharmacy ID (1-5)
        product.setPharmacyId(String.valueOf(random.nextInt(5) + 1));
        
        // Determine category
        product.setCategory(determineCategory(dto));
        
        product.setImageUrl("https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300");
        product.setUses(dto.getUsage());
        product.setDisclaimer("Consultez votre médecin ou pharmacien avant utilisation");
        product.setCreatedAt(LocalDateTime.now());
        
        return product;
    }

    private String determineCategory(MedicineDTO dto) {
        String name = dto.getName().toLowerCase();
        String usage = dto.getUsage() != null ? dto.getUsage().toLowerCase() : "";
        
        if (name.contains("atorva") || name.contains("lipitor") || usage.contains("cholestérol")) {
            return "Cardiovasculaire";
        } else if (name.contains("doliprane") || name.contains("paracetamol") || name.contains("efferalgan")) {
            return "Antalgiques";
        } else if (name.contains("ibuprofene") || name.contains("advil") || name.contains("voltarene")) {
            return "Anti-inflammatoires";
        } else if (name.contains("amoxicilline") || name.contains("azithromycine") || name.contains("augmentin")) {
            return "Antibiotiques";
        } else if (name.contains("vitamine")) {
            return "Vitamines";
        } else if (usage.contains("hypertension") || usage.contains("tension artérielle")) {
            return "Cardiovasculaire";
        } else if (usage.contains("diabète") || usage.contains("glycémie")) {
            return "Diabète";
        } else if (usage.contains("respiratoire") || usage.contains("toux") || usage.contains("asthme")) {
            return "Respiratoire";
        } else if (usage.contains("allergie") || usage.contains("antihistaminique")) {
            return "Allergies";
        } else if (usage.contains("digestif") || usage.contains("gastro")) {
            return "Digestif";
        } else {
            return "Médicaments";
        }
    }

    private String truncate(String text, int maxLength) {
        if (text == null) return "";
        if (text.length() <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    }

    private List<Product> createFallbackProducts() {
        List<Product> list = new ArrayList<>();
        list.add(createProduct("1", "Doliprane 1000mg", "Paracétamol pour douleurs et fièvre", 35.0, "Antalgiques", 150));
        list.add(createProduct("2", "Atorvastatine 20mg", "Statine pour cholestérol", 85.0, "Cardiovasculaire", 80));
        list.add(createProduct("3", "Ibuprofène 400mg", "Anti-inflammatoire", 32.0, "Anti-inflammatoires", 120));
        return list;
    }

    private Product createProduct(String id, String name, String description, Double price, String category, int stock) {
        Product p = new Product();
        p.setId(id);
        p.setName(name);
        p.setDescription(description);
        p.setPrice(price);
        p.setStock(stock);
        p.setPharmacyId("1");
        p.setCategory(category);
        p.setImageUrl("https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300");
        p.setUses(description);
        p.setDisclaimer("Consultez votre médecin ou pharmacien avant utilisation");
        p.setCreatedAt(LocalDateTime.now());
        return p;
    }
}
