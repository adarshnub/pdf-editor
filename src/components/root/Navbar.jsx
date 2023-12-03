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
    <div className="sticky top-0 w-full flex justify-between py-6 ">
      <h1 className="font-extrabold text-[18px]">LOGO</h1>
      <ul className="flex gap-4">
        {username && (
          <>
            <li>
             <h1>{user.username}</h1>
            </li>
            <li>
              <button onClick={Logout}>Logout</button>
            </li>
          </>
        )}

        {!username && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
