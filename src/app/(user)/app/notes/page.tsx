'use client';

import { useState, useEffect } from 'react';
import NoteCard from '@/components/NoteCard';
import { Plus, X, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getNotes, createNote, updateNote, deleteNote, Note } from '@/lib/firestore/notes';

export default function NotesPage() {
    const { user } = useAuth();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');
    const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!user) return;
        async function fetchNotes() {
            try {
                const data = await getNotes(user!.uid);
                setNotes(data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchNotes();
    }, [user]);

    const filteredNotes = notes.filter(
        (n) =>
            n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openCreateModal = () => {
        setEditingNote(null);
        setNewTitle('');
        setNewBody('');
        setShowModal(true);
    };

    const openEditModal = (note: Note) => {
        setEditingNote(note);
        setNewTitle(note.title);
        setNewBody(note.body);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!newTitle.trim() || !user) return;
        setSaving(true);
        try {
            if (editingNote) {
                await updateNote(editingNote.id, { title: newTitle, body: newBody });
                setNotes(notes.map((n) => (n.id === editingNote.id ? { ...n, title: newTitle, body: newBody } : n)));
            } else {
                const docRef = await createNote(user.uid, newTitle, newBody);
                const newNoteObj: Note = {
                    id: docRef.id,
                    userId: user.uid,
                    title: newTitle,
                    body: newBody,
                    createdAt: new Date(),
                    color: ['#fce4ec', '#f3e5f5', '#e8f5e9', '#fff3e0', '#e3f2fd'][Math.floor(Math.random() * 5)],
                };
                setNotes([newNoteObj, ...notes]);
            }
            setShowModal(false);
        } catch (error) {
            console.error('Error saving note:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (id: string) => {
        setNoteToDelete(id);
    };

    const confirmDelete = async () => {
        if (noteToDelete) {
            try {
                await deleteNote(noteToDelete);
                setNotes(notes.filter((n) => n.id !== noteToDelete));
                setNoteToDelete(null);
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };

    return (
        <div className="animate-fade-in relative">
            {/* Header */}
            <div className="px-5 pt-6 pb-4">
                <h1 className="font-display text-xl font-bold">Catatanku</h1>
                <p className="text-muted text-xs mt-1">{notes.length} catatan</p>
            </div>

            {/* Search */}
            <div className="px-5 mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cari catatan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-field pl-10 text-sm"
                    />
                </div>
            </div>

            {/* Notes Grid */}
            <div className="px-5 mb-5">
                {loading ? (
                    <div className="flex flex-col gap-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-3 stagger-children">
                            {filteredNotes.map((note) => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    onEdit={openEditModal}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        {filteredNotes.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-4xl mb-3">📝</p>
                                <p className="text-muted text-sm">Tidak ada catatan ditemukan</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* FAB */}
            <button
                onClick={openCreateModal}
                className="fixed bottom-24 right-1/2 translate-x-[calc(215px-3rem)] w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 z-40"
            >
                <Plus size={24} />
            </button>

            {/* Note Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
                    <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 animate-slide-up">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-display font-bold text-lg">
                                {editingNote ? 'Edit Catatan' : 'Catatan Baru'}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-muted font-semibold block mb-1.5">Judul</label>
                                <input
                                    type="text"
                                    placeholder="Judul catatan..."
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-muted font-semibold block mb-1.5">Isi</label>
                                <textarea
                                    placeholder="Tulis catatan Anda..."
                                    value={newBody}
                                    onChange={(e) => setNewBody(e.target.value)}
                                    rows={5}
                                    className="input-field resize-none"
                                />
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                                {editingNote ? 'Perbarui Catatan' : 'Buat Catatan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {noteToDelete && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
                    <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 animate-slide-up shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-display font-bold text-lg text-danger">Hapus Catatan?</h2>
                            <button
                                onClick={() => setNoteToDelete(null)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <p className="text-sm text-foreground mb-6">
                            Apakah Anda yakin ingin menghapus catatan ini? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setNoteToDelete(null)}
                                className="flex-1 py-3 font-semibold text-sm rounded-xl bg-gray-100/80 text-foreground hover:bg-gray-200 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-3 font-semibold text-sm rounded-xl bg-danger/10 text-danger hover:bg-danger/20 transition-colors"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
