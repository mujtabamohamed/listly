import Modal from "./Modal";
import { useState } from "react";

import TickIcon from "./TickIcon";

function ListHeader({listName, getData}) {

  const [showModal, setShowModal] = useState(false);




    return (
      <div className="w-full mt-8 mb-10 flex items-center justify-center">  
        <div className="flex items-center justify-between gap-36 xs:flex-row">
          {/* <h1 className="flex items-center text-white font-bold text-4xl"><TickIcon />{listName}</h1> */}
            
              {/* <a href="#" className="create">Create a new task</a> */}
              <button 
                type="button"
                
                className="rounded-full bg-primary p-2 hover:bg-primary mt-3" 
                onClick={() => setShowModal(true)}>
              <svg  
                xmlns="http://www.w3.org/2000/svg"  
                width="30"  
                height="30"  
                viewBox="0 0 24 24"  
                fill="none"  
                stroke="#ffffff"  
                stroke-width="2"  
                stroke-linecap="round"  
                stroke-linejoin="round"  
                className="icon icon-tabler icons-tabler-outline icon-tabler-plus">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
              </button>

          {showModal && <Modal mode={'create'} setShowModal = {setShowModal} getData={getData} />}
        </div>
      </div>
    );
  }
  
  export default ListHeader;
  