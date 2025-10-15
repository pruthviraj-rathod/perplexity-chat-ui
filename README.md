# Perplexity AI Clone - Complete Implementation Guide

## Overview
A fully-featured Perplexity AI chat interface clone built with React, shadcn/ui, Zustand, and Tailwind CSS. Features include chat history management, hover menus, responsive design, and a clean centered layout.

## ✨ Key Features

### 1. **Chat History Management**
- ✅ Auto-saves every conversation
- ✅ First message becomes chat title
- ✅ Load any previous chat from sidebar
- ✅ Delete chats with confirmation
- ✅ Persistent storage (survives page refresh)
- ✅ Sorted by most recent

### 2. **Sidebar Hover Menus**
- ✅ Home menu with chat library
- ✅ Discover menu with topics
- ✅ Spaces menu
- ✅ Smooth slide-in animations
- ✅ Large, easy-to-hover buttons
- ✅ Menus stay open on hover

### 3. **Perfect Centered Layout**
- ✅ Title and input centered together initially
- ✅ Separates after first message
- ✅ Professional spacing and transitions

### 4. **Responsive Design**
- ✅ Mobile-first approach
- ✅ Collapsible sidebar with overlay
- ✅ Touch-friendly interactions

## 🎯 Layout Behavior

### Empty State (No Messages)
```
┌─────────────────────────────────────┐
│                                     │
│           perplexity       ← Center │
│                                     │
│         [Input Box]        ← Center │
│      [Suggestion Chips]             │
│                                     │
└─────────────────────────────────────┘
```

### Active State (With Messages)
```
┌─────────────────────────────────────┐
│  👤 User: Hello                     │  ← Top
│  🤖 AI: Hi there!                   │
│  👤 User: How are you?              │
│  🤖 AI: I'm doing great!            │
├─────────────────────────────────────┤
│  [Input Box]                        │  ← Bottom
└─────────────────────────────────────┘
```

### Sidebar Hover Menus
```
┌──┐  →  ┌──┬────────────────┐
│🏠│  →  │🏠│ Home           │
│  │      │  │ Library    [+] │
│🌐│      │  │  • Chat 1      │
│  │      │  │  • Chat 2      │
│📦│      │  │ 💰 Finance     │
└──┘      └──┴────────────────┘
```

## 📦 Project Structure

```
perplexity-chat-ui/
├── src/
│   ├── components/
│   │   ├── ChatBubble.jsx       # Individual message display
│   │   ├── ChatList.jsx         # Message container with scroll
│   │   ├── InputBox.jsx         # Input with icons & suggestions
│   │   ├── Loader.jsx           # Loading animation
│   │   └── ui/
│   │       ├── button.jsx       # shadcn Button
│   │       ├── input.jsx        # shadcn Input
│   │       └── card.jsx         # shadcn Card
│   ├── pages/
│   │   └── ChatPage.jsx         # Main page with sidebar & menus
│   ├── store/
│   │   └── chatStore.js         # Zustand store (with history!)
│   ├── hooks/
│   │   └── useScrollToBottom.js # Auto-scroll functionality
│   └── lib/
│       └── utils.js             # Utility functions (cn, etc.)
├── public/
├── .gitignore                   # Git ignore file
├── package.json
├── tailwind.config.js
├── vite.config.js
└── eslint.config.js
```

## 🚀 Installation & Setup

### 1. Clone or Download
```bash
git clone <your-repo-url>
cd perplexity-chat-ui
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 📋 Required Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zustand": "^4.4.0",
    "tailwindcss": "^3.4.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "@radix-ui/react-slot": "^1.0.2"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2"
  }
}
```

## 🎨 Key Components

### ChatStore (Zustand)
```javascript
// Chat history management with persistence
{
  messages: [],           // Current chat messages
  chats: [],             // All saved chats
  currentChatId: null,   // Active chat ID
  addMessage(),          // Add & auto-save message
  clearMessages(),       // Start new chat (keeps history!)
  loadChat(),            // Load previous chat
  deleteChat(),          // Remove chat from history
}
```

### ChatPage
- Sidebar with hover menus
- Home, Discover, Spaces menus
- Chat history in Library
- Responsive mobile design

### ChatList
- Centered title when empty
- Scrollable message list
- Auto-scroll to bottom

### InputBox
- Centered with title initially
- Multiple action icons
- Suggestion chips
- Submit on Enter

## 🎯 Usage Examples

