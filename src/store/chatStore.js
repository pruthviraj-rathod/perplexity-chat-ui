import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useChatStore = create(
  persist(
    (set, get) => ({
      // Current chat state
      messages: [],
      isLoading: false,
      currentChatId: null,
      
      // All saved chats (history)
      chats: [],
      
      // Add a message to the current chat
      addMessage: (role, content) => {
        const state = get();
        const newMessage = {
          id: `${Date.now()}-${Math.random()}`,
          role,
          content,
          timestamp: Date.now(),
        };
        
        const updatedMessages = [...state.messages, newMessage];
        
        set({ messages: updatedMessages });
        
        // Auto-save/update current chat
        if (updatedMessages.length > 0) {
          const chatId = state.currentChatId || `chat-${Date.now()}`;
          const firstUserMessage = updatedMessages.find(m => m.role === 'user');
          const chatTitle = firstUserMessage?.content.slice(0, 50) || 'New Chat';
          
          const existingChatIndex = state.chats.findIndex(c => c.id === chatId);
          
          const chatData = {
            id: chatId,
            title: chatTitle,
            messages: updatedMessages,
            createdAt: existingChatIndex >= 0 ? state.chats[existingChatIndex].createdAt : Date.now(),
            updatedAt: Date.now(),
          };
          
          if (existingChatIndex >= 0) {
            // Update existing chat
            const updatedChats = [...state.chats];
            updatedChats[existingChatIndex] = chatData;
            set({ 
              chats: updatedChats,
              currentChatId: chatId 
            });
          } else {
            // Add new chat to beginning of array
            set({ 
              chats: [chatData, ...state.chats],
              currentChatId: chatId 
            });
          }
        }
      },
      
      // Set loading state
      setLoading: (isLoading) => set({ isLoading }),
      
      // Start a new chat (doesn't delete current one)
      clearMessages: () => {
        set({ 
          messages: [], 
          isLoading: false,
          currentChatId: null,
        });
      },
      
      // Load a specific chat from history
      loadChat: (chatId) => {
        const state = get();
        const chat = state.chats.find(c => c.id === chatId);
        
        if (chat) {
          set({
            messages: chat.messages,
            currentChatId: chatId,
            isLoading: false,
          });
        }
      },
      
      // Delete a chat from history
      deleteChat: (chatId) => {
        const state = get();
        set({
          chats: state.chats.filter(chat => chat.id !== chatId),
          // If deleting current chat, clear it
          ...(state.currentChatId === chatId ? { 
            messages: [], 
            currentChatId: null 
          } : {}),
        });
      },
      
      // Rename a chat
      renameChat: (chatId, newTitle) => {
        set((state) => ({
          chats: state.chats.map(chat =>
            chat.id === chatId
              ? { ...chat, title: newTitle, updatedAt: Date.now() }
              : chat
          ),
        }));
      },
      
      // Get all chats sorted by updated date (most recent first)
      getSortedChats: () => {
        const state = get();
        return [...state.chats].sort((a, b) => b.updatedAt - a.updatedAt);
      },
      
      // Search chats
      searchChats: (query) => {
        const state = get();
        if (!query) return state.chats;
        
        const lowerQuery = query.toLowerCase();
        return state.chats.filter(chat =>
          chat.title.toLowerCase().includes(lowerQuery) ||
          chat.messages.some(msg => msg.content.toLowerCase().includes(lowerQuery))
        );
      },
      
      // Clear all chat history
      clearAllChats: () => {
        set({
          chats: [],
          messages: [],
          currentChatId: null,
          isLoading: false,
        });
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        chats: state.chats,
        currentChatId: state.currentChatId,
        messages: state.messages,
      }),
    }
  )
);
