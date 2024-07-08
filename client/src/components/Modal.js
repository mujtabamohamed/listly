import { useState } from "react";
import { useCookies } from "react-cookie";

function Modal({mode, setShowModal, getData, task}) {
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const editMode = mode === 'edit' ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date()
  });

  async function postData(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      if (response.status === 200) {
        console.log("WORKED");
        setShowModal(false);
        getData();
      }
      
    } catch (err) {
      console.error(err);
    }
  }

  async function editData(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.status === 200) {
        setShowModal(false);
        getData();
      } 

    } catch (err) {
      console.error(err);
    }
  }





  function handleChange(event) {
    const { name, value } = event.target;
    
    setData(data => ({
      ...data,
      [name]: value
    }))

    // console.log(data);
  }

    return (
      <div class="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
        <div class="bg-[#101010] px-10 py-6 rounded-xl shadow-lg xs:w-[320px] xs:py-4 sm:w-[480px] md:w-[540px]">
          <button 
              class="relative left-128 bottom-6 text-white focus:outline-none 
              rounded-sm rounded-tr-xl active:text-red-600 py-2 px-4
              xs:left-60 xs:bottom-4 sm:left-96 sm:bottom-0 md:left-112 md:bottom-2" 
              onClick={() => setShowModal(false)}>X
          </button>
          <div class="flex justify-between items-center">
            <h3 class="text-white text-xl font-semibold mb-2">Let's {mode} your task</h3>
            
          </div>
          <form class="flex flex-col">
            <textarea
              required
              autoFocus
              class="bg-[#101010] text-white text-sm border border-[#252525] rounded-lg mt-4 p-2.5 focus:border-blue-600 outline-none transition duration-100"
              maxLength="30"
              placeholder="Your task..."
              name="title"
              value={data.title}
              onChange={handleChange}
            ></textarea>
            <br/>
            <label htmlFor="range" class="text-sm text-white mb-3 mt-2">Drag to select your current progress</label>
            <input
              required
              class="task-range"
              type="range"
              id="range"
              min="10"
              max="100"
              name="progress"
              value={data.progress}
              onChange={handleChange}
            />
            <input 
              class="bg-[#ffffff] hover:bg-[#ebebeb] text-black text-md font-semibold rounded-lg w-full mt-10 mb-4 py-2 
              cursor-pointer transition duration-300 hover:opacity-85 border-none" 
              value={mode} type="submit" onClick={editMode ? editData : postData} />
          </form>
        </div>
      </div>

    );
  }
  
  export default Modal;
  