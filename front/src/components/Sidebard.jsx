import { FaBed } from "react-icons/fa"; 
import { FaBusinessTime } from "react-icons/fa"; 
import { FaSignInAlt } from "react-icons/fa"; 
import { Link } from "react-router";
import { FaUserFriends ,
  FaUserEdit, 
  FaChalkboardTeacher,
  FaBriefcaseMedical,
  FaShopify,
  FaCloudscale,
 } from "react-icons/fa";
const Sidebard = (props) => {

  

  return (
    <div>
          <aside
                  className={`fixed  h-screen  flex transition-all duration-300 ease-in-out bg-white  dark:bg-gray-800 dark:border-gray-700 opacity-90 ${
                    props.isSidebarOpen ? 'w-56 ' : 'w-16  '
                  } ${props.isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                >
                  <div className="h-full px-3  overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
                    {/* Top Navigation Section */}
                    <div></div>
                    <div>
                      <ul className="space-y-2 font-medium justify-between">
                        
                        
                        <li>
                          <Link 
                            to="/admin"
                            className="flex items-center p-2 mt-5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                           <FaCloudscale  className="text-2xl"/> 
                            <span className={`ms-3 whitespace-nowrap ${!props.isSidebarOpen && 'hidden'}`}>Tableau de bord</span>
                          </Link>
                        </li>
                       
                      </ul>
          
                      {/* Separator */}
                      <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>
          
                      {/* Documents Section */}
                      <ul className="space-y-2 font-medium">
                       
                        <li className={`text-gray-500 dark:text-gray-400 text-sm px-2 py-1 ${!props.isSidebarOpen && 'hidden'}`}>ACTIVITER</li>
                        <li>
                          <Link to="/admin/vente"
                             
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                            <FaShopify  className="text-2xl"/>
                            <span className={`ms-3 whitespace-nowrap ${!props.isSidebarOpen && 'hidden'}`} onClick={()=>{
                              setIsChange('vente');
                            }}>Ventes</span>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/admin/produit" 
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                            <FaBriefcaseMedical className="text-2xl"/>
                            <span className={`ms-3 whitespace-nowrap ${!props.isSidebarOpen && 'hidden'}`}>Produits</span>
                          </Link>
                        </li> 
                        
                        <li>
                          <Link 
                            to="/admin/produit" 
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          > 
                            <FaBusinessTime className="text-2xl"/>
                            <span className={`ms-3 whitespace-nowrap ${!props.isSidebarOpen && 'hidden'}`}>Activité</span>
                          </Link>
                        </li> <li>
                          <Link 
                            to="/admin/produit" 
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          > 
                            <FaBed className="text-2xl"/>
                            <span className={`ms-3 whitespace-nowrap ${!props.isSidebarOpen && 'hidden'}`}>Garde</span>
                          </Link>
                        </li>
          
          
          
                        <li>
                          <Link 
                            to="/admin/Programme" 
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                            <FaChalkboardTeacher className="text-2xl"/>
                            <span className={`ms-3 whitespace-nowrap ${!props.isSidebarOpen && 'hidden'}`}>Programme</span>
                          </Link>
                        </li>
                       
                        
                      </ul>
                    </div>
          
                    {/* User Section - Centered */}
                    <div className="my-4">
                      {/* Separator */}
                      <div className="mb-4 border-t border-gray-200 dark:border-gray-700"></div>
          
                      <ul className="space-y-2 font-medium">
                        <li className={`text-gray-500 dark:text-gray-400 text-sm px-2 py-1 ${!props.isSidebarOpen && 'hidden'}`}>MEMBRES</li>
                        <li>
                          <Link 
                            to="/admin/profile" 
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                            <FaUserEdit className="text-2xl"/>
                            <span className={`ms-3 whitespace-nowrap ${!props.isSidebarOpen && 'hidden'}`}>Employer</span>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/admin/utilisateurs" 
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                            <FaUserFriends className="text-2xl"/>
                            <span className={`ms-3 whitespace-nowrap ${!props.isSidebarOpen && 'hidden'}`}>Personnelle</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
          
                    {/* Bottom Settings Section */}
                    <div>
                      {/* Separator */}
                      <div className="mb-4 border-t border-gray-200 dark:border-gray-700"></div>
          
                      <ul className="space-y-2 font-medium">
                        <li>
                          <Link 
                            to="/admin/parametres" 
                            className="flex items-center p-2 text-gray-900 mb-5 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                            <FaSignInAlt className="text-2xl"/>
                            <span className={`ms-3 whitespace-nowrap ${!props.isSidebarOpen && 'hidden'}`} >Se Deconnecter</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </aside>
    </div>
  )
}

export default Sidebard