const Loader = () => {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary z-[100]'>
      <div className='flex gap-5 text-5xl font-semibold sm:text-3xl'>
        <h1 className='text-red-600 m'>M</h1>
        <h1 className='text-white e'>E</h1>
        <h1 className='text-green-500 n'>N</h1>
        <h1 className='text-amber-500 d'>D</h1>
        <h1 className='text-tertiary r'>R</h1>
        <h1 className='text-cyan-400 i'>I</h1>
        <h1 className='text-fuchsia-500 t'>T</h1>
      </div>
    </div>
  )
}
export default Loader
