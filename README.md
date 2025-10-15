# Perplexity AI Clone - Implementation Guide

## Overview
This project is a Perplexity AI chat interface clone built with React, shadcn/ui, Zustand, and Tailwind CSS. The UI matches Perplexity's clean, centered design with proper state management and component structure.

## Key Changes Made

### 1. **ChatList Component**
- **Before**: Content always centered, no distinction between empty and active states
- **After**: 
  - Empty state: Content centered vertically with `pb-32` for spacing above input
  - Active state: Content flows from top with proper padding (`pt-8`)
  - Max width set to `max-w-3xl` to match Perplexity's layout

### 2. **InputBox Component**
- **Before**: Basic input with minimal styling
- **After**:
  - Centered layout when no messages (`max-w-2xl`)
  - Full-width layout with border-top when messages exist (`max-w-3xl`)
  - Added suggestion chips (Troubleshoot, Perplexity 101, etc.) visible only in empty state
  - Rounded-xl border with proper shadow effects
  - Proper icon spacing and hover states

### 3. **ChatBubble Component**
- User and AI messages with distinct avatars
- Action buttons for AI responses (Share, Export, Rewrite, etc.)
- Proper spacing and typography matching Perplexity
- Border between messages

### 4. **Loader Component**
- Animated bouncing dots for loading state
- Skeleton lines for content preview
- Consistent with Perplexity's loading UI

### 5. **ChatPage Component**
- Changed sidebar background from `#f3f3ee` to `#f8f8f6` for better match
- Changed main content background from `#7c3f3f` to `white`
- Mobile-responsive sidebar with overlay

## Layout Behavior

### Empty State (No Messages)
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│           perplexity               │  ← Centered vertically
│                                     │
│         [Input Box]                │  ← Centered with suggestions
│      [Suggestion Chips]            │
│                                     │
└─────────────────────────────────────┘
```

### Active State (With Messages)
```
┌─────────────────────────────────────┐
│  User Message                       │  ← Top of screen
│  AI Response                        │
│  User Message                       │
│  AI Response                        │
│  ...                                │
├─────────────────────────────────────┤
│  [Input Box]                        │  ← Bottom fixed
└─────────────────────────────────────┘
```

## Component Structure

```
src/
├── components/
│   ├── ChatBubble.jsx       # Individual message component
│   ├── ChatList.jsx         # Message container with scroll
│   ├── InputBox.jsx         # Input field with icons & suggestions
│   ├── Loader.jsx           # Loading animation
│   └── ui/
│       ├── button.jsx       # shadcn Button component
│       ├── input.jsx        # shadcn Input component
│       └── ...
├── pages/
│   └── ChatPage.jsx         # Main page layout
├── store/
│   └── chatStore.js         # Zustand store
├── hooks/
│   └── useScrollToBottom.js # Auto-scroll hook
└── lib/
    └── utils.js             # Utility functions (cn, etc.)
```

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Required Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "zustand": "^4.4.0",
    "tailwindcss": "^3.3.0",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  }
}
```

### 3. Tailwind Configuration
Ensure your `tailwind.config.js` includes:
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          500: '#14b8a6',
          600: '#0d9488',
        }
      }
    },
  },
  plugins: [],
}
```

### 4. Setup shadcn/ui
```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Add required components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
```

## Usage

### Replace Your Components
1. Copy the contents of each file to your corresponding component
2. Ensure the import paths match your project structure
3. Update any custom utility functions if needed

### File Replacements:
- `ChatList.jsx` → `src/components/ChatList.jsx`
- `InputBox.jsx` → `src/components/InputBox.jsx`
- `ChatBubble.jsx` → `src/components/ChatBubble.jsx`
- `Loader.jsx` → `src/components/Loader.jsx`
- `ChatPage.jsx` → `src/pages/ChatPage.jsx`

## Key Features

### 1. **Responsive Design**
- Mobile-first approach
- Sidebar collapses on mobile with overlay
- Input adjusts width based on screen size

### 2. **State Management (Zustand)**
```javascript
// Expected store structure
{
  messages: [],
  isLoading: false,
  addMessage: (role, content) => {},
  clearMessages: () => {},
  setLoading: (loading) => {}
}
```

### 3. **Dynamic Layout**
- Input and content positioning change based on message state
- Suggestion chips only show in empty state
- Auto-scroll to bottom when new messages arrive

### 4. **Styling Details**
- Rounded-xl input with shadow effects
- Hover states on all interactive elements
- Consistent spacing (gap-4 for major elements)
- Border-gray-100 for subtle dividers

## Testing Points

1. **Empty State**: Should show centered "perplexity" title and suggestion chips
2. **First Message**: Layout should shift from centered to top-aligned
3. **Multiple Messages**: Should scroll smoothly with messages at top
4. **Loading State**: Should show animated dots and skeleton
5. **Mobile**: Sidebar should collapse and show hamburger menu
6. **Input Icons**: All icons should have proper hover states
7. **Message Actions**: AI messages should show action buttons

## Color Palette

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

## Common Issues & Solutions

### Issue: Layout not centered initially
**Solution**: Ensure ChatList has `pb-32` and both components use correct max-width

### Issue: Input not staying at bottom
**Solution**: Parent container needs `flex-1 flex-col` with InputBox at the end

### Issue: Suggestion chips showing after messages
**Solution**: Check `hasMessages` condition in InputBox

### Issue: Icons not aligning properly
**Solution**: Use `shrink-0` on icon containers and consistent sizing (h-8 w-8)

## Next Steps

1. **Add Storybook** for component documentation
2. **Add Unit Tests** for components and store
3. **Setup ESLint/Prettier** for code quality
4. **Connect to Backend API** for real AI responses
5. **Add Message Persistence** (localStorage or backend)
6. **Implement Search** functionality
7. **Add Keyboard Shortcuts** (Cmd+K for focus, etc.)

## Performance Considerations

1. **Virtualization**: For long message lists, consider react-window
2. **Memoization**: Use React.memo for ChatBubble to prevent unnecessary re-renders
3. **Debouncing**: Add input debouncing if connecting to search API
4. **Image Optimization**: Lazy load images in messages if applicable

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## License

MIT License - Feel free to use this code for your projects.

## Credits

UI Design inspired by [Perplexity AI](https://www.perplexity.ai/)

---

**Questions or Issues?**
Review the implementation files and ensure all imports are correct for your project structure.