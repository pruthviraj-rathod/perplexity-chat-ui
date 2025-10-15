import { useEffect, useRef } from 'react';

export const useScrollToBottom = (dependencies) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, dependencies);

  return bottomRef;
};