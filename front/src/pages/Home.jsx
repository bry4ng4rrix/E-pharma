
import Navbar from "../components/Navbar";
import Tableau from "../components/Tableau"
import Sidebard from "../components/Sidebard";
const App = () => {
    return (
      <>
        <div className="min-h-screen justify-center flex-1 bg-gradient-to-tl from-green-950 to-green-600">
          {/* <Navbar /> */}
              {/* sidebard */}
            <Sidebard />
              {/* contenu */}
              <div className="py-12 transition-all duration-300 ease-in-out ml-56 ">
                <div className="  m-5 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-red-500 mt-14">
                  <Tableau />
                </div>
              </div>
        </div>
      </>
    );
    }

export default App;