package com.koula.whatsappclone.chat;

import com.koula.whatsappclone.common.StringResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chats")
@Tag(name = "Chat")
public class ChatController {
    private final ChatService chatService;

    @PostMapping
    private ResponseEntity<StringResponse> createChat(
            @RequestParam(name = "sender-id") String senderId,
            @RequestParam(name = "receiver-id") String receiverId
    ) {
        final String chatId = chatService.createChat(senderId, receiverId);
        StringResponse response = StringResponse.builder()
                .response(chatId)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping
    private ResponseEntity<List<ChatResponse>> getChatsByReceiver(Authentication authentication) {
        return ResponseEntity.ok(chatService.getChatsByReceiverId(authentication));
    }
}
