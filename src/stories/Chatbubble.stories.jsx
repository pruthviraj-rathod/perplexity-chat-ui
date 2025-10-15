import { ChatBubble } from '../ChatBubble';

export default {
  title: 'Components/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const UserMessage = {
  args: {
    message: {
      id: '1',
      role: 'user',
      content: 'What is the capital of France?',
      timestamp: Date.now(),
    },
  },
};

export const AssistantMessage = {
  args: {
    message: {
      id: '2',
      role: 'assistant',
      content: 'The capital of France is Paris. Paris is not only the capital but also the most populous city in France, known for its art, fashion, gastronomy, and culture. It is home to iconic landmarks such as the Eiffel Tower, the Louvre Museum, and Notre-Dame Cathedral.',
      timestamp: Date.now(),
    },
  },
};

export const LongUserMessage = {
  args: {
    message: {
      id: '3',
      role: 'user',
      content: 'Can you explain the difference between machine learning, deep learning, and artificial intelligence? I am trying to understand these concepts for my computer science class and I want to make sure I understand the hierarchy and relationships between these terms.',
      timestamp: Date.now(),
    },
  },
};

export const LongAssistantMessage = {
  args: {
    message: {
      id: '4',
      role: 'assistant',
      content: `Artificial Intelligence (AI) is the broadest concept - it refers to any technique that enables computers to mimic human intelligence. This includes everything from basic rule-based systems to advanced learning algorithms.

Machine Learning (ML) is a subset of AI. It focuses on algorithms that can learn from and make predictions based on data, without being explicitly programmed for every scenario.

Deep Learning is a subset of Machine Learning that uses neural networks with multiple layers (hence "deep") to progressively extract higher-level features from raw input. It's particularly powerful for tasks like image recognition and natural language processing.

So the hierarchy is: AI > ML > Deep Learning, where each level is more specialized than the previous one.`,
      timestamp: Date.now(),
    },
  },
};