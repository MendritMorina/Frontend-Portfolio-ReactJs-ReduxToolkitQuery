import {useGetIntroQuery} from "../../redux/api/introApiSlice";
import Loader from "../../components/Loader";


const Intro = () => {
    const {data, isLoading} = useGetIntroQuery('');

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className='h-[75vh] bg-primary flex flex-col items-start justify-center gap-8 py-10'>
            <h1 className='text-white lg:mt-9 sm:mt-0'>Hi, I am</h1>
            <h1 className='text-7xl sm:text-3xl text-secondary font-semibold'>{data?.name}</h1>
            <h1 className='text-7xl sm:text-3xl text-white font-semibold'>{data?.description}</h1>
            <p className='text-white w-2/3'>{data?.content}</p>
            <button
                className='border-2 border-tertiary text-tertiary px-10 py-3 rounded transform hover:scale-90 transition duration-300 sm:-mb-32'
                onClick={() => window.open(data?.pdfUrl, '_blank')}>View my CV
            </button>
        </div>
    );
};

export default Intro;
