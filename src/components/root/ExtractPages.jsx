import React,{useState} from 'react'
import { useContext } from 'react';
import PdfContext from "../../context/PdfContext";
import axios from 'axios';

const ExtractPages = () => {
    const [pdfId, setPdfId] = useState('');
    const[selectedPages, setSelectedPages] = useState('');
    const [extractedPdf, setExtractedPdf] = useState("");
    const {userPdfs} = useContext(PdfContext);

    const handleExtractPages = async () => {
        try{
            const response = await axios.post("http://localhost:3001/extract-pages",
            {pdfId ,
            selectedPages:selectedPages.split(",").map((page)=> parseInt(page)),},
            { withCredentials: true});

            if (response.status ===200) {
                setExtractedPdf(response.data);
                console.log("pages extracted successfully");
            }else {
                console.error('error while extracting pages',error);            }
        } catch(error) {
            console.error(error,'error extracting pages 2');
            if(error.response) {
                console.error("Server responded with error:", error.response.data);
            }
        }
    }

    //handle pdf -Download using blob object
    const handleDownload = () => {
        const blob = new Blob([Buffer.from(extractedPdf,'base64')],{
            type: 'application/pdf',
        })
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'extracted.pdf';
        link.click();
    }

  return (
    <div>
       <h2>Extract Pages from PDF</h2>
      <div>
        <label>
          Select PDF:
          <select value={pdfId} onChange={(e) => setPdfId(e.target.value)}>
            <option value="" disabled>
              Select PDF
            </option>
            {userPdfs.map((pdf) => (
              <option key={pdf._id} value={pdf._id}>
                {pdf.fileName}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Enter Page Numbers (comma-separated):
          <input
            type="text"
            value={selectedPages}
            onChange={(e) => setSelectedPages(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleExtractPages}>Extract Pages</button>
      </div>
      {extractedPdf && (
        <div>
          <h3>Extracted PDF:</h3>
          <button onClick={handleDownload}>Download Extracted PDF</button>
        </div>
      )}
    </div>
  )
}

export default ExtractPages