### Starting a New Chat
```javascript
// User types and sends message
1. Input appears centered with title
2. User types: "Hello"
3. Message sent → Auto-saved as "Hello"
4. Layout shifts to top/bottom
5. "Hello" appears in Home > Library
```

### Loading Previous Chat
```javascript
1. Hover over Home icon
2. See "Hello" in Library
3. Click "Hello"
4. Previous conversation loads
5. Continue chatting (auto-saves updates)
```

### Deleting Chat
```javascript
1. Hover over Home icon
2. Hover over chat in Library
3. Delete icon appears
4. Click delete → Confirmation
5. Chat removed from history
```

## 🎨 Styling & Design

### Color Palette
```css
/* Main Colors */
--background: #ffffff
--sidebar-bg: #f8f8f6
--border: #e5e7eb (gray-200)
--text-primary: #111827 (gray-900)
--text-secondary: #6b7280 (gray-500)
--accent: #14b8a6 (teal-500)
--accent-hover: #0d9488 (teal-600)
```

### Spacing System
- Button size: `h-14 w-14` (56px × 56px)
- Button gap: `gap-10` (40px between)
- Menu distance: `4px` from button
- Menu width: `w-64` (256px)

### Animations
- Menu slide-in: `200ms cubic-bezier(0.16, 1, 0.3, 1)`
- Fade-in: `200ms`
- All transitions smooth and polished

## ⚙️ Configuration Files

### tailwind.config.js
```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          500: '#14b8a6',
          600: '#0d9488',
        }
      },
      animation: {
        "in": "fade-in 200ms, slide-in-from-left 200ms",
      },
    },
  },
}
```

### eslint.config.js
```javascript
export default [
  { ignores: ['dist', 'storybook-static', 'src/stories/dist'] },
  {
    settings: { react: { version: '18.3' } },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
]
```

### .gitignore
```
node_modules/
dist/
.env
*.log
.DS_Store
```

## 🧪 Testing Checklist

- [ ] Empty state shows centered title and input
- [ ] First message auto-saves to history
- [ ] "New Chat" keeps previous chats
- [ ] Home hover shows all saved chats
- [ ] Click chat loads conversation
- [ ] Delete chat works with confirmation
- [ ] Current chat is highlighted
- [ ] Hover menus stay open
- [ ] Mobile sidebar works
- [ ] Chats persist on refresh

## 🐛 Common Issues & Solutions

### Chat history not saving?
**Problem**: Store not configured correctly
**Solution**: Use `chatStore-Fixed.js` - ensures `clearMessages()` doesn't delete history

### Hover menus disappear too fast?
**Problem**: Buttons too small, menu too far
**Solution**: Use `h-14 w-14` buttons with `left-[calc(100%+4px)]` positioning

### Layout not centered?
**Problem**: Parent container not configured
**Solution**: Parent needs `items-center justify-center` when `!hasMessages`

### Chats not loading?
**Problem**: `loadChat()` not called correctly
**Solution**: Ensure clicking chat calls `loadChat(chat.id)`

## 🚀 Advanced Features

### Add Search
```javascript
const filteredChats = useChatStore().searchChats('query')
```

### Export Chat
```javascript
const exportChat = (chatId) => {
  const chat = chats.find(c => c.id === chatId)
  const json = JSON.stringify(chat, null, 2)
  // Download JSON
}
```

### Rename Chat
```javascript
useChatStore.getState().renameChat(chatId, 'New Title')
```

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Edge | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Mobile | ✅ Full |

## 🎯 Performance Tips

1. **Virtualization**: Use `react-window` for 100+ messages
2. **Memoization**: Wrap `ChatBubble` with `React.memo`
3. **Debouncing**: Add search debouncing
4. **Lazy Loading**: Lazy load components with `React.lazy`

## 📝 Development Workflow

### Local Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint -- --fix # Auto-fix linting issues
```

### Making Changes
1. Edit components in `src/components/`
2. Update store in `src/store/chatStore.js`
3. Test in browser (hot reload enabled)
4. Run `npm run lint` before committing

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Zustand Guide](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 📄 License

MIT License - Free to use for personal and commercial projects.

## 🙏 Credits

- UI Design inspired by [Perplexity AI](https://www.perplexity.ai/)
- Components built with [shadcn/ui](https://ui.shadcn.com/)
- State management by [Zustand](https://github.com/pmndrs/zustand)

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review implementation files

---

**Built with ❤️ using React, Tailwind CSS, and Zustand**

**Star ⭐ this repo if you found it helpful!**