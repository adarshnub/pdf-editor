import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState(null);


  useEffect(() => {
    fetch("http://localhost:3001/check-auth", {
      credentials: "include",
    }).then((response) => {
        response.json().then(userInfo => {
        setUsername(userInfo.username);
        // console.log(username,"user   namme")
        })
      });
  }, []);


  function Logout() {
    fetch('http://localhost:3001/logout',{
        credentials: 'include',
        method: 'POST',
    })
    setUsername(null);
  }

  return (
    <div className="sticky top-0 w-full flex justify-between ">
      <h1 className="font-extrabold text-[18px]">LOGO</h1>
      <ul className="flex gap-4">
        {username && (
          <>
            <li>
              <button onClick={Logout}>Logout</button>
            </li>
            <li>
             {/* <h1>{userInfo.username}</h1> */}
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
