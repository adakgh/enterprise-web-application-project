package com.example.demo.search;

import com.example.demo.persistence.entities.ProductEntity;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;
import java.util.Map;

public class ProductSpecification extends BaseSpecification<ProductEntity> {

    public ProductSpecification(Map<String, String> queryMap) {
        super(queryMap);
        customFilters.put("price", this::customPriceFilter);
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
