import { createContext } from "react";

export const userContext = createContext({});


function UserContextProvider({children}) {
    return (
        <div>
            {children}
        </div>
    )
}