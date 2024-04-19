import {Link} from 'react-scroll';
import {useState} from "react";
import {CloseOutlined,MenuOutlined} from "@ant-design/icons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHeader = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className='sm:hidden sticky top-0 p-5 bg-primary z-10 flex justify-between flex-wrap'>
        <Link to="home" smooth={true} duration={900}
              className='text-white text-3xl font-semibold cursor-pointer'>{`${'<MendritMorina/>'}`}</Link>
        <Link to="about" smooth={true} duration={900}
              className='text-white text-2xl font-semibold cursor-pointer border-b-4 border-transparent hover:border-tertiary'>//
          about</Link>
        <Link to="experience" smooth={true} duration={900}
              className='text-white text-2xl font-semibold cursor-pointer border-b-4 border-transparent hover:border-tertiary'>//
          experience</Link>
        <Link to="projects" smooth={true} duration={900}
              className='text-white text-2xl font-semibold cursor-pointer border-b-4 border-transparent hover:border-tertiary'>//
          projects</Link>
        <Link to="contact" smooth={true} duration={900}
              className='text-white text-2xl font-semibold cursor-pointer border-b-4 border-transparent hover:border-tertiary'>//
          contact</Link>
      </div>
      <div className='hidden sm:flex justify-between bg-primary p-5'>
        <Link to="home" smooth={true} duration={900} className='text-white text-3xl font-semibold cursor-pointer'>{`${'<MendritMorina/>'}`}</Link>
        <button onClick={toggleHeader}>{isOpen ? <CloseOutlined className="text-white text-2xl"/> : <MenuOutlined className="text-white text-2xl"/> }</button>
      </div>
      {
        isOpen && (
          <div className='hidden sm:flex flex-col items-center p-3 bg-primary gap-1 -mb-32'>
            <Link to="about" smooth={true} duration={900}
                  className='text-white text-2xl font-semibold cursor-pointer border-b-4 border-transparent hover:border-tertiary mr-5'>//
              about</Link>
            <Link to="experience" smooth={true} duration={900}
                  className='text-white text-2xl font-semibold cursor-pointer border-b-4 border-transparent hover:border-tertiary ml-8'>//
              experience</Link>
            <Link to="projects" smooth={true} duration={900}
                  className='text-white text-2xl font-semibold cursor-pointer border-b-4 border-transparent hover:border-tertiary'>//
              projects</Link>
            <Link to="contact" smooth={true} duration={900}
                  className='text-white text-2xl font-semibold cursor-pointer border-b-4 border-transparent hover:border-tertiary mr-2'>//
              contact</Link>
          </div>
        )
      }
    </>
  )
}
export default Header
