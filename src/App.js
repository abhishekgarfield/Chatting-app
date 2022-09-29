import React, { useEffect, useRef, useState } from "react";
import Auth from "./Components/auth";
import MessagingContainer from "./Components/messagingcontainer";
import { StreamChat } from "stream-chat";
import { Chat, Channel } from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
import { Cookies, useCookies } from "react-cookie";
const client =new StreamChat('46gb46cpf2hp')

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [channel, setChannel] = useState(null)
    const [users, setUsers] = useState(null)

    const authToken = cookies.authToken

    console.log(authToken)

    useEffect( () => {
        if (authToken) {
            const { users} =  client.queryUsers({ role: 'user'})
            setUsers(users)
        }
    }, [])

    const setupClient = async () => {
        try {
             const response =await client.connectUser(
                {
                    id: cookies.user_id,
                    name: cookies.Name,
                    hashedPassword: cookies.hashedPassword,
                },
                authToken
            )
            if(response){
            const channel = client.channel('messaging', 'gaming-demo', {
                name: 'gaming-demo',
            })
            setChannel(channel)
          }
        } catch (err) {
            console.log(err)
        }
    }

    if (authToken){ setupClient()}

  return (
    <>
      {!authToken && <Auth />}
      {authToken && (
        <Chat client={client} darkMode={true}>
          <Channel channel={channel}>
            <MessagingContainer />
          </Channel>
        </Chat>
      )}
    </>
  );
};

export default App;
