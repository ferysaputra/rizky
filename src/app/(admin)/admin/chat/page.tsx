'use client';

import { useState, useEffect, useRef } from 'react';
import ChatBubble from '@/components/ChatBubble';
import { Send, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { subscribeToThreads, subscribeToMessages, sendMessage, ChatThread, ChatMessage } from '@/lib/firestore/chat';

export default function AdminChatPage() {
    const { user } = useAuth();
    const [threads, setThreads] = useState<ChatThread[]>([]);
    const [selectedThread, setSelectedThread] = useState<ChatThread | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingThreads, setLoadingThreads] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Subscribe to all threads
    useEffect(() => {
        const unsubscribe = subscribeToThreads((threadList) => {
            setThreads(threadList);
            setLoadingThreads(false);
        });
        return () => unsubscribe();
    }, []);

    // Subscribe to messages when a thread is selected
    useEffect(() => {
        if (!selectedThread) return;
        const unsubscribe = subscribeToMessages(selectedThread.id, (msgs) => {
            setMessages(msgs);
        });
        return () => unsubscribe();
    }, [selectedThread]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!newMessage.trim() || !selectedThread || !user) return;
        try {
            await sendMessage(selectedThread.id, user.uid, newMessage);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const filteredThreads = threads.filter((t) =>
        t.participantName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h1 className="font-display text-2xl font-bold">Obrolan Bantuan</h1>
                <p className="text-muted text-sm mt-1">Tanggapi permintaan bantuan pengguna</p>
            </div>

            <div className="glass-card-strong overflow-hidden flex h-[calc(100vh-12rem)]">
                {/* Thread List */}
                <div className="w-80 border-r border-border flex flex-col shrink-0">
                    <div className="p-3 border-b border-border">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                            <input
                                type="text"
                                placeholder="Cari percakapan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-9 text-xs py-2"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {loadingThreads ? (
                            <div className="p-4 space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="h-14 rounded-xl bg-gray-100 animate-pulse" />
                                ))}
                            </div>
                        ) : filteredThreads.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-4xl mb-2">💬</p>
                                <p className="text-muted text-xs">Belum ada percakapan</p>
                            </div>
                        ) : (
                            filteredThreads.map((thread) => (
                                <div
                                    key={thread.id}
                                    onClick={() => setSelectedThread(thread)}
                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-border/30 ${selectedThread?.id === thread.id ? 'bg-primary/5' : ''
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-lg shrink-0">
                                        {thread.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate">{thread.participantName}</p>
                                        <p className="text-xs text-muted truncate mt-0.5">{thread.lastMessage}</p>
                                    </div>
                                    {thread.unreadCount > 0 && (
                                        <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold shrink-0">
                                            {thread.unreadCount}
                                        </span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {selectedThread ? (
                        <>
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-border flex items-center gap-3 shrink-0">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm">
                                    {selectedThread.avatar}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">{selectedThread.participantName}</h3>
                                    <span className="text-[10px] text-muted">Online</span>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                                <div className="flex items-center justify-center mb-4">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] text-muted font-medium">
                                        Hari ini
                                    </span>
                                </div>
                                {messages.map((msg) => (
                                    <ChatBubble
                                        key={msg.id}
                                        message={msg}
                                        isCurrentUser={msg.senderId === user?.uid}
                                    />
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="px-4 py-3 border-t border-border shrink-0">
                                <div className="flex items-end gap-2">
                                    <input
                                        type="text"
                                        placeholder="Ketik balasan..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        className="input-field flex-1 text-sm"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!newMessage.trim()}
                                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center disabled:opacity-40 shrink-0"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-4xl mb-3">👩‍💼</p>
                                <p className="text-muted text-sm">Pilih percakapan untuk memulai</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
