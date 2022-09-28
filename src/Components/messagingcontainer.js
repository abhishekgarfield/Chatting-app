import {
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";

const MessagingContainer = () => {
  return (
    <div>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </div>
  );
};
export default MessagingContainer;
