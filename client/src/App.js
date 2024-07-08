import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken  = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState(null);



  async function getData() {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);

    } catch (err) {
      console.error(err); 
    }
  }

  useEffect(() => {
    if(authToken) {
      getData();
    }
  }, [])

  console.log(tasks)

  // Sort ny date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="w-full h-screen bg-[#191919]">
      {!authToken && <Auth />}
      {authToken &&
      <>
        <Navbar 
          userEmail={userEmail}
        />
        
        <div >
          <ListHeader listName = {"To Do list"} getData={getData}/>
          {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
        </div>
      </>}  
    </div>
  );
}

export default App;
