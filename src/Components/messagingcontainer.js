import {
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { useCookies } from "react-cookie";

const MessagingContainer = () => {
  const [cookies, setCookie, removeCookie] = useCookies([`user`]);
  return (
    <div>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
        <div
          className="log"
          onClick={() => {
            removeCookie("Name", cookies.Name);
            removeCookie("authToken", cookies.authToken);
            removeCookie("hashedPassword", cookies.hashedPassword);
            removeCookie("user_id", cookies.user_id);
            removeCookie("url", cookies.url);
            window.location.reload();
          }}
        >
          Logout
        </div>
      </Window>
      <Thread />
    </div>
  );
};
export default MessagingContainer;
