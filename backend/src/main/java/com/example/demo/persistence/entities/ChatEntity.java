package com.example.demo.persistence.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity(name = "TBL_CHAT")
public class ChatEntity {

    @Id
    @Column(name = "CHAT_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "MESSAGE")
    private String message;

    @Column(name = "DATE_CREATED")
    private Date createdDate = new Date(System.currentTimeMillis());

    @Column(name = "CONVERSATION_ID")
    private String conversationId;

    @ManyToOne
    @JoinColumn(name = "SENDER_ID")
    private UserEntity sender;

    @ManyToOne
    @JoinColumn(name = "RECEIVER_ID")
    private UserEntity receiver;

    /**
     * Convenience method to set an unique conversation-id
     */
    public void setConversationId(long id1, long id2) {
        this.conversationId = generateConversationId(id1, id2);
    }

    /**
     * Convenience method that generates a conversation-id based on given ids.
     */
    public static String generateConversationId(long id1, long id2) {
        return id1 < id2 ? id1 + "" + id2 : id2 + "" + id1;
    }
}
