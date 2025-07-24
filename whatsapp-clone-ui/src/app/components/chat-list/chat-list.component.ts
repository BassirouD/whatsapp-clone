import {Component, input, InputSignal, OnInit, output} from '@angular/core';
import {ChatResponse} from "../../services/models/chat-response";
import {UserResponse} from "../../services/models/user-response";
import {UserService} from "../../services/services/user.service";
import {CommonModule} from "@angular/common";
import {ChatService} from "../../services/services/chat.service";
import {KeycloakService} from "../../utils/keycloak/keycloak.service";

@Component({
    selector: 'app-chat-list',
    imports: [CommonModule],
    templateUrl: './chat-list.component.html',
    standalone: true,
    styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnInit {

    chats: InputSignal<ChatResponse[]> = input<ChatResponse[]>([]);
    searchNewContact = false
    contacts: Array<UserResponse> = [];
    chatSelected = output<ChatResponse>();
    fullName = '';

    constructor(
        private userService: UserService,
        private chatService: ChatService,
        private keycloakService: KeycloakService
    ) {
    }

    ngOnInit(): void {
        this.fullName = this.keycloakService.fullName
    }

    searchContact() {
        this.userService.getAllUsers()
            .subscribe({
                next: (user) => {
                    this.contacts = user;
                    this.searchNewContact = true;
                }
            })
    }

    chatClicked(chat: ChatResponse) {
        this.chatSelected.emit(chat)
    }

    wrapMessage(lastMessage: string | undefined): string {
        if (lastMessage && lastMessage.length <= 20)
            return lastMessage;
        return lastMessage?.substring(0, 17) + '...';
    }

    selectContact(contact: UserResponse) {
        this.chatService.createChat({
            'sender-id': this.keycloakService.userId as string,
            'receiver-id': contact.id as string
        }).subscribe({
            next: (res) => {
                const chat: ChatResponse = {
                    id: res.response,
                    name: contact.firstName + '' + contact.lastName,
                    recipientOnline: contact.online,
                    lastMessageTime: contact.lastSeen,
                    senderId: this.keycloakService.userId,
                    recipientId: contact.id
                };
                this.chats().unshift(chat);
                this.searchNewContact = false;
                this.chatSelected.emit(chat)
            }
        })
    }
}
