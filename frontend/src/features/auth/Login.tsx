import { useState } from 'react';
import { useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const res = await api.post<LoginResponse>('auth/login', data, { withCredentials: true });

      const token = res.data.token;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setServerError(error.response?.data?.message || 'ผู้ใช้งานไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
      } else {
        setServerError('เกิดข้อผิดพลาดบางอย่าง');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onError: SubmitErrorHandler<LoginForm> = (errors) => {
    console.log('form error:', errors);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
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
          {isLoading ? 'กำลังโหลด...' : 'เข้าสู่ระบบ'}
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
