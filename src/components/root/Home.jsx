import React, { useState, useEffect } from "react";
import FileUploader from "./FileUploader";
import axios from "axios";

const Home = () => {
  const [UploadFilename, setUploadFileName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const initialValues = {
    file: "",
    fileName: "",
  };
  const [formData, setFormData] = useState(initialValues);

  const [response, setResponse] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [pdfs, setPdfs] = useState([]);

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
      // const formDataToSend = { ...formData };

      // console.log("response data ", formDataToSend);

      const response = await axios.post(
        "http://localhost:3001/upload",
        formData
      );

      //response handling
      if (response.status === 200) {
        setResponse(response.data);

        console.log("Form submitted successfully");
      } else {
        console.error("Form submission failed ");
      }
    } catch (error) {
      console.error("Error while submitting the form :", error);
      if (error.response) {
        console.error("server responded :", error);
      }
    }
  };

  const fetchPdfs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/allpdfs");
      setPdfs(response.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, [handleSubmit]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[34rem]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
        <div className="flex flex-col">
          <label className="font-[500] text-[14px] text-[#333333]">
            Upload PDF
          </label>
          <div className="flex gap-1 md:gap-4 border rounded-[8px] border-gray-400 w-full ">
            <label className=" border-gray-400 rounded-[8px] px-3 text-[14px] bg-gray-100 text-gray-500 py-[12px] w-4/5">
              {UploadFilename ? <p> {UploadFilename}</p> : ""}
            </label>
            <FileUploader
              handleFile={handleFile}
              removeFile={removeFile}
              className=""
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-[#9747FF] px-[28px] py-[16px] text-[10.9px] md:text-[14px] font-[700] text-white  rounded-[8px] mt-4
                  ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Submitting..." : "Apply"}
          </button>
        </div>
      </form>

      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">All PDFs</h2>
        <ul>
          {pdfs.map((pdf) => (
            <li key={pdf._id}>{pdf.fileName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
