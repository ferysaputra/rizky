'use client';

import { useState, useRef, useEffect } from 'react';
import { mockChatThreads, mockChatMessages, ChatMessage, ChatThread } from '@/lib/mock-data';
import { Send, Search, Paperclip, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminChatPage() {
    const [selectedThread, setSelectedThread] = useState<ChatThread>(mockChatThreads[0]);
    const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const adminId = 'admin1';

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const filteredThreads = mockChatThreads.filter((t) =>
        t.participantName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSend = () => {
        if (!newMessage.trim()) return;
        const msg: ChatMessage = {
            id: Date.now().toString(),
            senderId: adminId,
            text: newMessage,
            timestamp: new Date(),
            isRead: false,
        };
        setMessages([...messages, msg]);
        setNewMessage('');
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h1 className="font-display text-2xl font-bold">Support Chat</h1>
                <p className="text-muted text-sm mt-1">Respond to user support requests</p>
            </div>

            <div className="glass-card-strong overflow-hidden flex h-[calc(100vh-12rem)]">
                {/* Thread List */}
                <div className="w-80 border-r border-border flex flex-col shrink-0">
                    {/* Search */}
                    <div className="p-4 border-b border-border">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-9 py-2 text-sm"
                            />
                        </div>
                    </div>

                    {/* Threads */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredThreads.map((thread) => (
                            <button
                                key={thread.id}
                                onClick={() => setSelectedThread(thread)}
                                className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left border-b border-border/30 ${selectedThread.id === thread.id ? 'bg-primary/[0.03] border-l-2 border-l-primary' : ''
                                    }`}
                            >
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-lg shrink-0">
                                    {thread.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-semibold truncate">{thread.participantName}</h4>
                                        <span className="text-[10px] text-muted shrink-0">
                                            {format(thread.updatedAt, 'HH:mm')}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted truncate mt-0.5">{thread.lastMessage}</p>
                                </div>
                                {thread.unreadCount > 0 && (
                                    <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold shrink-0">
                                        {thread.unreadCount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="h-16 border-b border-border flex items-center justify-between px-5 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-lg">
                                {selectedThread.avatar}
                            </div>
                            <div>
                                <h3 className="text-sm font-bold">{selectedThread.participantName}</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-success" />
                                    <span className="text-[10px] text-muted">Online</span>
                                </div>
                            </div>
                        </div>
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreVertical size={18} className="text-muted" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                        <div className="flex items-center justify-center mb-4">
                            <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] text-muted font-medium">
                                Today
                            </span>
                        </div>

                        {messages.map((msg) => {
                            const isAdmin = msg.senderId === adminId;
                            return (
                                <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
                                        <div
                                            className={`px-4 py-2.5 max-w-[70%] text-sm leading-relaxed ${isAdmin
                                                    ? 'bg-gradient-to-br from-primary to-accent text-white rounded-2xl rounded-br-sm'
                                                    : 'bg-gray-100 text-foreground rounded-2xl rounded-bl-sm'
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                        <span className="text-[10px] text-muted mt-1 px-1">
                                            {format(msg.timestamp, 'HH:mm')}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-border px-4 py-3 flex items-end gap-2">
                        <button className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors shrink-0">
                            <Paperclip size={18} className="text-muted" />
                        </button>
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Type a reply..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="input-field text-sm"
                            />
                        </div>
                        <button
                            onClick={handleSend}
                            disabled={!newMessage.trim()}
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center shrink-0 disabled:opacity-40 hover:shadow-md transition-all"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
