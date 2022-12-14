import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import AlertError from '../components/Utils/AlertError';
import { AuthContext } from '../context/AuthContext';


const LoginPage = () => {
  const {
    loginUser,
    error,
  } = useContext(AuthContext)

  return (
    <div className='container-sm'>
      <div className='m-4'>
        <form onSubmit={loginUser}>
          <h1 className='text-center'>Ingreso al Sistema</h1>
          {error && <AlertError error={'Usuario o contraseña incorrectos.'} />}
          <div className="form-floating mb-3">
              <input type="text" name='username' className="form-control" id="floatingInput" placeholder="Usuario" />
              <label >Usuario</label>
          </div>
          <div className="form-floating">
              <input type="password" name='password' className="form-control" id="floatingPassword" placeholder="Password" />
              <label>Contraseña</label>
          </div>
          <div className='text-center mt-3'>
              <button type="submmit" className="btn btn-primary">Ingresar</button>
          </div>
        </form>
      </div>

      <div className='text-center m-2'>
        <p>No tienes una cuenta?</p>
        <Link to={'/register/'}><button type="button" className="btn btn-outline-primary">Crear Cuenta</button></Link>
      </div>
    </div>
  
  )
    
}

export default LoginPage;