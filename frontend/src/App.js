import * as React from "react";
import { Col, Row, Card, CardHeader, CardBody } from "reactstrap";
import axios from "axios";
import EventTable from "./components/EventTable";
//Build a searchable, sortable, paginated (at 5 events per page) table that lists the event name,
//the event name, links to the specific visit indy event page, shows date and location. Also the
//events should be mapped using map markers onto a Google map using the Google maps API
//somewhere near the table and the map should update as the events change when searched or
//pages are switched.

function App() {
  // const url = "http://localhost:8080/api/events";
  // const [events, setEvents] = React.useState([]);
  // const getAllEvents = () => {
  //   axios.get(url).then((res) => {
  //     setEvents(res.data);
  //   });
  // };

  // React.useEffect(() => {
  //   getAllEvents();
  // }, []);

  // console.log(events);

  return (
    <Row className="align-items-center h-100">
      <Col className="col-6 mx-auto">
        <Card className="border-primary justify-content-center">
          <CardHeader>
            <h1>Events</h1>
          </CardHeader>
          <CardBody>
            <EventTable />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default App;
