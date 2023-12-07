import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import FileUploader from "./FileUploader";
import axios from "axios";
import PdfContext from "../../context/PdfContext";
import UserContext from "../../context/UserContext";
import { IoMdClose } from "react-icons/io";
import ExtractPages from "./ExtractPages";


const Home = () => {
  const [UploadFilename, setUploadFileName] = useState("");
  // const [selectedOption, setSelectedOption] = useState("");
  const initialValues = {
    file: "",
    fileName: "",
  };
  const [formData, setFormData] = useState(initialValues);

  const [response, setResponse] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState({});

  // const [pdfs, setPdfs] = useState([]);

  const { setUserPdfs, userPdfs } = useContext(PdfContext);
  const { setUser, user } = useContext(UserContext);

  const handleFile = (file) => {
    setUploadFileName(file.name);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result.split(",")[1];
        setFormData({
          ...formData,
          file: base64String,
          fileName: file.name,
        });
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  // Function to remove the uploaded filename from state
  const removeFile = () => {
    setUploadFileName("");

    setFormData({
      ...formData,
      file: "",
      fileName: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        { withCredentials: true }
      );

      //response handling
      if (response.status === 200) {
        setResponse(response.data);
        fetchPdfs();

        console.log("Form submitted successfully");
      } else {
        console.error("Form submission failed ");
      }
    } catch (error) {
      console.error("Error while submitting the form :", error);
      if (error.response) {
        console.error("server responded :", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPdfs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/allpdfs", {
        withCredentials: true,
      });
      // setPdfs(response.data);
      setUserPdfs(response.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  useEffect(() => {
    
    fetchPdfs();
  }, []);

  //handle-pdf-delete
  const handleDelete = async (pdfId) => {
    try {
      setIsDeleting((loading) => ({...loading,[pdfId]:true}));
      await axios.delete(`http://localhost:3001/pdf/${pdfId}`,
      {withCredentials:true,}
      );
      fetchPdfs();
    } catch (error) {
      console.error("error delting pdf",error);
    } finally {
      setIsDeleting((loading) => ({...loading, [pdfId] : false}));
    } 
  }

  const username = user?.username;

  return (
    <>
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen">
      {username ? (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[34rem]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
            <div className="flex flex-col mt-14 md:mt-20">
              <label className="font-[500] text-[14px] text-[#333333]">
                Upload PDF
              </label>
              <div className="flex gap-1 md:gap-4 border rounded-[8px] border-gray-400 bg-gray-200 w-full ">
                <label className=" border-gray-400 rounded-[8px] px-3 text-[14px] bg-gray-200 text-gray-500 py-[12px] w-4/5 min-w-[8rem]">
                  {UploadFilename ? <p> {UploadFilename}</p> : ""}
                </label>
                <FileUploader
                  handleFile={handleFile}
                  removeFile={removeFile}
                  className=""
                />
              </div>
            </div>
            <div className=" place-self-center">
              <button
                type="submit"
                className={`bg-[#9747FF] px-[28px] py-[16px] text-[10.9px] md:text-[14px] font-[700] text-white  rounded-[8px] mt-4
                `}
              >
                {isLoading ? "Saving...." : "Save PDF"}
              </button>
            </div>
          </form>

          {userPdfs && (
            <>
              <div className="mt-4 w-3/4">
                <h2 className="text-lg font-bold mb-2">All Saved PDF Documents</h2>
                <ul className="flex flex-col gap-4 3xl:gap-12">
                  {userPdfs.map((pdf) => (
                    <div key={pdf._id}
                    className="flex justify-between ">
                      <li>{pdf.fileName}</li>
                      {/* <div>{pdf.fileData}</div> */}
                      <button
                        onClick={() => handleDelete(pdf._id)}
                        className="flex justify-around font-[500] md:w-[120px] text-[12px] md:text-[14px] rounded-[8px] p-[8px] gap-[4px] border-2 border-[#FF0000] text-[#FF0000] items-center cursor-pointer hover:text-white hover:bg-red-500"
                      >
                        {isDeleting[pdf._id] ? "Deleting..." :
                          <>
                           <IoMdClose />
                        <span>Delete</span>
                          </>
                        }
                      </button>
                    </div>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      ) : (
        <Link to="/login" className="underline">
          Login to continue
        </Link>
      )}
    <ExtractPages />
    </div>
    </>
  );
};

export default Home;
