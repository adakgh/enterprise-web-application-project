package com.example.demo.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name = "TBL_USER")
public class UserEntity {

    @Id
    @Column(name = "USER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "FULLNAME")
    private String fullname;

    @Column(name = "USERNAME", unique = true)
    private String username;

    @Column(name = "PASSWORD")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "TBL_USER_ROLE",
            joinColumns = @JoinColumn(name = "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "ROLE_ID"))
    private Set<RoleEntity> roles = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "SUPPLIER_ID")
    private SupplierEntity supplier;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "CUSTOMER_ID")
    private CustomerEntity customer;

    @JsonIgnore
    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
    private Set<ChatEntity> chatMessages = new HashSet<>();

    @Column(name = "LOCKED")
    private boolean locked;

    /** JPA convenience method to add a single role */
    public void addRole(RoleEntity role) {
        roles.add(role);
        role.getUsers().add(this);
    }

    /**
     * Convenience method to add a single chat-message
     */
    public void addChatMessage(ChatEntity chatMessage, UserEntity receiver) {
        this.chatMessages.add(chatMessage);
        chatMessage.setSender(this);
        chatMessage.setReceiver(receiver);
        chatMessage.setConversationId(this.getId(), receiver.getId());
    }
}












//    private static final String EMAIL_REGEX =
//            "^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
//
//    private static final String PASSWORD_REGEX =
//            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
