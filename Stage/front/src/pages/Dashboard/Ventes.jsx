import Sidebar from "../../components/SideNav/Sidebard";
import { useState, useEffect } from "react";
import Fixednav from '../../components/SideNav/Fixednav'

const Vente = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [ventes, setVentes] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    const toogleDark = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        fetchVentes();
    }, []);

    const fetchVentes = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8000/api/facture/');
            const data = await response.json();
            setVentes(data);
            
            // Calculer les statistiques
            const totalVentes = data.length;
            const totalMontant = data.reduce((sum, vente) => sum + vente.prixtotale, 0);
            const ventesParProduit = data.reduce((acc, vente) => {
                acc[vente.produit_nom] = (acc[vente.produit_nom] || 0) + vente.quantite;
                return acc;
            }, {});

            setStats({
                totalVentes,
                totalMontant,
                ventesParProduit
            });
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des ventes:', error);
            setLoading(false);
        }
    };

  
    return (
        <section className={` ${darkMode && 'dark'} flex gap-1 bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>
            <Sidebar />
            
            <div className="m-3 text-xl font-semibold w-full rounded-lg bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">
                <Fixednav toogleDark={toogleDark} darkMode={darkMode} />

                <div className="flex flex-col flex-1 p-4">
                    <h1 className="text-2xl font-bold mb-4">Gestion des Ventes</h1>

                    <div className="flex flex-1 gap-4">
                        {/* Tableau des ventes (2/3) */}
                        <div className="flex-1 w-2/3">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                                <h2 className="text-xl font-semibold mb-4">Ventes par Date</h2>

                                {/* Filtre par date */}


                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-700">
                                            <th className="px-4 py-2">Date</th>
                                            <th className="px-4 py-2">Nom</th>
                                            <th className="px-4 py-2">Quantité</th>
                                            <th className="px-4 py-2">Montant</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4">Chargement...</td>
                                            </tr>
                                        ) : (
                                            ventes.map((vente) => (
                                                <tr key={vente.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">

                                                    <td className="px-4 py-2">{vente.date}</td>
                                                    <td className="px-4 py-2">{vente.produit}</td>
                                                    <td className="px-4 py-2">{vente.quantite}</td>
                                                    <td className="px-4 py-2">${vente.prixtotale}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Statistiques (1/3) */}
                        <div className="w-1/3">
                            <div className="bg-white dark:bg-gray-800 rounded-sm shadow p-4">
                                <h2 className="text-xl font-semibold mb-4">Statistiques des Ventes</h2>

                                <div className="space-y-4">
                                    <div className="p-4 bg-green-100 dark:bg-green-900 rounded">
                                        <h3 className="font-semibold">Total des ventes</h3>
                                        <p className="text-2xl">{stats.totalVentes}</p>
                                    </div>

                                    <div className="p-4 bg-green-100 dark:bg-green-900 rounded">
                                        <h3 className="font-semibold">Montant total</h3>
                                        <p className="text-2xl">${stats.totalMontant}</p>
                                    </div>

                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Vente;