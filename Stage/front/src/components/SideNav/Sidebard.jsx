import { MdOutlineGroup } from "react-icons/md"; 
import { MdOutlineAdminPanelSettings } from "react-icons/md"; 
import { MdOutlineLogout } from "react-icons/md"; 
import { MdOutlineListAlt } from "react-icons/md";
import { MdOutlineSpoke } from "react-icons/md";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Sidebard = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                await fetch('http://localhost:8000/logout/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                });
            }
            localStorage.setItem('message','Deconnection Success');
        } catch (error) {
            console.error('Logout error:', error);
        }

        // Clear localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('is_superuser');
        localStorage.removeItem('is_active');
        navigate('/');
        // Show success toast and redirect to login page
        
    };

    function handleOpen() {
        setOpen(!open);
    }

    const navmenu = [
        { nom: "Tableau de Bord", link: "/admin", icon: MdOutlineDashboard },
        { nom: "Ventes", link: "/admin/vente", icon: MdOutlineAddShoppingCart, margin: true },
        { nom: "Produits", link: "/admin/produits", icon: MdOutlineSpoke },
        { nom: "Demande", link: "/admin/rendevous", icon: MdOutlineDashboard },
        { nom: "Programme", link: "/admin/programe", icon: MdOutlineListAlt },
        { nom: "Employé", link: "/admin/employer", icon: MdOutlineAdminPanelSettings, margin: true },
        { nom: "Membres", link: "/admin/membre", icon: MdOutlineGroup },
        { nom: "Se deconnecter", onClick: handleLogout, icon: MdOutlineLogout },
    ];

    return (
        <div className={`dark:bg-fonddark bg-vertblanc min-h-screen relative ${open ? 'w-72' : 'w-16'} text-green-950 dark:text-green-100 px-4 backdrop-blur-sm `}>
            <div className={`py-3 flex justify-end`}>
                <HiMenuAlt3 size={26} className="cursor-pointer" onClick={handleOpen} />
            </div>

            <div className="mt-4 flex flex-col gap-4 relative">
                {navmenu?.map((menu, i) => (
                    <Link
                        to={menu?.link}
                        key={i}
                        className={` ${menu?.margin && 'mt-7'} group flex items-center text-sm gap-3.5 text-green-950 dark:text-green-100 font-medium p-2
                                    hover:bg-green-50 dark:hover:text-slate-800 dark:hover:border dark:hover:border-green-10 rounded-md`}
                        onClick={menu?.onClick}
                    >
                        <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                        <h2
                            style={{
                                transitionDelay: `${i + 3}00ms`,
                            }}
                            className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}
                        >
                            {menu?.nom}
                        </h2>
                        <h2
                            className={` ${open && 'hidden'} absolute left-48 bg-white dark:bg-slate-800 font-semibold whitespace-pre dark:text-green-100 text-green-950 rounded-md drop-shadow-lg px-0 py-0 
                                        w-0 overflow-hidden group-hover:px-3 group-hover:py-2
                                        group-hover:left-14 group-hover:duration-300 group-hover:w-fit group-hover:border group-hover:border-green-950 group-hover:shadow-xl dark:group-hover:border dark:group-hover:border-green-10 `}
                        >
                            {menu?.nom}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebard;