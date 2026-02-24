'use client';

import { useState, useRef, useEffect } from 'react';
import ChatBubble from '@/components/ChatBubble';
import { Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getOrCreateThread, subscribeToMessages, sendMessage, ChatMessage } from '@/lib/firestore/chat';

export default function ChatPage() {
    const { user, userData } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [threadId, setThreadId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user || !userData) return;

        async function initChat() {
            try {
                const tid = await getOrCreateThread(user!.uid, userData!.name, userData!.avatar);
                setThreadId(tid);

                // Subscribe to real-time messages
                const unsubscribe = subscribeToMessages(tid, (msgs) => {
                    setMessages(msgs);
                    setLoading(false);
                });

                return unsubscribe;
            } catch (error) {
                console.error('Error initializing chat:', error);
                setLoading(false);
            }
        }

        const cleanup = initChat();
        return () => {
            cleanup?.then((unsub) => unsub?.());
        };
    }, [user, userData]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!newMessage.trim() || !threadId || !user) return;
        try {
            await sendMessage(threadId, user.uid, newMessage);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] animate-fade-in">
            {/* Chat Header */}
            <div className="px-4 py-3 glass-card-strong rounded-none border-b border-border flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm">
                    👩‍💼
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-sm">Tim Bantuan</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-[10px] text-muted">Online</span>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 hide-scrollbar">
                {/* Date separator */}
                <div className="flex items-center justify-center mb-4">
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] text-muted font-medium">
                        Hari ini
                    </span>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-4xl mb-3">💬</p>
                        <p className="text-muted text-sm">Mulai percakapan dengan tim bantuan</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <ChatBubble
                            key={msg.id}
                            message={msg}
                            isCurrentUser={msg.senderId === user?.uid}
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-3 py-3 glass-card-strong rounded-none border-t border-border shrink-0">
                <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Ketik pesan..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="input-field pr-10 text-sm"
                        />
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
