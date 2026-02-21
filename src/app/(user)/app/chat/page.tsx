'use client';

import { useState, useRef, useEffect } from 'react';
import { mockChatMessages, ChatMessage } from '@/lib/mock-data';
import ChatBubble from '@/components/ChatBubble';
import { ArrowLeft, Send, Paperclip, Smile, MoreVertical } from 'lucide-react';

export default function ChatPage() {
    const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const currentUserId = 'user1';

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        const msg: ChatMessage = {
            id: Date.now().toString(),
            senderId: currentUserId,
            text: newMessage,
            timestamp: new Date(),
            isRead: false,
        };
        setMessages([...messages, msg]);
        setNewMessage('');

        // Simulate admin reply
        setTimeout(() => {
            const reply: ChatMessage = {
                id: (Date.now() + 1).toString(),
                senderId: 'admin1',
                text: 'Thanks for your message! Our team will get back to you shortly 😊',
                timestamp: new Date(),
                isRead: false,
            };
            setMessages((prev) => [...prev, reply]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] animate-fade-in">
            {/* Chat Header */}
            <div className="px-4 py-3 glass-card-strong rounded-none border-b border-border flex items-center gap-3 shrink-0">
                {/* <button className="w-8 h-8 rounded-lg hover:bg-primary/5 flex items-center justify-center transition-colors">
                    <ArrowLeft size={18} className="text-foreground" />
                </button> */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm">
                    👩‍💼
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-sm">Support Team</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-[10px] text-muted">Online</span>
                    </div>
                </div>
                {/* <button className="w-8 h-8 rounded-lg hover:bg-primary/5 flex items-center justify-center transition-colors">
                    <MoreVertical size={18} className="text-muted" />
                </button> */}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 hide-scrollbar">
                {/* Date separator */}
                <div className="flex items-center justify-center mb-4">
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] text-muted font-medium">
                        Today
                    </span>
                </div>

                {messages.map((msg) => (
                    <ChatBubble
                        key={msg.id}
                        message={msg}
                        isCurrentUser={msg.senderId === currentUserId}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-3 py-3 glass-card-strong rounded-none border-t border-border shrink-0">
                <div className="flex items-end gap-2">
                    {/* <button className="w-10 h-10 rounded-xl hover:bg-primary/5 flex items-center justify-center transition-colors shrink-0">
                        <Paperclip size={18} className="text-muted" />
                    </button> */}
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="input-field pr-10 text-sm"
                        />
                        {/* <button className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Smile size={18} className="text-muted hover:text-primary transition-colors" />
                        </button> */}
                    </div>
                    <button
                        onClick={handleSend}
                        disabled={!newMessage.trim()}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center shrink-0 disabled:opacity-40 hover:shadow-md hover:shadow-primary/20 transition-all duration-200"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
