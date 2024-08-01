import { useCookies } from "react-cookie";
import TickIcon from "./TickIcon";

function Navbar ({props ,listName}) {
    
    const [cookies, setCookie, removeCookie] = useCookies(null);

    function signOut() {
        console.log("Sign Out");
        removeCookie('Email');
        removeCookie('AuthToken');
        window.location.reload();
      }

    return (
      <div className="border-b border-b-[#303030] relative w-full bg-[#191919] flex flex-row items-center justify-between py-5 xs:px-4 lg:px-6">
        <div className="flex items-center xs:mb-0">
          <img 
            src={`${process.env.PUBLIC_URL}/images/check.png`}
            alt="Logo"
            className="xs:w-5 xs:h-5 lg:w-7 lg:h-7"  
          />
          <div className="text-gray-100 font-semibold xs:text-xl xs:ml-1 lg:text-2xl lg:ml-2">Listly</div>
        </div>

      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold flex items-center xs:text-xl lg:text-2xl">
        <TickIcon />To Do list
      </h1>

      {/* <p className="xs:text-sm text-gray-100 font-medium">
          Welcome back {props.userEmail}
        </p> */}
    
      <button 
        type="button" 
        className="text-[#c5c5c5] bg-[#151515] border border-[#444444] drop-shadow-xl shadow-[#0c0c0c] 
          rounded-lg hover:drop-shadow-[#252525] py-2 xs:px-2 xs:font-semibold xs:text-xs  lg:px-3 lg:text-sm" 
        onClick={signOut}>
        Logout
      </button>
    </div>    
    );
}

export default Navbar;