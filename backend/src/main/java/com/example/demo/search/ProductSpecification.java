package com.example.demo.search;

import com.example.demo.persistence.entities.ProductEntity;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Map;

public class ProductSpecification extends BaseSpecification<ProductEntity> {

    public ProductSpecification(Map<String, String> queryMap) {
        super(queryMap);
        customFilters.put("category", this::customCategoryFilter);
        customFilters.put("price", this::customPriceFilter);
    }

    private void customCategoryFilter(String attr, Root<ProductEntity> rt, CriteriaBuilder cb) {
        // http://localhost:8080/api/v1/products?category=2,5            --> multiple categories
        // http://localhost:8080/api/v1/products?category=5              --> exact category

        var arr = Arrays.stream(queryMap.get(attr).split(","))
                .map(v -> cb.equal(rt.get("productCategory"), Long.parseLong(v)))
                .toArray(Predicate[]::new);
        predicates.add(cb.or(arr));
    }

    private void customPriceFilter(String attr, Root<ProductEntity> rt, CriteriaBuilder cb) {
        // http://localhost:8080/api/v1/products?price=2.95-49.95       --> between prices
        // http://localhost:8080/api/v1/products?price=2.95             --> exact price

        var arr = queryMap.get(attr).split("-", 2);
        var lo = new BigDecimal(arr[0]);
        var hi = arr.length > 1 ? new BigDecimal(arr[1]) : lo;
        predicates.add(cb.between(rt.get(attr), lo, hi));
    }
}
