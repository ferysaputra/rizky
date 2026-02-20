'use client';

import { Note } from '@/lib/mock-data';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

interface NoteCardProps {
    note: Note;
    onEdit?: (note: Note) => void;
    onDelete?: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div
            className="glass-card p-4 relative group transition-all duration-300 hover:shadow-md hover:shadow-primary/8 hover:-translate-y-0.5"
            style={{ borderLeft: `3px solid ${note.color}` }}
        >
            {/* Menu button */}
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="absolute top-3 right-3 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/5"
            >
                <MoreVertical size={16} className="text-muted" />
            </button>

            {/* Dropdown menu */}
            {showMenu && (
                <div className="absolute top-10 right-3 glass-card-strong shadow-lg z-10 py-1 min-w-[120px]">
                    <button
                        onClick={() => { onEdit?.(note); setShowMenu(false); }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-primary/5 w-full transition-colors"
                    >
                        <Pencil size={14} /> Edit
                    </button>
                    <button
                        onClick={() => { onDelete?.(note.id); setShowMenu(false); }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-danger hover:bg-danger/5 w-full transition-colors"
                    >
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
            )}

            <h3 className="font-semibold text-sm pr-8">{note.title}</h3>
            <p className="text-muted text-xs mt-2 line-clamp-3 leading-relaxed">{note.body}</p>
            <p className="text-muted/60 text-[10px] mt-3 font-medium">
                {format(note.createdAt, 'MMM dd, yyyy')}
            </p>
        </div>
    );
}
