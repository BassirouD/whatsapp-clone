package com.koula.whatsappclone.chat;

import com.koula.whatsappclone.common.BaseAuditingEntity;
import com.koula.whatsappclone.message.Message;
import com.koula.whatsappclone.message.MessageState;
import com.koula.whatsappclone.message.MessageType;
import com.koula.whatsappclone.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "chats")
@NamedQuery(
        name = ChatConstants.FIND_CHAT_BY_SENDER_ID,
        query = "SELECT DISTINCT c FROM Chat c WHERE c.sender.id = :senderId OR c.recipient.id = :senderId ORDER BY createdDate DESC")
@NamedQuery(
        name = ChatConstants.FIND_CHAT_BY_SENDER_ID_OR_RECEIVER,
        query = "SELECT DISTINCT c FROM Chat c WHERE (c.sender.id = :senderId AND c.recipient.id = :recipientId) OR (c.sender.id = :recipientId AND c.recipient.id = :senderId) ORDER BY createdDate DESC")
public class Chat extends BaseAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;
    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private User recipient;
    @OneToMany(mappedBy = "chat", fetch = FetchType.EAGER)
    @OrderBy("createdDate DESC")
    private List<Message> messages;

    @Transient
    public String getChatName(final String senderId) {
        if (recipient.getId().equals(senderId)) {
            return sender.getFirstName() + " " + sender.getLastName();
        }
        return recipient.getFirstName() + " " + recipient.getLastName();
    }

    @Transient
    public String getTargetChatName(final String senderId) {
        if (sender.getId().equals(senderId)) {
            return sender.getFirstName() + " " + sender.getLastName();
        }
        return recipient.getFirstName() + " " + recipient.getLastName();
    }

    @Transient
    public long getUnreadMessages(final String senderId) {
        return messages
                .stream()
                .filter(message -> message.getReceiverId().equals(senderId))
                .filter(message -> MessageState.SENT == message.getState())
                .count();
    }

    @Transient
    public String getLastMessage() {
        if (messages != null && !messages.isEmpty()) {
            if (messages.get(0).getType() != MessageType.TEXT) {
                return "Attachment";
            }
            return messages.get(0).getContent();
        }
        return null;
    }

    @Transient
    public LocalDateTime getLastMessageTime() {
        if (messages != null && !messages.isEmpty()) {
            return messages.get(0).getCreatedDate();
        }
        return null;
    }
}
