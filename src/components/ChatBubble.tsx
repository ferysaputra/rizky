import { ChatMessage } from '@/lib/firestore/chat';
import { format } from 'date-fns';

interface ChatBubbleProps {
    message: ChatMessage;
    isCurrentUser: boolean;
}

export default function ChatBubble({ message, isCurrentUser }: ChatBubbleProps) {
    return (
        <div className={`mb-3 animate-fade-in ${isCurrentUser ? 'text-right' : 'text-left'}`}>
            <div
                className={`inline-block max-w-[80%] text-left ${isCurrentUser ? 'chat-bubble-sent' : 'chat-bubble-received'}`}
            >
                <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
            <div className={`text-[10px] mt-1 px-1 text-muted/50`}>
                {format(message.timestamp, 'HH:mm')}
            </div>
        </div>
    );
}
