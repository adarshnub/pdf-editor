import React from "react";




const UserContext = React.createContext();


export default UserContext;


























// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check authentication status and set the user if authenticated
//     const checkAuth = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/check-auth', {
//           credentials: 'include',
//         });

//         if (response.ok) {
//           const userInfo = await response.json();
//           setUser(userInfo);
//         }
//       } catch (error) {
//         console.error('Error checking authentication', error);
//       }
//     };

//     checkAuth();
//   }, []);

//   const logout = async () => {
//     try {
//       await fetch('http://localhost:3001/logout', {
//         credentials: 'include',
//         method: 'POST',
//       });

//       setUser(null);
//     } catch (error) {
//       console.error('Error during logout', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={ {user, logout} }>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
