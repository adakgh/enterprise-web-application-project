package com.example.demo.persistence.repositories;

import com.example.demo.persistence.entities.ChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatEntity, Long> {

    @Query("select c from TBL_CHAT c where c.sender.id = :id or c.receiver.id = :id")
    List<ChatEntity> findAllByUserId(long id);

    @Query(
            value = "SELECT * FROM TBL_CHAT " +
                    "WHERE (CONVERSATION_ID, CHAT_ID) " +
                    "IN (SELECT CONVERSATION_ID, MAX(CHAT_ID) " +
                    "FROM TBL_CHAT WHERE (RECEIVER_ID=4 OR SENDER_ID=4) GROUP BY CONVERSATION_ID)",
            nativeQuery = true)
    List<ChatEntity> findLastMessagesByUserId(long id);

    List<ChatEntity> findAllByConversationId(String id);
}




