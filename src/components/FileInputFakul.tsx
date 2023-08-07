import React from "react";

interface Link {
  link: string;
}

interface FileInputProps {
  fileInputLink: Link;
  onFileSelect: (field: keyof Link, value: string) => void;
}

const FileInputFakul: React.FC<FileInputProps> = ({
  fileInputLink,
  onFileSelect,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      const fileLink = URL.createObjectURL(selectedFile);
      onFileSelect("link", fileLink);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-5">
      <h4>Read JSON File for Fakul</h4>
      <input type="file" accept=".json" onChange={handleFileChange} />
      {fileInputLink.link && <p>Selected File: {fileInputLink.link}</p>}
    </div>
  );
};

export default FileInputFakul;
