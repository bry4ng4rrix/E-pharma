import Error from '../assets/img/error.png'

const error = () => {
    return (
        <div className="min-w-full min-h-screen bg-gray-400 flex items-center justify-center">
            <div className="text-center flex flex-col items-center justify-center">
               
                <img src={Error} alt="Erreur" className="w-96 h-auto mx-auto" />
            </div>
        </div>
    )
}

export default error