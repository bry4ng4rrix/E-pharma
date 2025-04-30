import { RxRocket } from "react-icons/rx"; 



const Tableau = () =>{
    return (
        <>
           <ul className=" grid grid-cols-3 gap-3 p-3  justify-center bg-slate-600 rounded-xl w-full bg-opacity-80">
                 <li className="bg-green-600 rounded-lg h-48">
                  <div className="justify-center p-10 items-center">
                      <RxRocket  className="text-4xl text-white"/>
                      <p className="text-white lg:text-3xl mt-4 font-semibold "> Produit Total</p>
                  </div>
                 </li>
                 <li className="bg-red-600 rounded-lg h-48"></li>
                 <li className="bg-blue-600 rounded-lg h-80"></li>
          </ul>
        </>
    )
}

export default Tableau