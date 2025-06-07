import { AiFillCloseCircle } from "react-icons/ai";
import Sidebar from "../../components/SideNav/Sidebard";
import { useState, useEffect } from "react";
import Fixednav from '../../components/SideNav/Fixednav'
import Dgrid from '../../ui/grid/grid'
import { motion } from 'framer-motion'
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Produits = () => {

    const [ajoutform, setAjoutform] = useState(false);
    const openajoutform = () => setAjoutform(true);
    const closeajoutform = () => setAjoutform(false);
    const [darkMode, setDarkMode] = useState(false);
    const [Nom, setNom] = useState('');
    const [Description, setDescription] = useState('');
    const [Bv, setBv] = useState('');
    const [Dollard, setDollard] = useState('');
    const [Prix_distributeur, setPrix_distributeur] = useState('');
    const [Prix_en_detail, setPrix_en_detail] = useState('');

    const toogleDark = () => {
        setDarkMode(!darkMode)


    }
    const data = {
        Nom: Nom,
        Description: Description,
        Bv: Bv,
        Dollard: Dollard,
        Prix_distributeur: Prix_distributeur,
        Prix_en_detail: Prix_en_detail
    }

    const enregistre = async (e) => {
        e.preventDefault();
        toast.dismiss()
        if (!Nom || !Description || !Bv || !Dollard || !Prix_distributeur || !Prix_en_detail) {
            toast.error('Veuiller remplire tous les Champs')
            return;
        }


        try {
            const response = await fetch("http://localhost:8000/api/produits/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const responsData = await response.json();
            if (response.ok) {
                toast.success("Produit Enregistre avec Success")
                setTimeout(() => {
                    setAjoutform(false)
                    return
                }, 1000);
                return
            }
            else {
                if (response.status === 400) {
                    Object.entries(responsData).forEach(([field, errors]) => {
                        if (Array.isArray(errors)) {

                            if (field === 'Nom') {
                                toast.error('Nom deja prise')
                            }

                        }
                    })
                }
            }
            return
        }
        catch (error) {
            toast.error('Erreur de connexion au serveur')
        }
    }



    return (

        <section className={` ${darkMode && 'dark'} flex gap-1 bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
                pauseOnHover
                transition={Bounce}
            />


            {/* sidebard */}
            <Sidebar />

            {/* navbar */}
            {/* contenue */}
            <div className=" m-3 text-xl  font-semibold  w-full rounded-lg bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">

                <Fixednav toogleDark={toogleDark} darkMode={darkMode} />

                <div className="p-3">
                    <div className="justify-end flex m-3">
                        <button className="bg-vert px-5 rounded text-vertblanc p-2" onClick={openajoutform}>Ajouter </button>
                    </div>
                    <Dgrid />

                    {ajoutform && (
                        <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm
                            z-50 flex items-center justify-center p-4"

                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-green-50 max-w-md w-full p-6 rounded ">
                                <div className="flex justify-between  m-1  ">
                                    <div className="text-xl text-vertsombre font-semibold">Nouveau Produit</div>
                                    <button onClick={closeajoutform}><AiFillCloseCircle /></button>
                                </div>
                                <div className="grid grid-cols-1 gap-3 mt-10">
                                    <input type="text" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm shadow-xl border-none outline-none" placeholder="Nom" onChange={(e) => setNom(e.target.value)} />
                                    <input type="text" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder="Descriptions" onChange={(e) => setDescription(e.target.value)} />
                                    <div className="grid grid-cols-2 gap-2 mt-2 mb-2">
                                        <input type="number" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder="Bv" onChange={(e) => setBv(e.target.value)} />
                                        <input type="number" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder="$" onChange={(e) => setDollard(e.target.value)} />

                                    </div>
                                    <input type="number" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder="Prix Distributeur" onChange={(e) => setPrix_distributeur(e.target.value)} />
                                    <input type="number" className="bg-vertsombre text-vertblanc h-10 p-2 rounded-sm outline-none shadow-xl border-none" placeholder="Prix en détail" onChange={(e) => setPrix_en_detail(e.target.value)} />
                                    <button className="bg-vert h-10 mt-7 mb-4 rounded-sm hover:bg-vertsombre hover:shadow-2xl  shadow-xl  text-green-100" onClick={enregistre}>Enregistre</button>

                                </div>
                            </div>

                        </motion.div>
                    )}


                </div>
            </div>



        </section>
    )
}

export default Produits 