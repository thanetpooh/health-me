import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type LoginForm = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">เข้าสู่ระบบ</legend>

        <label className="label">ชื่อผู้ใช้</label>
        <input
          type="username"
          className="input"
          placeholder="ชื่อผู้ใช้"
          {...register('username', {
            required: 'กรุณากรอกชื่อผู้ใช้',
            maxLength: 150,
          })}
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

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

        <button type="submit" className="btn btn-neutral mt-4">
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
