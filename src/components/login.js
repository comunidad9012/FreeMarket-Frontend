import { useState } from 'react';
import { Helmet } from 'react-helmet';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null); 

  const handleCorreoChange = (event) => {
    setCorreo(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
  };
  const showErrorMessage = (message) => {
    setErrorMessage(message);
  };
  const closeMessage = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/\S+@\S+\.\S+/.test(correo)) {
      showErrorMessage('Por favor, ingresa un correo válido.');
      return;
    }
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
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        showErrorMessage(data.error);
      } else {
        setUserData(data);
        showSuccessMessage('¡Inicio de sesión exitoso!');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showErrorMessage('Error al iniciar sesión: ' + error.message);
    });
  };
  return (
    <div>
      <Helmet>
        <title>Iniciar sesión</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <div className="container text-center col-md-8 mt-4 mb-4">
          <label htmlFor="correo"><h5>Correo</h5></label>
          <input type="email" className="form-control" id="correo" value={correo} onChange={handleCorreoChange} required />
        </div>
        <div className="container text-center col-md-8 mt-4 mb-4">
          <label htmlFor="password"><h5>Contraseña</h5></label>
          <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div className="container text-center mt-2">
          <button type="submit" className="btn btn-success">
            Iniciar sesión
          </button>
        </div>
        {successMessage && (
          <div className="alert alert-success">
            <span className="close-btn" onClick={closeMessage}>×</span>
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger">
            <span className="close-btn" onClick={closeMessage}>×</span>
            {errorMessage}
          </div>
        )}
        {userData && (
          <div className="container mt-4">
            <h5>Datos del usuario:</h5>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
}
export default Login;
