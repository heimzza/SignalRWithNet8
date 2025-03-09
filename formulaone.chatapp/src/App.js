import {Col, Row, Container} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingRoom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './components/chatRoom';

function App() {
  const[conn, setConnection] = useState();
  const[messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      
      const conn = new HubConnectionBuilder()
        .withUrl('http://localhost:5125/Chat')
        .configureLogging(LogLevel.Information)
        .build();

        conn.on("JoinSpecificChatRoom", (username, msg) => {
          console.log(`${username} joined. ${msg}`);
        });

        conn.on("ReceiveSpecificMessage", (username, msg) => {
          setMessages(messages => [...messages, {username, msg}]);
        });

        await conn.start();
        await conn.invoke("JoinSpecificChatRoom", {username, chatroom});

        setConnection(conn);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm='12'>
              <h1 className='font-weight-light'>Formula One Chat App</h1>
            </Col>
          </Row>
          { !conn 
            ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
            : <ChatRoom messages={messages}></ChatRoom>
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
