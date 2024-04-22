import {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCredentials} from "../../redux/features/auth/authSlice";
import {useLoginMutation} from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader";
import {message} from "antd";
import letterM from '../../assets/f295b460-3ccb-411c-85e1-3cfa50c5b1b7.webp'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();

  const {userInfo} = useSelector((state: any) => state.auth);

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/admin";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate(redirect);
    } catch (err) {
      message.error((err as any)?.data?.message || (err as any).error);
    }
  };
  return (
    <>
      <div className='sticky top-0 p-5 bg-primary flex justify-between'>
        <Link to="/" className='text-white text-3xl font-semibold cursor-pointer'>{`${'<MendritMorina/>'}`}</Link>
      </div>
      <div className="flex">
        <div className="lg:w-1/2 sm:hidden">
          <img
              src={letterM}
              alt="Description of the image"
          />
        </div>
        <div className='lg:w-1/2 sm:w-full'>
          <h1 className="text-2xl font-semibold mb-4 text-center pt-9">Log In</h1>
          <form onSubmit={submitHandler} className='flex justify-center items-center flex-col gap-2'>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-1/2 border-l-primary border-l-8"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-1/2 border-l-primary border-l-8"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={isLoading}
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded cursor-pointer my-2"
            >
              {isLoading ? "Signing In ..." : "Sign In"}
            </button>
            {isLoading && <Loader/>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

