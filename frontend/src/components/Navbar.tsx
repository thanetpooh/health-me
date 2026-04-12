import { useNavigate } from 'react-router-dom';
import api from '../lib/axiosInstance';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const token = localStorage.getItem('token');
  let userName = '';

  const navigate = useNavigate();

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      userName = decoded.sub || decoded.name;
    } catch (e) {
      console.error('Token decode error', e);
    }
  }

  const handleLogout = async () => {
    try {
      await api.post('auth/logout', {});
    } catch (err) {
      console.error('Logout error', err);
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };
  return (
    <>
      <div className="max-lg:collapse bg-base-200  shadow-sm w-full rounded-md">
        <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
        <label htmlFor="navbar-1-toggle" className="fixed inset-0 hidden max-lg:peer-checked:block"></label>
        <div className="collapse-title navbar">
          <div className="navbar-start">
            <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <div className="navbar-start">
              <button className="btn btn-ghost text-xl">Healthme</button>
            </div>
          </div>

          <div className="navbar-end flex gap-4">
            {token ? (
              <>
                <span className="text-sm font-medium">{userName}</span>
                <a onClick={handleLogout} className="btn">
                  ออกจากระบบ
                </a>
              </>
            ) : (
              <a href="/login" className="btn btn-primary">
                เข้าสู่ระบบ
              </a>
            )}
          </div>
        </div>

        <div className="collapse-content lg:hidden z-1">
          <ul className="menu">
            <li>
              <button>Item 1</button>
            </li>
            <li>
              <button>Parent</button>
              <ul>
                <li>
                  <button>Submenu 1</button>
                </li>
                <li>
                  <button>Submenu 2</button>
                </li>
              </ul>
            </li>
            <li>
              <button>Item 3</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
