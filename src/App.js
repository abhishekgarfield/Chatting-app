import React, { useEffect, useRef, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";

const filters = { type: "messaging" };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const App = () => {
  const [client, setClient] = useState(null);
  const[channel,setchannel]=useState(null);
  const modecheck=useRef(window.matchMedia("(prefers-color-scheme:dark)").matches);
  console.log(modecheck.current)

  useEffect(() => {
    const newClient = new StreamChat("46gb46cpf2hp");
    const newClient2 = new StreamChat("46gb46cpf2hp");

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log("connection lost");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);
    newClient2.on("connection.changed", handleConnectionChange);
   
    newClient.connectUser(
      {
        id: "dave-matthews",
        name: "Dave Matthews",
      },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGF2ZS1tYXR0aGV3cyJ9.qv9QD7YIW_nWlSPBn7kQRBG01zVUqeUQeC6-ZWGX5PM"
    );
    newClient2.connectUser(
      {
        id: "garfield",
        name: "garfield",
      },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ2FyZmllbGQifQ.D7JPV4jczTPBoWnKdJ5qZyjRqppTSEufevhUcuC8e_M"
    );
    const channel = newClient2.channel('messaging', {
      name:"demo",
      members: ['dave-matthews','garfield'],
  })
    setchannel(channel);

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, []);

  if (!client) return null;

  return (
    <Chat client={client} darkMode={modecheck.current}>
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel channel={channel}  >
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;
