import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const WaitingRoom = ({ room, user }) => {

    const [username, setUsername] = useState([]);
    const [chatroom, setChatRoom] = useState([]);

    return <Form onSubmit={ e => {
        e.preventDefault();
        joinChatRoom(username, chatroom);
    }}>
    
        <Row className="mb-3">
            <Col sm={12}>
            <Form.Group>
                <Form.Control placeholder="Enter your username" 
                    onChange={e => setUsername(e.target.value)} 
                />
                <Form.Control placeholder="Enter your chat room" 
                    onChange={e => setChatRoom(e.target.value)} 
                />
            </Form.Group>
            </Col>
            <Col sm={12}>
                <hr />
                <Button variant="success" type="submit">
                    Join Chat Room
                </Button>
            </Col> 
        </Row>
    </Form>
}

const joinChatRoom = (username, chatroom) => {
    console.log(username, chatroom);
}

export default WaitingRoom;