'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect } from 'react';
import {
  ChatHeader,
  ChatEmptyState,
  ChatMessage,
  ChatLoadingIndicator,
  ChatErrorMessage,
  ChatInput,
} from '@/components/chat';

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, error } = useChat({
    onError: (error) => {
      console.error('[CHAT] Error:', error);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (message: string) => {
    sendMessage({ text: message });
  };

  return (
    <div className='flex h-[calc(100vh-90px)] flex-col overflow-hidden'>
      <ChatHeader />

      <div className='min-h-0 flex-1 overflow-y-auto py-6'>
        <div className='container max-w-3xl space-y-4'>
          {messages.length === 0 && <ChatEmptyState />}

          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {status === 'submitted' && <ChatLoadingIndicator />}

          {error && <ChatErrorMessage />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSubmit={handleSubmit} isLoading={status === 'submitted'} />
    </div>
  );
}
