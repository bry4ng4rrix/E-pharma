import { useState } from "react";
import { RxPinRight } from "react-icons/rx"; 
import { RxSun } from "react-icons/rx"; 




const Sidebard = () => {
	const [isOpen,setIsOpen] = useState(false);

    return (
        <div className={`  flex-col  items-center  justify-between md:w-48 mt-24  h-5/6 py-5 m-5  fixed overflow-hidden text-slate-200 bg-slate-950 opacity-80 rounded ${isOpen ? 'md:w-48 justify-between' :'w-20' } `}>
		<a className="flex items-center w-full px-3 mt-3" href="#">
			<RxSun className="w-6 h-6"/>
			<span className={` ml-2  font-bold ${isOpen ? 'hidden' : 'text-2xl'} `}>MAHQ<span className="text-green-500 text-lg font-semibold">UAFY</span></span>
		</a>
		<div className="w-full px-3">
			<div className="flex flex-col justify-center w-full mt-3 border-t  border-gray-700">
				<a className="flex items-center w- h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
					<span className="ml-2  text-sm font-medium">Dasboard</span>
				</a>
				<a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Search</span>
				</a>
				<a className="flex items-center w-full h-12 px-3 mt-2 text-gray-200 hover:bg-gray-700 rounded" href="#">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Insights</span>
				</a>
				
			</div>
			<div className="flex flex-col items-center w-full mt-2 border-t border-b border-gray-700">
				<a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Products</span>
				</a>
				<a className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Messages</span>
					<span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
				</a>
				<a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
					<svg className="w-6 h-6 stroke-current"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
					</svg>
					<span className="ml-2 text-sm font-medium">Settings</span>
				</a>
				
			</div>
		</div>
		
		<a className="flex items-center  h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
		<RxPinRight className="w-6 h-6"/>
			<span className="ml-2 text-sm font-bold">Deconnecter</span>
		</a>
	</div>
    );
}

export default Sidebard