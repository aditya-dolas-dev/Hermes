import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white/5 backdrop-blur-xl">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-header mb-1.5">
              <time className="text-xs text-white/60 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div
              className={`chat-bubble flex flex-col p-3 rounded-2xl shadow-sm ${
                message.senderId === authUser._id
                  ? "bg-indigo-500/80 text-white"
                  : "bg-white/10 text-white/90"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-lg mb-2 border border-white/10"
                />
              )}
              {message.text && (
                <p className="leading-relaxed">{message.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
