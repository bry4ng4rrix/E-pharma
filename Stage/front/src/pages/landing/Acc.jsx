import logo from '../../assets/img/logo.png'
import sec from '../../assets/img/cybersec.png'
import wosh from '../../assets/img/womanshoping.png'

const Landing = () => {
    return (
            <div className="h-screen  w-full bg-vertblanc  justify-center items-center ">
                <div className=" flex h-16 relative bg-white justify-between items-center p-5 gap-6">

                    <div>
                        <img src={logo} alt="" className='h-16' />
                    </div>

                    <div>
                        <ul className='hidden  md:flex gap-10 font-inter  text-vertsombre font-semibold' >
                            <li>Home</li>
                            <li>About</li>
                            <li>Chat</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    <div>
                       <button className='bg-vertdark shadow-2xl text-lime-50 hover:bg- hover:text-black px-5 p-2 rounded font-bold font-inter'>Se Connecte</button>
                    </div>
                    
                    

                </div>


                <section className='h-screen flex justify-center  items-center  bg-vertblanc p-10  '>
                    <div className='  h-screen justify-start flex flex-col p-20 '>
                        {/* gauche */}
                        <div className='text-5xl font-bold font-istok text-vertsombre'>
                            TONGASOA IANAO !
                        </div>
                        <div className='flex w-1/2 mt-3 m-2 font-inter'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, tempore. Autem tempora error facere qui vitae eos atque, dolore itaque ex eveniet porro 
                        </div>
                        <div>
                            <button className='h-12 m-2 bg-vert mt-20 px-10 rounded text-white font-bold text-lg shadow-lg'>Voire plus</button>
                        </div>
                    </div>
                    <div className=' w-screen justify-center items-center flex'>

                        {/* droite */}
                        <img src={wosh} alt="" className='block md:h-1/2 lg:h-3/4' />
                    </div>
                </section>
                
                
                 <section className='h-48 flex bg-vert'>
                    fzf
                </section> 
                <section className='h-screen flex bg-white'>
                    fzf
                </section>
                
            </div>
    )
}

export default Landing