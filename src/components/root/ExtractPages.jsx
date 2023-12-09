import React, { useState } from "react";
import { useContext } from "react";
import PdfContext from "../../context/PdfContext";
import axios from "axios";

const ExtractPages = () => {
  const [pdfId, setPdfId] = useState("");
  const [selectedPages, setSelectedPages] = useState("");
  const [extractedPdf, setExtractedPdf] = useState("");
  const { userPdfs, setUserPdfs } = useContext(PdfContext);

  const handleExtractPages = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/extract-pages",
        {
          pdfId,
          selectedPages: selectedPages.split(",").map((page) => parseInt(page)),
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setExtractedPdf(response.data);
        // setUserPdfs(response.data);
        console.log("pages extracted successfully");
      } else {
        console.error("error while extracting pages", error);
      }
    } catch (error) {
      console.error(error, "error extracting pages 2");
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
      }
    }
  };

  //handle pdf -Download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${extractedPdf}`;
    link.download = "extracted.pdf";
    link.click();
  };

  return (
    <div className="w-full  flex flex-col gap-5 mt-20 mb-20">
      <h2 className="text-xl font-extrabold self-center mt-12">Extract Pages from PDF</h2>
      <div>
        <label className="flex font-bold justify-center">
          Select PDF:
          </label>
          <select 
          className="font-semibold px-2 py-2 text-center flex mx-auto"
          value={pdfId} 
          onChange={(e) => setPdfId(e.target.value)}>
            <option 
            className="font-bold"
            value="" disabled>
              Select PDF
            </option>
            {userPdfs.map((pdf) => (
              <option 
              className="font-bold text-red-400"
              key={pdf._id} value={pdf._id}>
                {pdf.fileName}
              </option>
            ))}
          </select>
      
      </div>
      <div className="flex flex-col px-4 items-center justify-center">
        <label className="font-semibold self-center text-sm  md:text-lg">
          Enter Page Numbers (comma-separated):
        </label>
          <input
            placeholder="eg : 1,3,4"
            className="bg-gray-200 font-semibold px-1 py-1 text-center w-[16rem]"
            type="text"
            value={selectedPages}
            onChange={(e) => setSelectedPages(e.target.value)}
          />
      </div>
      
        <button 
        className="bg-[#9747FF] text-white font-bold px-7 py-2 rounded-xl hover:bg-red-400  self-center  "
        onClick={handleExtractPages}>Extract Pages</button>
      
      {extractedPdf && (
        
          
          <button 
          className="bg-[#9747FF] text-white font-bold  py-2 rounded-xl hover:bg-red-400 w-[15rem]  place-self-center "
          onClick={handleDownload}>
            Download Extracted PDF
          </button>
        
      )}
    </div>
  );
};

export default ExtractPages;
