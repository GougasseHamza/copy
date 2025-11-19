package com.pharmfinder.service;

import com.pharmfinder.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    public List<Product> getAllProducts() {
        // TODO: Implement Firestore query
        return null;
    }

    public List<Product> searchProducts(String query) {
        // TODO: Implement search with Meilisearch
        return null;
    }

    public Product getProductById(String id) {
        // TODO: Implement Firestore get
        return null;
    }
}
