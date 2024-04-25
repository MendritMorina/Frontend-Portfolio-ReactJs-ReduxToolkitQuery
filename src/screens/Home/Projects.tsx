import {useGetAllProjectsQuery} from "../../redux/api/projectApiSlice";
import {useState} from "react";
import Loader from "../../components/Loader";

const Projects = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)
    const {data: projects, isLoading} = useGetAllProjectsQuery('')

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className='pt-8'>
            <div className='flex gap-8 items-center py-10'>
                <h1 className='text-3xl text-secondary'>Projects</h1>
                <div className='w-60 h-[1px] bg-tertiary'></div>
            </div>
            <div className='flex py-10 gap-20 sm:flex-col'>
                <div
                    className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                    {projects?.map((project: any, index: any) => (
                        <div key={project?.id} onClick={() => setSelectedItemIndex(index)} className='cursor-pointer'>
                            <h1
                                className={`text-xl px-5 ${selectedItemIndex === index ? 'text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3' : 'text-white'}`}>{project?.title}</h1>
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-center gap-10 sm:flex-col'>
                    <div className='flex flex-col gap-5'>
                        <h1 className='text-secondary text-xl'>{projects?.[selectedItemIndex]?.title}</h1>
                        <p className='text-tertiary'>{projects?.[selectedItemIndex]?.description}</p>
                        <p className='text-white'>{projects?.[selectedItemIndex]?.content}</p>
                    </div>
                    <img src={projects?.[selectedItemIndex]?.imageUrl} alt="project" className="h-60 w-80 "/>
                </div>
            </div>
        </div>
    )
}

export default Projects
