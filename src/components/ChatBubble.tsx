import { ChatMessage } from '@/lib/mock-data';
import { format } from 'date-fns';

interface ChatBubbleProps {
    message: ChatMessage;
    isCurrentUser: boolean;
}

export default function ChatBubble({ message, isCurrentUser }: ChatBubbleProps) {
    return (
        <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-3 animate-fade-in`}>
            <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                <div className={isCurrentUser ? 'chat-bubble-sent' : 'chat-bubble-received'}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                <span className={`text-[10px] mt-1 px-1 ${isCurrentUser ? 'text-muted/50' : 'text-muted/50'}`}>
                    {format(message.timestamp, 'HH:mm')}
                </span>
            </div>
        </div>
    );
}
