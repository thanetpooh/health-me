import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import api from '../../lib/axiosInstance';

type LoginResponse = {
  token: string;
};

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const response = await api.post<LoginResponse>(
        'auth/login',
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );
      const accessToken = response.data.token;

      if (accessToken) {
        localStorage.setItem('token', accessToken);
        console.log('💁 Success: Token stored!');
        navigate('/');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'ผู้ใช้งานไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">เข้าสู่ระบบ</legend>
        {serverError && <div className="alert alert-error mb-4 py-2 text-sm">{serverError}</div>}

        <label className="label">อีเมล</label>
        <input
          type="email"
          className="input"
          placeholder="อีเมล"
          {...register('email', {
            required: 'กรุณากรอกอีเมล',
            maxLength: 150,
          })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <label className="label">รหัสผ่าน</label>
        <input
          type="password"
          className="input"
          placeholder="รหัสผ่าน"
          {...register('password', {
            required: 'กรุณากรอกรหัสผ่าน',
            maxLength: 100,
          })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" className="btn btn-neutral mt-4" disabled={isLoading}>
          เข้าสู่ระบบ
        </button>
      </form>
      <div>
        <p>
          ยังไม่มีบัญชี?{' '}
          <Link to="/register" className="text-blue-500 underline">
            สมัครสมาชิกที่นี่
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
