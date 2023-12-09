import { useState } from "react"
import PdfContext from "./PdfContext"
import axios from "axios";



const PdfContextProvider = ({children}) => {
    const [userPdfs, setUserPdfs] = useState([]);

    const fetchPdfs = async () => {
        try {
          const response = await axios.get(
            "https://pdf-editor-bcknd.onrender.com/allpdfs",
            {
              withCredentials: true,
            }
          );
          // setPdfs(response.data);
          setUserPdfs(response.data);
        } catch (error) {
          console.error("Error fetching PDFs:", error);
        }
      };

    return (
        <PdfContext.Provider value={{userPdfs,setUserPdfs,fetchPdfs}} >
            {children}
        </PdfContext.Provider>
    )
}

export default PdfContextProvider;