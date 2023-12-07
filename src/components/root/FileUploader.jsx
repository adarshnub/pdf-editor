

import { useRef, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const FileUploader = ({ handleFile, removeFile }) => {
  const [showUpload, setShowUpload] = useState(true);
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setShowUpload(false);
    handleFile(fileUploaded);
  };

  const handleRemove = () => {
    setShowUpload(true);
    removeFile();
  };

  return (
    <>
      {showUpload ? (
        <button
          type="button"
          className="button-upload bg-[#9747FF] flex justify-around w-[120px] text-[14px] rounded-[8px] p-[8px] gap-[4px] border border-[#9747FF] text-white items-center cursor-pointer"
          onClick={handleClick}
        >
          <HiOutlineUpload />
          Upload
        </button>
      ) : (
        <button
          className="flex justify-around font-[500] w-[120px] text-[14px] rounded-[8px] p-[8px] gap-[4px] border-2 border-[#FF0000] text-[#FF0000] items-center cursor-pointer"
          onClick={handleRemove}
        >
          <IoMdClose />
          <span>Remove</span>
        </button>
      )}

      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }}
        className="w-full"
        
      />
    </>
  );
};


export default FileUploader;