import ProgressBar from "./ProgressBar";
import { useState } from "react";
import Modal from "./Modal";


function ListItem({task, getData}) {
  const [showModal, setShowModal] = useState(false);

  async function deleteItem() {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`,{
        method: "DELETE"
    });
      
      if(response.status === 200) {
        getData();
      }

    } catch (err) {
      console.err(err);
    }
  }

    return (
      
      <li className="w-[full] bg-[#191919] flex justify-between items-center border border-[#303030] rounded-[10px] 
          mt-4 py-[20px] my-[10px]  xs:h-[50px] xs:px-[16px] xs:ml-5 xs:mr-5   sm:ml-16 sm:mr-16   md:h-[55px] md:ml-20 md:mr-20 
          lg:h-[65px] lg:ml-40 lg:mr-40   xl:ml-64 xl:mr-64   2xl:ml-96 2xl:mr-96   3xl:h-[70px] 3xl:ml-86 3xl:mr-86">

        <div className="flex items-center ">
          <label className="relative flex items-center pl-0 cursor-pointer text-lg select-none xs:mr-[10px]">

            <input 
              className="absolute opacity-0 h-0 w-0 cursor-pointer custom-checkbox" 
              id={task.id} 
              type="checkbox" 
              onChange={() => setTimeout(deleteItem, 400)} 
            />

            <span 
              className="flex items-center justify-center h-[12px] w-[12px] m-2 bg-[#202020] 
                border border-white transition-colors duration-300 shadow relative checkmark">
            </span>

          </label>

          <p className="task-title text-white font-medium xs:text-sm md:text-[16px] mr-[5px]">{task.title}</p>
          <ProgressBar progress={task.progress} />

        </div>
        <div className="">

          <svg 
            className="fill-white border-none cursor-pointer hover:opacity-85 mr-2  xs:w-[15px] xs:h-[15px]   md:w-[16px] md:h-[16px] 3xl:w-[18px] 3xl:h-[18px]" 
            onClick={() => { setShowModal(true); }} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512">
            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 
            88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 
            255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 
            3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 
            31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 
            6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 
            28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 
            64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 
            88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 
            22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 
            40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
          </svg>

        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
        
      </li>



    );
  }
  
  export default ListItem;
  