import "./App.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

function App() {
  return (

    <div className="App">
      <AccessAlarmIcon />
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
