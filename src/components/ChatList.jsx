import React from 'react';
import { ChatBubble } from './ChatBubble';
import { Loader } from './Loader';
import { useChatStore } from '../store/chatStore';
import { useScrollToBottom } from '../hooks/useScrollToBottom';

export const ChatList = () => {
  const { messages, isLoading } = useChatStore();
  const bottomRef = useScrollToBottom([messages, isLoading]);
  const hasMessages = messages.length > 0 || isLoading;

  return (
    <div className={`flex-1 overflow-y-auto bg-white ${!hasMessages ? 'flex items-center justify-center pb-4' : ''}`}>
      {!hasMessages ? (
        <div className="text-center px-4 mb-4">
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-gray-900">
            perplexity
          </h1>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-4 pt-8 pb-4">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          {isLoading && <Loader />}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};




// import React from 'react';
// import { ChatBubble } from './ChatBubble';
// import { Loader } from './Loader';
// import { useChatStore } from '../store/chatStore';
// import { useScrollToBottom } from '../hooks/useScrollToBottom';

// export const ChatList = () => {
//   const { messages, isLoading } = useChatStore();
//   const bottomRef = useScrollToBottom([messages, isLoading]);
//   const hasMessages = messages.length > 0 || isLoading;

//   return (
//     <div className={`flex-1 overflow-y-auto bg-white ${!hasMessages ? 'flex items-center justify-center pb-32' : ''}`}>
//       {!hasMessages ? (
//         <div className="text-center px-4">
//           <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-gray-900 mb-8">
//             perplexity
//           </h1>
//         </div>
//       ) : (
//         <div className="mx-auto max-w-3xl px-4 pt-8 pb-4">
//           {messages.map((message) => (
//             <ChatBubble key={message.id} message={message} />
//           ))}
//           {isLoading && <Loader />}
//           <div ref={bottomRef} />
//         </div>
//       )}
//     </div>
//   );
// };
