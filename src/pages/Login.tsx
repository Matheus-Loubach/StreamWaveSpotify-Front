import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../ComponentsCSS/Register.css';
import { NavLink } from 'react-router-dom';
import { Context } from '../Context/AuthContext';
import { Signup, Signin } from './Types_Interface/types'
import { LoginFormInputs } from '../pages/Types_Interface/types'

const schema = yup.object({
  name: yup.string().required('Campo Obrigatório'),
  password: yup.string().required('Campo Obrigatório'),
}).required();

const Login = () => {

  const { handleLogin,setIsSubmitting, isSubmitting, messagem } = useContext(Context);

  
  const {
    register,handleSubmit,formState: { errors },} = useForm<LoginFormInputs>({resolver: yupResolver(schema),});
    
  const onSubmit = (data: LoginFormInputs) => {
    handleLogin(data);
  };
  
  useEffect( () =>{
  
  },[errors])

  return (
    <div className='container_Register'>
      <section className='container_input'>
        <header>
          <h1>Stream Waver</h1>
          <NavLink {...Signin}>
            Sign in
          </NavLink>
          <NavLink {...Signup}>
            Sign up
          </NavLink>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <input type='text' placeholder='Usuario' {...register('name')} />
            <span>{errors.name?.message}</span>
          </label>
          <label>
            <input type='password' placeholder='Senha' {...register('password')} />
            <span>{errors.password?.message}</span>
          </label>
          <button type='submit' disabled={isSubmitting} >
          {isSubmitting ? 'Conectando...' : 'Login'}
          </button>
          {messagem?.msg && <p>{messagem.msg}</p>}
        </form>
      </section>
    </div>
  );
};

export default Login;
