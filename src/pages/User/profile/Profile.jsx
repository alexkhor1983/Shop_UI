import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Card, Button} from '@themesberg/react-bootstrap';


export default function Profile() {
  return (
<div>
  <Card border="light" className="text-center p-0 mb-4">
    <div style={{ backgroundImage: `url("https://images-cdn.welcomesoftware.com/Zz0zZTliMjQ4MzhlNGExMWViYmJiMjFiZTI2ZWNmN2MzZA==")` }} className="profile-cover rounded-top" />
    <Card.Body className="pb-5">
      <Card.Img src="" alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
      <Card.Title>Neil Sims</Card.Title>
      <Card.Subtitle className="fw-normal">Senior Software Engineer</Card.Subtitle>
      <Card.Text className="text-gray mb-4">New York, USA</Card.Text>

      <Button variant="primary" size="sm" className="me-2">
        <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Connect
      </Button>
      <Button variant="secondary" size="sm">Send Message</Button>
    </Card.Body>
  </Card>
</div>
  );
}
