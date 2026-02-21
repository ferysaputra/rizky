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
            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                    onClick={() => onEdit?.(note)}
                    className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-black/5 transition-colors"
                >
                    <Pencil size={20} />
                </button>
                <button
                    onClick={() => onDelete?.(note.id)}
                    className="p-1.5 rounded-lg text-danger/80 hover:text-danger hover:bg-danger/10 transition-colors"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            <h3 className="font-semibold text-sm pr-8">{note.title}</h3>
            <p className="text-muted text-xs mt-2 line-clamp-3 leading-relaxed">{note.body}</p>
            <p className="text-muted/60 text-[10px] mt-3 font-medium">
                {format(note.createdAt, 'MMM dd, yyyy')}
            </p>
        </div>
    );
}
