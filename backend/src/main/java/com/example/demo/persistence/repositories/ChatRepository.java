package com.example.demo.persistence.repositories;

import com.example.demo.persistence.entities.ChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatEntity, Long> {

    @Query("select c from TBL_CHAT c where c.sender.id = :id or c.receiver.id = :id")
    List<ChatEntity> findAllByUserId(long id);

    @Query(value = "SELECT * FROM tbl_chat " +
                   "WHERE (conversation_id, chat_id) " +
                   "IN (SELECT conversation_id, MAX(chat_id) " +
                   "FROM tbl_chat WHERE (receiver_id=:id OR sender_id=:id) GROUP BY conversation_id)",
                    nativeQuery = true)
    List<ChatEntity> findLastMessagesByUserId(long id);

    List<ChatEntity> findAllByConversationId(String id);
}




