import React, { useEffect, useState } from "react";
import Auth from "./Components/auth";
import MessagingContainer from "./Components/messagingcontainer";
import { StreamChat } from "stream-chat";
import { Chat, Channel } from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
import { useCookies } from "react-cookie";
import { customStyles } from "./customstyles";

const App = () => {
  const chkmode = window.matchMedia("(prefers-color-scheme:dark)").matches;
  const [cookies, setCookie, removeCookie] = useCookies([`user`]);
  const [data, setData] = useState({});
  const authToken = cookies.authToken;
  useEffect(() => {
    if (authToken) {
      const tempobj = {};
      const chatClient = new StreamChat("46gb46cpf2hp");
      chatClient.connectUser(
        {
          id: cookies.user_id,
          name: cookies.Name,
          hashedPassword: cookies.hashedPassword,
          image: cookies.url,
        },
        authToken
      );
      tempobj.client = chatClient;

      const channel = chatClient.channel("messaging", "demos", {
        // add as many custom fields as you'd like
        name: "Gamers",
        members: [cookies.user_id],
      });
      tempobj.channel = channel;
      console.log(tempobj);
      setData(tempobj);
    }
  }, []);

  return (
    <>
      {!authToken && <Auth />}
      {authToken && data.client && (
        <Chat
          client={data?.client}
          customStyles={
            chkmode
              ? customStyles
              : {
                  "--sm-p": "0",
                  "--xs-p": "0",
                  "--border-radius-md": "0",
                  "--sm-p": "0",
                  "--primary-color": "green",
                  "--md-font": "1.2rem",
                  "--xs-m": "1.2rem",
                }
          }
        >
          <Channel channel={data?.channel}>
            <div className="image-container">
              <img
                className="image"
                src="https://media.giphy.com/media/y0NFayaBeiWEU/giphy.gif"
              />
            </div>
            <MessagingContainer />
          </Channel>
        </Chat>
      )}
    </>
  );
};

export default App;
