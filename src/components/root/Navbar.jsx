import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Navbar = () => {
  // const [username, setUsername] = useState(null);

  const { setUser, user } = useContext(UserContext);


  useEffect(() => {
    fetch("http://localhost:3001/check-auth", {
      credentials: "include",
    }).then((response) => {
        response.json().then(userInfo => {
        
        setUser(userInfo)
        // console.log(username,"user   namme")
        })
      });
  }, []);


  function Logout() {
    fetch('http://localhost:3001/logout',{
        credentials: 'include',
        method: 'POST',
    })
    setUser(null);
  }

  const username = user?.username;

  return (
    <div className="sticky top-0 w-full flex justify-between py-6 shadow-xl bg-[#c5aee8] px-4 md:px-10 opacity-90">
      <h1 className="font-extrabold md:text-[18px] cursor-pointer">PDF EDITOR</h1>
      <ul className="flex gap-4 text-[16px] md:text-[18px]">
        {username && (
          <>
            <li>
             <h1>{user.username}</h1>
            </li>
            <li>
               <button onClick={Logout}
               type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >
                Logout
               </button>
               
            </li>
          </>
        )}

        {!username && (
          <>
            <li>
              <Link to="/login"
               class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >Login
              </Link>
            </li>
            <li>
              <Link to="/register"
               class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Register
                </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
