package com.example.demo.search;

import com.example.demo.search.interfaces.QueryMap;
import org.apache.logging.log4j.util.TriConsumer;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.*;

public abstract class BaseSpecification<T> implements Specification<T>, QueryMap {
    public final Map<String, String> queryMap;
    public final List<Predicate> predicates;
    public final Map<String, TriConsumer<String, Root<T>, CriteriaBuilder>> customFilters;

    public BaseSpecification(Map<String, String> queryMap) {
        this.queryMap = clean(queryMap);
        this.predicates = new ArrayList<>();
        customFilters = new HashMap<>();
    }

    @Override
    public Predicate toPredicate(Root<T> rt, CriteriaQuery<?> cq, CriteriaBuilder cb) {
        queryMap.forEach((k,v) -> constructFilters(k, rt, cb));
        return cb.and(predicates.toArray(new Predicate[0]));
    }

    private void constructFilters(String attr, Root<T> rt, CriteriaBuilder cb) {
        if (customFilters.containsKey(attr)) {
            customFilters.get(attr).accept(attr, rt, cb);
        } else {
            defaultFilter(attr, rt, cb);
        }
    }

    private void defaultFilter(String attr, Root<T> rt, CriteriaBuilder cb) {
        // http://localhost:8080/api/v1/products?id=1,5,30              --> works with non-strings
        // http://localhost:8080/api/v1/products?name=tomatoes,bananas  --> multiple items
        // http://localhost:8080/api/v1/products?name=tomatoes          --> single item
        // http://localhost:8080/api/v1/products?name=ToMaToEs          --> not case-sensitive
        // http://localhost:8080/api/v1/products?name=*t*               --> contains    't'
        // http://localhost:8080/api/v1/products?name=*t                --> endsWith    't'
        // http://localhost:8080/api/v1/products?name=t*                --> startsWith  't'
        // http://localhost:8080/api/v1/products?sort=name              --> sorts on given attribute
        // http://localhost:8080/api/v1/products?name=t*&sort=name      --> mix and match

        // TODO: find out why the char 'n' does not work if its the first and only char in a String.
        //  Could be a bug in Spring Boot...

        var arr = Arrays
                .stream(queryMap.get(attr).split(","))
                .map(String::toLowerCase)
                .map(v -> v.replace('*', '%'))
                .map(v -> cb.like(rt.get(attr).as(String.class), v)) // casting <Number> typed values in db to <String>
                .toArray(Predicate[]::new);
        predicates.add(cb.or(arr));
    }
}
