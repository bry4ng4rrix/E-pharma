import { FaUserCheck } from "react-icons/fa"; 
import loginBg from '../../assets/img/login.png'
import { useState } from "react";
import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Codemember, setCodemember] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Password1, setPassword1] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Réinitialiser les erreurs précédentes
    toast.dismiss();

    if (!Nom || !Prenom || !Codemember || !Email || !Password || !Password1) {
      toast.error("Veuillez remplir tous les champs", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (Password !== Password1) {
      toast.error("Les deux mot de passe ne corespond pas", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
  

    const data = {
      first_name: Nom,
      last_name: Prenom,
      member_code: Codemember,
      email: Email,
      password: Password,
      password1: Password1,
    };

    try {
      const response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', responseData.access);
        localStorage.setItem('refresh_token', responseData.refresh);
        localStorage.setItem('member_code', responseData.user.member_code);
        localStorage.setItem('username', responseData.user.username);
        localStorage.setItem('email', responseData.user.email);
        localStorage.setItem('is_active', responseData.user.is_active ? 'true' : 'false');
        localStorage.setItem('is_superuser', responseData.user.is_superuser ? 'true' : 'false');

        toast.success("Inscription réussie ! Redirection...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Rediriger vers la page de connexion après un délai
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        // Gestion des erreurs de validation
        if (response.status === 400) {
          // Afficher les erreurs de validation
          Object.entries(responseData).forEach(([field, errors]) => {
            // Si c'est une liste d'erreurs
            if (Array.isArray(errors)) {
              errors.forEach(error => {
                toast.error(`${field}: ${error}`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
              });
            } else {
              // Si c'est une erreur simple
              const errorMessage = field === 'email' && errors.includes('déjà utilisée') 
                ? 'Email déjà pris' 
                : `${field}: ${errors}`;
              
              toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }
          });
        } else {
          // Autres types d'erreurs
          toast.error("Une erreur est survenue lors de l'inscription", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      toast.error("Erreur de connexion au serveur. Veuillez réessayer.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  return (
    <div className=" text-fonddark flex items-center justify-center min-h-screen  bg-slate-300">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
            pauseOnHover
            transition={Bounce}
            limit={5}
          />
      <div className="flex sm:w-full min-w-96 xl:max-w-4xl   bg-[#A3D6E5] shadow-xl rounded-xl">
        {/* gauche */}
        <div className=" bg-white  h-[90vh] flex-1 p-6 rounded-l-md">
          <div className="w-full max-w-md mx-auto p-5">
            <div className="font-inter font-bold text-4xl mb-5">Inscription</div>
            <div className="font-inter text-md opacity-50 mb-2">
              Cher Client ! Veuiller remplire tous les <br />
              champs
            </div>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Noms"
                className="rounded-sm mt-2 h-10 p-3 w-full border border-gray-400 focus:border-none focus:rounded-sm "
                onChange={(e) => setNom(e.target.value)}
              />
              <input
                type="text"
                placeholder="Prenoms"
                className="rounded-sm mt-2 h-10 p-3 w-full border border-gray-400 focus:border-none focus:rounded-sm"
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>
            <input
              type="number"
              placeholder="Code du Membre"
              className="mb-2 placeholder-text-sm rounded-sm  mt-2 h-10 p-3 w-full border border-gray-400 focus:border-none focus:rounded-sm"
              onChange={(e) => setCodemember(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="mb-2 placeholder-text-sm rounded-sm  mt-2 h-10 p-3 w-full border border-gray-400 focus:border-none focus:rounded-sm"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Mot de pass"
              className="mb-2 rounded-ms mt-2 h-10 p-3 w-full border border-gray-400 focus:border-none focus:rounded-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmer le  mot de pass"
              className="mb-2 rounded-sm  mt-2 h-10 p-3 w-full border border-gray-400 focus:border-none focus:rounded-sm"
              onChange={(e) => setPassword1(e.target.value)}
            />

            <button
              type="submit"
              className="mb-2 flex items-center justify-between px-4 py-2 font-bold text-white bg-[#224F59] rounded-sm mt-6 w-full h-10 shadow-xl hover:bg-vertdark"
              onClick={handleSubmit}
            >
              <span className="flex-1 text-center">Inscription</span>
              <FaUserCheck className="w-5 h-5" />
            </button>
            <div className="mt-10 text-sm px-2 text-gray-700">
              Deja un compte ?{" "}
              <a href="/login" className="text-[#224F59] font-semibold">
                Connexion
              </a>
            </div>
          </div>
        </div>

        {/* droite */}
        <div
          className=" hidden md:block flex-1 p-8 md:rounded rounded-r-md  bg-cover bg-center"
          style={{ backgroundImage: `url(${loginBg})` }}
        >
          <div className="flex items-center justify-center h-full">
            <div className=" font-istok text-5xl font-bold text-white">
              Tongasoa <br /> Ianao !
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register