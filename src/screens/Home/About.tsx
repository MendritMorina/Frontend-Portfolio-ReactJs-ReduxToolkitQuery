import {useGetAboutQuery} from "../../redux/api/aboutApiSlice";
import Loader from "../../components/Loader";

const About = () => {
    const {data, isLoading} = useGetAboutQuery('');

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className='pt-9'>
            <div className='flex gap-8 items-center py-10'>
                <h1 className='text-3xl text-secondary'>About</h1>
                <div className='w-60 h-[1px] bg-tertiary'></div>
            </div>
            <div className='flex w-full items-center sm:flex-col sm:-mt-32'>
                <div className='h-[55vh] w-1/2 flex items-center justify-center sm:w-full'>
                    <img className="rounded w-[350px] h-[350px] sm:w-[300px] sm:h-[300px]" src={data?.imageUrl}
                         alt="Myself"/>
                </div>
                <div className='flex flex-col gap-5 w-1/2 sm:w-full sm:-mt-20'>
                    <p className='text-white'>{data?.descriptionOne}</p>
                    <p className='text-white'>{data?.descriptionTwo}</p>
                </div>
            </div>
            <div className='py-10'>
                <h1 className='text-tertiary text-xl'>Here are a few technologies I've been working with
                    recently:</h1>
                <div className='flex flex-wrap gap-10 mt-5'>
                    {data?.skills?.map((skill: string, index: number) => (
                        <div key={index} className='border border-tertiary py-3 px-10'>
                            <h1 className='text-tertiary'>{skill}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About
