
import Navbar from "../components/Navbar";
import Tableau from "../components/Tableau"
import Sidebard from "../components/Sidebard";
import Temp from "../components/Template";
const App = () => {
    return (
      <>
        <div className="min-h-screen justify-center items-center flex-1  fd bg-gradient-to-tl from-green-950 to-green-600">
          <Navbar /> 
          
              {/* sidebard */}
            <Sidebard />
              {/* contenu */}
              <div className="py-12 transition-all duration-300 ease-in-out ml-56 ">
                <div className="  m-5 p-4 border-2 border-green-400 border-dashed rounded-lg mt-14">
                  <Tableau />
                </div>
              </div>
        </div>
      </>
    );
    }

export default App;