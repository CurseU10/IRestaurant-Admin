import { Container, Row, Col } from 'react-bootstrap'
import '../../Pages/login.css'

const FormContainer = ({ children }) => {
  return (
    <Container className="login-container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer