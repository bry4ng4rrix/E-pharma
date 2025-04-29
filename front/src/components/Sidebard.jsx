import { HiLogout } from "react-icons/hi"; 
import { HiFire } from "react-icons/hi"; 
import { HiInformationCircle } from "react-icons/hi"; 
import { HiPhone } from "react-icons/hi"; 
import { HiUserCircle } from "react-icons/hi"; 
import { HiCurrencyDollar } from "react-icons/hi"; 

const Sidebard = () => {
    return (
      <div className="fixed h-3/4 opacity-80 bg-slate-800 py-12 m-5 mt-24 p-5 justify-between text-white w-52 rounded-lg flex-col flex">
        <div className="flex gap-5 text-2xl font-semibold">
          <HiCurrencyDollar className="text-3xl" /> Dash
        </div>
        <div className="my-4 border-b border-green-800 dark:border-green-700 "></div>
        <ul className="flex flex-col cursor-pointer ">
          <li className="flex p-3 text-lg hover:text-xl hover:text-slate-800 hover:bg-green-300 hover:rounded-2xl">
                    <HiUserCircle className="text-3xl mr-3 " /> home
          </li>
          <li className="flex p-3 text-lg hover:text-xl hover:text-slate-800 hover:bg-green-300 hover:rounded-2xl">
                    <HiInformationCircle className="text-3xl mr-3" /> About
          </li>
          <li className="flex p-3 text-lg hover:text-xl hover:text-slate-800 hover:bg-green-300 hover:rounded-2xl">
                    <HiFire className="text-3xl mr-3" />
            Service
          </li>
          <li className="flex p-3 text-lg hover:text-xl hover:text-slate-800 hover:bg-green-300 hover:rounded-2xl">
                    <HiPhone className="text-3xl mr-3" />
            Contact
          </li>
        </ul>
        <div className="my-4 border-b border-green-800 dark:border-green-700 "></div>
        <div className="flex font-semibold  ">
          <HiLogout className="text-2xl mr-3" /> Se deconecter
        </div>
      </div>
    );
}

export default Sidebard