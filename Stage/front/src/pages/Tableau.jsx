import { AiFillSetting } from "react-icons/ai"; 
import { AiFillInfoCircle } from "react-icons/ai"; 



const Tableau = () =>{
    return (
        <>
          <div>
             <main className="max-w-full h-full flex-col relative overflow-y-hidden">
                  
                  <div className="mt-5 h-full flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max  overflow-y-scroll">
                    
                    {/* <div className="w-96 h-60 justify-center items-center rounded-lg  flex-shrink-0 flex-grow bg-green-400 grid-flow-col auto-cols-max">
                          
                    </div>  */}

                       <div className="   rounded-lg flex-shrink-0 flex-grow bg-yellow-300">
                        <div className=" m-5 p-3 flex justify-between">
                          <p className="text-2xl text-start font-bold ">Recommendations</p>
                            <ul className="text-end grid grid-cols-2 gap-3">
                              <li><AiFillInfoCircle className="w-10 h-10"/></li>
                              <li><AiFillSetting className="w-10 h-10"/></li>
                            </ul>
                        </div>
                      <div className="flex gap-10 mb-5 justify-center  rounded-lg">
                        <div className="w-72 h-24  bg-slate-100 rounded-lg p-3 justify-between flex"><p className="text-xl font-bold">Total Produit</p> <p className="text-2xl font-bold">50</p>
                        <p></p></div>
                        </div>  
                    </div>
                  
                 </div>
                </main>
          </div>
        </>
    )
}

export default Tableau