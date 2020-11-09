package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "tbl_product")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class ProductEntity {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal price;

    @Column(name = "views_week")
    private Long weeklyViews = 0L;

    @Column(name = "views_month")
    private Long monthlyViews = 0L;

    @Column(name = "views_all_time")
    private Long allTimeViews = 0L;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    public void setPrice(String price) {
        this.price = new BigDecimal(price);
    }

    public void setUser(UserEntity user) {
        this.user = user;
        user.getProducts().add(this);
    }

    @Override
    public String toString() {
        return String.format(
                "ProductEntity{id=%s, name=%s, price=%s}",
                id, name, price);
    }

    public void setName(String name) {
        this.name = name;
    }
}
