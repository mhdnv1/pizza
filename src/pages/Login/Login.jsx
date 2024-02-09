import React from 'react';
import Title from '../../components/Title/Title';
import { Link , useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../store/products';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';

const Login = () => {
    const dispath = useDispatch()
    const navigate = useNavigate()
    const [getUser ]=useLoginUserMutation()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    const onSubmit= async(data)=>{
        try{
            const useData = await getUser(data).unwrap()
            dispath(setUser(useData))
            navigate('/')
        }catch(err){
            console.error(err);
        }
    }
    return (
        <div>
            <Title title='Вход'/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Ваш email</label><br />
                <input {...register('email')} type="email" placeholder='Email' /><br />
                <label htmlFor="password">Ваш пароль</label><br />
                <input {...register('password')} type="password" placeholder='Пароль' /><br />
                <button type='submit' className='login__btn btn'>Вход</button>
                <p>Нет акканута?</p>
                <p><Link to={'/auth/register'}> Зарегистрироваться</Link></p>
            </form>
        </div>
    );
}

export default Login;
