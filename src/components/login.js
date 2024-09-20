import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null); 
  const [validated, setValidated] = useState(false);
  const handleCorreoChange = (event) => {
    setCorreo(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }else{
      const data = {
        email_usuario: correo, 
        password_usuario: password 
      };
      fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la autenticación');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
      })
    }
    setValidated(true);
  };
  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" value={correo} onChange={handleCorreoChange} required/>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" value={password} onChange={handlePasswordChange} required />
          </Form.Group>
        </Row>
        <Button type="submit">Iniciar sesion</Button>
      </Form>
        {userData && (
          <div className="container mt-4">
            <h5>Datos del usuario:</h5>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
    </div>
    );
}
export default Login;
