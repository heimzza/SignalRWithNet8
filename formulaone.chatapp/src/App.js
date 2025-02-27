import {Col, Row, Container} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingRoom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function App() {
  const[conn, setConnection] = useState();

  const joinChatRoom = async (username, chatroom) => {
    try {
      
      const conn = new HubConnectionBuilder()
        .withUrl('http://localhost:5125')
        .configureLogging(LogLevel.Information)
        .build();

        conn.on("JoinSpecificChatRoom", (username, msg) => {
          console.log(`${username} says ${msg}`);
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
          <Row class='px-5 my-5'>
            <Col sm='12'>
              <h1 className='font-weight-light'>Formula One Chat App</h1>
            </Col>
          </Row>
          <WaitingRoom joinChatRoom={joinChatRoom}>
            
          </WaitingRoom>
        </Container>
      </main>
    </div>
  );
}

export default App;
