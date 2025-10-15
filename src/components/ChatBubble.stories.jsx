import ChatBubble from "./ChatBubble";

export default {
  title: "Components/ChatBubble",
  component: ChatBubble,
};

export const UserMessage = {
  args: { message: { role: "user", content: "Hello!" } },
};

export const AIMessage = {
  args: { message: { role: "ai", content: "Hi there!" } },
};
