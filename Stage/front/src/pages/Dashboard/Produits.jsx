import { BiTrashAlt } from "react-icons/bi"; 
import Sidebar from "../../components/SideNav/Sidebard";
import { useState, useEffect } from "react";
import Fixednav from '../../components/SideNav/Fixednav'
import axios from 'axios';

const Produits = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [produits, setProduits] = useState([]);
    const [selectedProduit, setSelectedProduit] = useState(null);q
    const [loading, setLoading] = useState(true);
    const [reche,setReche] = useState("");

    const toogleDark = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/produits/');
                setProduits(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
                setLoading(false);
            }
        };
        fetchProduits();
    }, []);

    const recherche = (e) => {
        console.log(e.target.value)
        let mot = e.target.value;
        setReche(mot);
    }

    const handleProduitClick = (produit) => {
        setSelectedProduit(produit);
    };

    return (
        <section className={` ${darkMode && 'dark'} flex gap-1 bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>
            {/* sidebard */}
            <Sidebar />
            
            {/* navbar */}
            <div className="m-3 text-xl font-semibold w-full rounded-lg bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">
                <Fixednav toogleDark={toogleDark} darkMode={darkMode} />

                {/* Contenu principal */}
                <div className="flex flex-col flex-1 p-4">
                    {/* Titre */}
                    <h1 className="text-2xl font-bold mb-4">Gestion des Produits</h1>

                    {/* Conteneur des deux tableaux */}
                    <div className="flex flex-1 gap-4">
                        {/* Tableau des produits (2/3) */}
                        <div className="flex-1 w-2/3">
                            <div className="bg-white  dark:bg-gray-100 rounded-lg shadow p-4 m-4">
                                <div><input type="text"  className="flex h-6 rounded border border-gray-800  p-4 m-2 justify-center items-center "
                                onChange={recherche}
                                /></div>

                                {loading ? (
                                    <div className="text-center py-4">Chargement...</div>
                                ) : (
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-700">
                                                <th className="px-4 py-2">Nom</th>
                                                <th className="px-4 py-2">BV</th>
                                                <th className="px-4 py-2">Prix Dollar</th>
                                                <th className="px-4 py-2">Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {produits.filter((val) => {
                                                return val.Nom.includes(reche);    
                                                }).map((val) => (
                                                <tr 
                                                    key={val.id}
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                                    onClick={() => handleProduitClick(val)}
                                                >
                                                    <td className="px-4 py-2">{val.Nom}</td>
                                                    <td className="px-4 py-2">{val.Bv}</td>
                                                    <td className="px-4 py-2">{val.Dollard}</td>
                                                    <td className="px-4 py-2"><a href=""><BiTrashAlt /></a></td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>

                        {/* Tableau des détails (1/3) */}
                        <div className="w-1/3">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                                <h2 className="text-xl font-semibold mb-4">Détails du Produit</h2>
                                {selectedProduit ? (
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td className="font-semibold">Nom :</td>
                                                <td>{selectedProduit.Nom}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold">Description :</td>
                                                <td>{selectedProduit.Description || 'Non disponible'}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold">BV :</td>
                                                <td>{selectedProduit.Bv}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold">$ :</td>
                                                <td>{selectedProduit.Dollard}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold">Prix Distributeur :</td>
                                                <td>${selectedProduit.prix_distributeur} Ar</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold">Prix en Détail :</td>
                                                <td>${selectedProduit.Prix_en_detail} Ar</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-4">Sélectionnez un produit pour voir ses détails</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Produits;