import "./EditProduct.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function EditProduct() {
  return (
  <div className="newProduct">

    <form className="addProductForm">
  <div className="topContainer">
    <div className="formUser">
      <div className="containerForm">
        <div className="title">Edit ProductDetail</div>
        <div className="content">
          <div className="user-details">
            <Container>
              <Row>

                <Col>
                  <div className="addProductItem">
                    <label>Image</label>
                    <input type="file" id="file" />
                  </div>
                </Col>

                <Col>
                  <div className="addProductItem">
                    <label>Name</label>
                    <input type="text" placeholder="Clothes Name" />
                  </div>
                </Col>

                <Col>
                  <div className="addProductItem">
                    <label>Stock</label>
                    <input type="text" placeholder="123" />
                  </div>
                </Col>

                <Col>
                  <div className="addProductItem">
                    <label>Discount</label>
                    <input type="text" placeholder="0-100" />
                  </div>
                </Col>

              </Row>

              <Row>

                <Col>
                  <div className="addProductItem">
                    <label>ProductDetail Status</label>
                    <select name="active" id="active">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </Col>

                <Col>
                  <div className="addProductItem">
                    <label>Specification</label>
                    <input type="checkbox" id="topping" name="topping" value="S" />S
                    <input type="checkbox" id="topping" name="topping" value="M" />M
                    <input type="checkbox" id="topping" name="topping" value="L" />L
                    <input type="checkbox" id="topping" name="topping" value="XL" />XL
                    <input type="checkbox" id="topping" name="topping" value="XXL" />XXL
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="button">
            <input type="submit" value="Edit ProductDetail"/>
          </div>
        </div>
      </div>
    </div>
  </div>
    </form>
  </div>
  );
}
