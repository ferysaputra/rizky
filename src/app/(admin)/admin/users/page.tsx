'use client';

import React from 'react';

import { useState, useEffect } from 'react';
import { getUsers, UserProfile } from '@/lib/firestore/users';
import { getNotes, Note } from '@/lib/firestore/notes';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedUser, setExpandedUser] = useState<string | null>(null);
    const [userNotes, setUserNotes] = useState<Record<string, Note[]>>({});

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await getUsers();
                setUsers(data.filter((u) => u.role === 'user'));
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleUserNotes = async (uid: string) => {
        if (expandedUser === uid) {
            setExpandedUser(null);
            return;
        }
        setExpandedUser(uid);
        if (!userNotes[uid]) {
            try {
                const notes = await getNotes(uid);
                setUserNotes((prev) => ({ ...prev, [uid]: notes }));
            } catch (error) {
                console.error('Error fetching user notes:', error);
            }
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-display text-2xl font-bold">Pengguna</h1>
                    <p className="text-muted text-sm mt-1">{users.length} pengguna terdaftar</p>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                        type="text"
                        placeholder="Cari pengguna..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-field pl-10 text-sm"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="glass-card-strong overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left text-xs font-semibold text-muted p-4">Pengguna</th>
                                <th className="text-left text-xs font-semibold text-muted p-4">Email</th>
                                <th className="text-left text-xs font-semibold text-muted p-4">Masuk Terakhir</th>
                                <th className="text-left text-xs font-semibold text-muted p-4">Siklus</th>
                                <th className="text-left text-xs font-semibold text-muted p-4">Catatan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <tr key={i}>
                                        <td colSpan={5} className="p-4">
                                            <div className="h-10 rounded bg-gray-100 animate-pulse" />
                                        </td>
                                    </tr>
                                ))
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center text-muted text-sm p-8">
                                        Tidak ada pengguna ditemukan
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <React.Fragment key={user.uid}>
                                        <tr className="border-b border-border/50 hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-base">
                                                        {user.avatar}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">{user.name}</p>
                                                        <p className="text-xs text-muted">ID: {user.uid}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm">{user.email}</td>
                                            <td className="p-4 text-sm text-muted">
                                                {user.lastLogin.toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="p-4 text-sm">
                                                {user.cycleSettings ? (
                                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                                        {user.cycleSettings.length} hari
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-muted">Belum diatur</span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <button
                                                    onClick={() => toggleUserNotes(user.uid)}
                                                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                                                >
                                                    {expandedUser === user.uid ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                                    Lihat catatan
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedUser === user.uid && (
                                            <tr key={`notes-${user.uid}`}>
                                                <td colSpan={5} className="bg-gray-50/50 p-4">
                                                    <h4 className="text-xs font-semibold text-muted mb-2">Catatan Pengguna (Hanya baca)</h4>
                                                    {userNotes[user.uid] ? (
                                                        userNotes[user.uid].length > 0 ? (
                                                            <div className="space-y-2">
                                                                {userNotes[user.uid].map((note) => (
                                                                    <div key={note.id} className="bg-white p-3 rounded-lg border border-border/50">
                                                                        <p className="text-sm font-semibold">{note.title}</p>
                                                                        <p className="text-xs text-muted mt-1">{note.body}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-sm text-muted">Tidak ada catatan untuk pengguna ini.</p>
                                                        )
                                                    ) : (
                                                        <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
