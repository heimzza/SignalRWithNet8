import {Col, Row, Container} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingRoom';

function App() {
  return (
    <div>
      <main>
        <Container>
          <Row class='px-5 my-5'>
            <Col sm='12'>
              <h1 className='font-weight-light'>Formula One Chat App</h1>
            </Col>
          </Row>
          <WaitingRoom>
            
          </WaitingRoom>
        </Container>
      </main>
    </div>
  );
}

export default App;
