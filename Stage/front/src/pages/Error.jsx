import Error from '../assets/img/error.png'

const error = () =>{
    return (
        <div className="w-screen min-h-screen bg-gray-400 text-center ">

            <div className='flex  items-center justify-center'>
                
                <img src={Error} alt="" className='items-center  justify-center flex' />
            </div>
           
        </div>
    )
}

export default error