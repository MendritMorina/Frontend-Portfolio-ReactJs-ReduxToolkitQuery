import AdminIntro from "./AdminIntro";
import {message, Tabs} from "antd";
import AdminAbout from "./AdminAbout";
import AdminExperience from "./AdminExperience";
import AdminProject from "./AdminProject";
import AdminContact from "./AdminContact";
import {Link, useNavigate} from "react-router-dom";
import {LogoutOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/features/auth/authSlice";
import {useLogoutMutation} from "../../redux/api/userApiSlice";

const Admin = () => {
  const { userInfo } = useSelector((state:any) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const tabItems = [
    {
      label: "Intro",
      key: "1",
      children: <AdminIntro />,
    },
    {
      label: "About",
      key: "2",
      children: <AdminAbout />,
    },
    {
      label: "Experiences",
      key: "3",
      children: <AdminExperience />,
    },
    {
      label: "Projects",
      key: "4",
      children: <AdminProject />,
    },
    {
      label: "Contacts",
      key: "5",
      children: <AdminContact />,
    },
  ];

  const logoutHandler = async () => {
    try {
      await logoutApiCall('').unwrap();
      dispatch(logout());
      navigate("/admin");
    } catch (err) {
      message.error((err as any)?.data?.message || (err as any).error);
    }
  };

  return (
    <div>
      <div className='sticky top-0 p-5 z-10 bg-primary flex justify-between'>
        <Link to="/" className='text-white text-3xl font-semibold cursor-pointer'>{`${'<MendritMorina/>'}`}</Link>
        {userInfo && <button
          onClick={logoutHandler}
          className="text-left"
        >
          <LogoutOutlined className='text-2xl text-white hover:text-3xl'/>
        </button>}
      </div>
      <div className="mt-5 p-5">
        <Tabs defaultActiveKey="1" items={tabItems} />
      </div>
    </div>
  );
};

export default Admin;
