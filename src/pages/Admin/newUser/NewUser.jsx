import './newUser.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export default function NewUser() {
  return (

      <div className="topContainer">
      <div className="formUser">
      <div className="containerForm">
        <div className="title">New User</div>
        <div className="content">
          <div className="user-details">
      <Container>
        <Row>

          <Col>
            <div className="input-box">
            <span className="details">Full Name</span>
            <input type="text" placeholder="Enter your name"/>
          </div>
          </Col>

          <Col><div className="input-box">
            <span className="details">Username</span>
            <input type="text" placeholder="Enter your username"/>
          </div>
          </Col>

          <Col>
            <div className="input-box">
              <span className="details">Email</span>
              <input type="text" placeholder="Enter your email"/>
            </div>
          </Col>

          <Col>
            <div className="input-box">
              <span className="details">Gender</span>

              <select name="gender" id="gender">
                <option value="volvo">Male</option>
                <option value="saab">Female</option>
              </select>
            </div>
          </Col>

        </Row>

        <Row>

          <Col>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input type="text" placeholder="Enter your number"/>
            </div>
          </Col>

          <Col>
            <div className="input-box">
              <span className="details">Password</span>
              <input type="text" placeholder="Enter your password"/>
            </div>
          </Col>

          <Col>
            <div className="input-box">
              <span className="details">Confirm Password</span>
              <input type="text" placeholder="Confirm your password"/>
            </div>
          </Col>

          <Col>
            <div className="input-box">
              <span className="details">Account Status</span>

              <select name="status" id="status">
                <option value="volvo">Active</option>
                <option value="saab">Inactive</option>
              </select>
            </div>
          </Col>

        </Row>
      </Container>
          </div>
            <div className="button">
              <input type="submit" value="Add New User"/>
            </div>
        </div>
        </div>
      </div>
      </div>
    );
}

