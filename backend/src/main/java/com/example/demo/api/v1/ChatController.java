package com.example.demo.api.v1;

import com.example.demo.models.RoleType;
import com.example.demo.models.dto.ChatDto;
import com.example.demo.models.dto.ChatMessageDto;
import com.example.demo.persistence.entities.ChatEntity;
import com.example.demo.security.Principal;
import com.example.demo.services.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/chat")
public class ChatController {

    private final ChatService chatService;

    /**
     * Retrieves all chat-messages.
     */
    @GetMapping
    public List<ChatDto> getAllChats() {
        return chatService.findAll();
    }

    /**
     * Retrieves all chat-messages corresponding to the logged-in user.
     */
    @Secured({RoleType.SUPPLIER, RoleType.CUSTOMER})
    @GetMapping("/user")
    public List<List<ChatDto>> getAllUserChats(@AuthenticationPrincipal Principal principal) {
        return chatService.findAllByUserId(principal.getId());
    }

    /**
     * Retrieves the last chat-messages corresponding to the logged-in user.
     */
    @Secured({RoleType.SUPPLIER, RoleType.CUSTOMER})
    @GetMapping("/user/last")
    public List<List<ChatDto>> getLastUserMessages(@AuthenticationPrincipal Principal principal) {
        return chatService.findLastMessagesByUserId(principal.getId());
    }

    /**
     * Retrieves the conversation-messages between the logged-in user and an
     * other chatter.
     */
    @Secured({RoleType.SUPPLIER, RoleType.CUSTOMER})
    @GetMapping("/conversation/{chattingToId}")
    public List<List<ChatDto>> getConversationMessages(@PathVariable long chattingToId,
                                                       @AuthenticationPrincipal Principal principal) {
        String conversationId = ChatEntity.generateConversationId(principal.getId(), chattingToId);
        return chatService.findAllByConversationId(conversationId);
    }

    @Secured({RoleType.SUPPLIER, RoleType.CUSTOMER})
    @PostMapping("/conversation/{toUserId}")
    public void SendMessage(@PathVariable long toUserId,
                            @RequestBody ChatMessageDto dto,
                            @AuthenticationPrincipal Principal principal) {
        chatService.saveMessage(principal, toUserId, dto.getMessage());
    }

}
