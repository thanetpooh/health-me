import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/axiosInstance';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  consent: boolean;
};

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setServerError(null);
    try {
      const response = await api.post(
        'auth/register',
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );

      console.log('💁 Success:', response.data);
      alert('สมัครสมาชิกสำเร็จ!');
      navigate('/login');
    } catch (error: any) {
      console.error('👉 Error:', error);
      const msg = error.response?.data?.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">นโยบายความเป็นส่วนตัว</h3>
          <p className="py-4">
            เราจะเก็บข้อมูลชื่อผู้ใช้ และรหัสผ่าน เพื่อใช้ในการเข้าสู่ระบบ รวมถึงข้อมูลการใช้งาน เช่น เมนูที่คุณกดถูกใจ
            เพื่อปรับปรุงประสบการณ์การใช้งาน เราไม่มีการเก็บอีเมลหรือข้อมูลติดต่ออื่น ๆ
          </p>
          <div className="modal-action">
            <button className="btn" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">สมัครสมาชิก</legend>
        {serverError && <div className="alert alert-error mb-4 py-2 text-sm">{serverError}</div>}

        <label className="label">ชื่อที่แสดง</label>
        <input
          type="name"
          className="input"
          placeholder="ชื่อที่แสดง"
          {...register('name', {
            required: 'กรุณากรอกชื่อ',
            maxLength: 150,
          })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

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

        <label className="label">ยืนยันรหัสผ่าน</label>
        <input
          type="password"
          className="input"
          placeholder="ยืนยันรหัสผ่าน"
          {...register('passwordConfirm', {
            required: 'กรุณากรอกรหัสผ่านอีกครั้ง',
            maxLength: 100,
            validate: (value) => value === watch('password') || 'รหัสผ่านไม่ตรงกัน',
          })}
        />
        {errors.passwordConfirm && <p className="text-red-500 text-sm">{errors.passwordConfirm.message}</p>}

        <div className="mt-2 flex items-center">
          <label className="label cursor-pointer flex items-center">
            <input
              className="radio"
              type="checkbox"
              {...register('consent', {
                required: 'กรุณายอมรับนโยบายความเป็นส่วนตัว',
              })}
            />
            <span className="text-sm ml-2">ฉันยอมรับ</span>
          </label>

          <a className="cursor-pointer text-blue-500 underline ml-1" onClick={() => setIsOpen(true)}>
            นโยบายความเป็นส่วนตัว
          </a>
        </div>
        {errors.consent && <p className="text-red-500 text-sm">{errors.consent.message}</p>}

        <button type="submit" className="btn btn-neutral mt-4" disabled={loading}>
          สมัครสมาชิก
        </button>
      </form>
      <div>
        <p>
          มีสมาชิกอยู่แล้ว?{' '}
          <Link to="/login" className="text-blue-500 underline">
            เข้าสู่ระบบที่นี่
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
