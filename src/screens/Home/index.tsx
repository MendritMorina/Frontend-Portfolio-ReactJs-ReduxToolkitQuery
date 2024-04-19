import Header from "../../components/Header";
import Intro from "./intro";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Contact from "./Contact";

const Home = () => {
  return (
    <div id="home">
      <Header/>
      <div className='bg-primary px-40 sm:px-5'>
        <Intro/>
        <div id="about"><About/></div>
        <div id="experience"><Experiences/></div>
        <div id="projects"><Projects/></div>
        <div id="contact"><Contact/></div>
      </div>
    </div>
  )
}
export default Home
