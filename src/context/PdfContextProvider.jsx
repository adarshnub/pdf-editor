import { useState } from "react"
import PdfContext from "./PdfContext"



const PdfContextProvider = ({children}) => {
    const [userPdfs, setUserPdfs] = useState([]);

    return (
        <PdfContext.Provider value={{userPdfs,setUserPdfs}} >
            {children}
        </PdfContext.Provider>
    )
}

export default PdfContextProvider;