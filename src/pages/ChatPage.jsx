import React, { useState } from 'react';
import { ChatList } from '../components/ChatList';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/ui/button';
import { useChatStore } from '../store/chatStore';
import { cn } from '../lib/utils';

export const ChatPage = () => {
  const { clearMessages, chats, currentChatId, loadChat, deleteChat, messages } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const hasMessages = messages.length > 0;
  const handleNewChat = () => {
    clearMessages();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get sorted chats (most recent first)
  const sortedChats = [...chats].sort((a, b) => b.updatedAt - a.updatedAt);

  // Home menu items
  const homeMenuItems = [
    { icon: '💰', label: 'Finance', id: 'finance' },
    { icon: '✈️', label: 'Travel', id: 'travel' },
    { icon: '🎓', label: 'Academic', id: 'academic' },
    { icon: '⚽', label: 'Sports', id: 'sports' },
  ];

  // Discover menu items
  const discoverMenuItems = [
    { icon: '👤', label: 'For You', id: 'for-you' },
    { icon: '⭐', label: 'Top', id: 'top' },
    { icon: '🔬', label: 'Tech & Science', id: 'tech' },
    { icon: '💵', label: 'Finance', id: 'finance' },
    { icon: '🎨', label: 'Arts & Culture', id: 'arts' },
    { icon: '⚽', label: 'Sports', id: 'sports' },
    { icon: '🎬', label: 'Entertainment', id: 'entertainment' },
  ];

  // Spaces menu items
  const spacesMenuItems = [
    { icon: '👋', label: 'Welcome', id: 'welcome' },
    { icon: '+', label: 'Create a Space', id: 'create' },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile Hamburger Button */}
      <div className="absolute top-4 left-4 z-50 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 hover:bg-gray-200/50"
          onClick={toggleSidebar}
        >
          <svg
            className={`h-6 w-6 transform transition-transform ${isSidebarOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-[72px] flex flex-col items-center bg-[#f8f8f6] 
          border-r border-gray-200 py-6 transform transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Spaces Dropdown Menu */}
        {hoveredMenu === 'spaces' && (
          <div
            className="absolute left-[calc(100%-7px)] top-0 w-64 h-screen bg-[#f8f8f6] rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-left-2 duration-200"
            onMouseEnter={() => setHoveredMenu('spaces')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-900">Spaces</h3>
              <button className="p-1.5 hover:bg-gray-100 rounded">
                <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            <div className="px-2 py-2">
              {spacesMenuItems.map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Home Dropdown Menu - Closer to button */}
        {hoveredMenu === 'home' && (
          <div
            className="absolute left-[calc(100%-7px)] top-0 w-64 h-screen bg-[#f8f8f6] rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-left-2 duration-200"
            onMouseEnter={() => setHoveredMenu('home')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <div className="px-4 py-2.5 border-b border-gray-100">
              <h3 className="font-semibold text-sm text-gray-900">Home</h3>
            </div>

            {/* Library Section with Chat History */}
            <div className="px-2 py-2 max-h-[400px] overflow-y-auto">
              <div className="flex items-center justify-between px-3 py-2 text-xs text-gray-500">
                <span className="font-medium">Library</span>
                <button
                  className="hover:text-gray-700 p-1 hover:bg-gray-100 rounded"
                  onClick={handleNewChat}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Saved Chats History */}
              <div className="space-y-0.5 mb-2">
                {sortedChats.length > 0 ? (
                  sortedChats.map((chat) => (
                    <div
                      key={chat.id}
                      className="group/item relative"
                    >
                      <button
                        className={cn(
                          "w-full px-3 py-2.5 text-left text-sm rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between gap-2",
                          currentChatId === chat.id && "bg-gray-100 font-medium"
                        )}
                        onClick={() => {
                          loadChat(chat.id);
                          setHoveredMenu(null);
                        }}
                      >
                        <span className="truncate text-gray-700 flex-1">
                          {chat.title}
                        </span>
                        <button
                          className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this chat?')) {
                              deleteChat(chat.id);
                            }
                          }}
                        >
                          <svg className="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-3 text-xs text-gray-400 text-center">
                    No saved chats yet
                  </div>
                )}
              </div>
            </div>

            {/* Topics */}
            <div className="border-t border-gray-100 mt-2 pt-2 px-2">
              {homeMenuItems.map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Discover Dropdown Menu */}
        {hoveredMenu === 'discover' && (
          <div
            className="absolute left-[calc(100%-7px)] top-0 w-64 h-screen bg-[#f8f8f6] rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-left-2 duration-200"
            onMouseEnter={() => setHoveredMenu('discover')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-900">Discover</h3>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-2 py-2 max-h-[400px] overflow-y-auto">
              <div className="px-3 py-1.5 text-xs text-gray-500 font-medium">Topics</div>
              {discoverMenuItems.map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Top Section */}
        <div className="flex flex-col items-center gap-12">
          {/* Logo */}
          <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-gray-200/50 max-lg:mt-12">
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M101.008 42L190.99 124.905V124.886V42.1913H208.506V125.276L298.891 42V136.524H336V272.866H299.005V357.035L208.506 277.525V357.948H190.99V278.836L101.11 358V272.866H64V136.524H101.008V42ZM177.785 153.826H81.5159V255.564H101.088V223.472L177.785 153.826ZM118.625 231.149V319.392L190.99 255.655V165.421L118.625 231.149ZM209.01 254.812V165.336L281.396 231.068V272.866H281.489V318.491L209.01 254.812ZM299.005 255.564H318.484V153.826H222.932L299.005 222.751V255.564ZM281.375 136.524V81.7983L221.977 136.524H281.375ZM177.921 136.524H118.524V81.7983L177.921 136.524Z" fill="black" />
            </svg>
          </Button>

          {/* New Chat Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 bg-[#eeebeb] hover:bg-[#dcd9d9] rounded-full text-gray-600"
            onClick={handleNewChat}
            title="New chat"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
          </Button>
        </div>

        {/* Middle Section */}
        <div className="flex flex-1 flex-col items-center justify-center gap-10">
          {/* Home Button with Hover Menu */}
          <div
            className="relative group"
            onMouseEnter={() => setHoveredMenu('home')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-14 w-14 flex flex-col gap-1 hover:bg-gray-200/50 text-gray-700 rounded-xl"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-[10px]">Home</span>
            </Button>
          </div>

          {/* Discover Button with Hover Menu */}
          <div
            className="relative group"
            onMouseEnter={() => setHoveredMenu('discover')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-14 w-14 flex flex-col gap-1 hover:bg-gray-200/50 text-gray-700 rounded-xl"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="text-[10px]">Discover</span>
            </Button>
          </div>

          {/* Spaces Button with Hover Menu */}
          <div
            className="relative group"
            onMouseEnter={() => setHoveredMenu('spaces')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-14 w-14 flex flex-col gap-1 hover:bg-gray-200/50 text-gray-700 rounded-xl"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-[10px]">Spaces</span>
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-gray-200/50 text-gray-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </Button>

          {/* Account/Sign In */}
          <Button variant="ghost" size="icon" className="h-10 w-10 flex flex-col gap-0.5 hover:bg-gray-200/50 text-teal-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[9px]">Sign In</span>
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className={cn(
        "flex flex-1 flex-col bg-white h-screen",
        !hasMessages && "items-center justify-center"
      )}>
        <ChatList />
        <InputBox />
      </div>
    </div>
  );
};
