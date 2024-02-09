import React from "react";
import Title from "../../components/Title/Title";
import { Link , useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../../store/products";
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';

const Register = () => {
  const dispath = useDispatch()
  const navigate = useNavigate() 
  const [addUser] = useRegisterUserMutation()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async(data) => {
    try{
       const useData = await addUser(data)
       dispath(setUser(useData))
       navigate('/auth/login')
    }catch(e){
      console.log(e.massge);
    }
   
  }
  console.log(watch("email"));
  return (
    <div>
      <Title title="Регистрация" />
      <form  onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Ваш email</label>
        <br />
        <input {...register('email')} type="email" placeholder="Email" />
        <br />
        <label htmlFor="password">Ваш пароль</label>
        <br />
        <input {...register('password')} type="password" placeholder="Пароль" />
        <br />
        <label htmlFor="name">Ваше имя</label>
        <br />
        <input {...register('name')} type="text" placeholder="Имя" />
        <br />
        <button type="submit" className="login__btn btn">
          Зарегистрироваться
        </button>
        <p>Есть акканут?</p>
        <p>
          <Link to={"/auth/login"}> Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
