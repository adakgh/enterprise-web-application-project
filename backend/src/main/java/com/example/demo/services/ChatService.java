package com.example.demo.services;

import com.example.demo.models.dto.ChatDto;
import com.example.demo.persistence.entities.ChatEntity;
import com.example.demo.persistence.entities.UserEntity;
import com.example.demo.persistence.repositories.ChatRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final ModelMapper modelMapper;

    /**
     * Retrieves all chat-messages from the database.
     */
    public List<ChatDto> findAll() {
        List<ChatEntity> dbMessages = chatRepository.findAll();
        List<ChatDto> messages = new ArrayList<>();
        dbMessages.forEach(e -> messages.add(convertToDto(e)));
        return messages;
    }

    /**
     * Retrieves all chat-messages by given user-id from the database.
     */
    public ArrayList<List<ChatDto>> findAllByUserId(long id) {
        List<ChatEntity> dbMessages = chatRepository.findAllByUserId(id);
        return groupChatMessages(dbMessages);
    }

    /**
     * Retrieves the last chat-messages from a conversation by given
     * user-id from the database.
     */
    public ArrayList<List<ChatDto>> findLastMessagesByUserId(long id) {
        List<ChatEntity> dbMessages = chatRepository.findLastMessagesByUserId(id);
        return groupChatMessages(dbMessages);
    }

    /**
     * Retrieves all chat-messages by given conversation-id from the database.
     */
    public ArrayList<List<ChatDto>> findAllByConversationId(String id) {
        List<ChatEntity> dbMessages = chatRepository.findAllByConversationId(id);
        return groupChatMessages(dbMessages);
    }

    /**
     * Convenience method that converts a chat-entity to a chat-DTO.
     */
    private ChatDto convertToDto(ChatEntity chat) {
        ChatDto dto = modelMapper.map(chat, ChatDto.class);
        dto.getSender().setChatName(resolveChatName(chat.getSender()));
        dto.getReceiver().setChatName(resolveChatName(chat.getReceiver()));
        return dto;
    }

    /**
     * Convenience method that resolves the name for a chat-user.
     */
    private String resolveChatName(UserEntity user) {
        // supplier
        var supplier = user.getSupplier();
        if (supplier != null) return supplier.getCompanyName();

        // customer
        var customer = user.getCustomer();
        if (customer != null) return customer.getFirstName() + " " + customer.getLastName();

        // something went wrong if we came this far
        return null;
    }

    /**
     * Convenience method that groups chat-messages by conversation.
     */
    private ArrayList<List<ChatDto>> groupChatMessages(List<ChatEntity> messages) {
        var indexes = new HashMap<String, Integer>();
        var chats = new ArrayList<List<ChatDto>>();

        messages.forEach(e -> {
            var key = e.getConversationId();
            var cIndex = indexes.get(key);

            if (cIndex != null) {
                chats.get(cIndex).add(convertToDto(e));
            } else {
                indexes.put(key, chats.size());
                chats.add(new ArrayList<>(List.of(convertToDto(e))));
            }
        });
        return chats;
    }
}
