import { useState } from 'react';
import '../styles/login.css';
import '../styles/loading.css'

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleCorreoChange = (event) => {
    setCorreo(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setLoading(false)
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
        setLoading(false);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Correo o contraseña incorrectos');
          }
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
        setError(''); 
      })
      .catch(error => {
        setError(error.message);
        setLoading(false)
        console.error(error); 
      });     
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className='containter'>
      <div className="form-container">
        <p className="title">Iniciar Sesión</p>
        {error && <p className="error-message">Error: {error}</p>}
        <form className="form" onSubmit={handleSubmit}>
          <input type="email" className="input" placeholder="Email" value={correo} onChange={handleCorreoChange} required disabled={loading}/>
          <input type="password" className="input" placeholder="Contraseña" value={password} onChange={handlePasswordChange} required disabled={loading}/>
          <p className="page-link">
            <span className="page-link-label">Olvido su contraseña?</span>
          </p>
          <button className="form-btn" disabled={loading}>{loading ? 'Cargando...' : 'Iniciar Sesión'}</button>
        </form>
        <p className="sign-up-label">
          No tienes cuenta?<span className="sign-up-link">Registrarme</span>
        </p>
      </div>
      </div>
      {loading && (
        <div className="spinner center">
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
        </div>
      )}{/*Reemplazar por la redireccion cuando termine los otros componentes*/}
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
