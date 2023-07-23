import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import '../ComponentsCSS/Register.css'
import { NavLink } from 'react-router-dom';
import { Context } from '../Context/AuthContext';
import { Signup, Signin } from './Types_Interface/types'
import { RegisterFormInputs } from '../pages/Types_Interface/types'

const schema = yup.object().shape({
  name: yup.string().required("Usuário obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup.string().min(6, "Senha deve ter no mínimo 6 caracteres").required("Senha obrigatória"),
  passwordconf: yup.string().oneOf([yup.ref("password"), undefined], "Senhas devem ser iguais"),
});

const Register = () => {

  const { handleRegister, messagem } = useContext(Context);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: RegisterFormInputs, e: any) => {
    handleRegister(data);
    e.target.reset();
  }


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
            <input type="string" placeholder='Usuario' {...register('name')} />
            <span>{errors.name?.message}</span>
          </label>
          <label>
            <input type="email" placeholder='Seu melhor E-mail' {...register('email')} />
            <span>{errors.email?.message}</span>
          </label>
          <label>
            <input type="password" placeholder='Crie uma senha' {...register('password')} />
            <span>{errors.password?.message}</span>
          </label>
          <label>
            <input type="password" placeholder='Confirme sua senha' {...register('passwordconf')} />
            <span>{errors.passwordconf?.message}</span>
          </label>
          {messagem.message || messagem ? <p>{messagem.message}</p> : <p>{messagem}</p>}
          {messagem.error || messagem ? <p>{messagem.error}</p> : <p>{messagem}</p>}
            

          
          <button>Create</button>
        </form>
      </section>
    </div>
  )
}

export default Register
