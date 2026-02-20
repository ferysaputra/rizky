'use client';

import { useState } from 'react';
import { mockUsers, mockNotes } from '@/lib/mock-data';
import { Search, ChevronDown, ChevronUp, StickyNote, Mail, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedUser, setExpandedUser] = useState<string | null>(null);

    const users = mockUsers.filter((u) => u.role === 'user');
    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-display text-2xl font-bold">Users</h1>
                    <p className="text-muted text-sm mt-1">{users.length} registered users</p>
                </div>
            </div>

            {/* Search */}
            <div className="mb-5 max-w-md">
                <div className="relative">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-field pl-10"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="glass-card-strong overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">User</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Email</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Last Login</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Cycle</th>
                            <th className="text-center px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Notes</th>
                            <th className="w-12"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => {
                            const userNotes = mockNotes.filter((n) => n.userId === user.uid);
                            const isExpanded = expandedUser === user.uid;

                            return (
                                <>
                                    <tr
                                        key={user.uid}
                                        className={`border-b border-border/50 hover:bg-gray-50/50 transition-colors cursor-pointer ${isExpanded ? 'bg-primary/[0.02]' : ''
                                            }`}
                                        onClick={() => setExpandedUser(isExpanded ? null : user.uid)}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-lg">
                                                    {user.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">{user.name}</p>
                                                    <p className="text-xs text-muted">ID: {user.uid}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-sm text-muted">
                                                <Mail size={14} />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-sm text-muted">
                                                <Clock size={14} />
                                                {format(user.lastLogin, 'MMM dd, HH:mm')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.cycleSettings ? (
                                                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                                    {user.cycleSettings.length} days
                                                </span>
                                            ) : (
                                                <span className="text-xs text-muted">Not set</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                                                {userNotes.length}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {isExpanded ? (
                                                <ChevronUp size={16} className="text-muted" />
                                            ) : (
                                                <ChevronDown size={16} className="text-muted" />
                                            )}
                                        </td>
                                    </tr>

                                    {/* Expanded Notes */}
                                    {isExpanded && (
                                        <tr key={`${user.uid}-notes`}>
                                            <td colSpan={6} className="px-6 py-4 bg-gray-50/50">
                                                <div className="pl-12">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <StickyNote size={14} className="text-accent" />
                                                        <h4 className="text-sm font-semibold text-accent">User Notes (Read-only)</h4>
                                                    </div>
                                                    {userNotes.length > 0 ? (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            {userNotes.map((note) => (
                                                                <div
                                                                    key={note.id}
                                                                    className="bg-white rounded-xl p-3.5 border border-border/50"
                                                                    style={{ borderLeft: `3px solid ${note.color}` }}
                                                                >
                                                                    <h5 className="text-sm font-semibold">{note.title}</h5>
                                                                    <p className="text-xs text-muted mt-1 line-clamp-2">{note.body}</p>
                                                                    <p className="text-[10px] text-muted/50 mt-2">
                                                                        {format(note.createdAt, 'MMM dd, yyyy')}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-muted">No notes found for this user.</p>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
