import { useState } from "react";
import {uploadToCloudinary} from "../../../utils/upload"
export function DocumentUpload({ data, updateData }) {
  const [documents, setDocuments] = useState(data || {});
  const [uploadStatus, setUploadStatus] = useState({});

  const handleFileUpload = async (event, docType) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadStatus((prev) => ({ ...prev, [docType]: "Uploading..." }));
    
    const fileUrl = await uploadToCloudinary(file);
    console.log(fileUrl)
    if (fileUrl) {
      const newDocuments = { ...documents, [docType]: fileUrl };
      setDocuments(newDocuments);
      updateData(newDocuments);
      setUploadStatus((prev) => ({ ...prev, [docType]: "Uploaded successfully!" }));
    } else {
      setUploadStatus((prev) => ({ ...prev, [docType]: "Upload failed!" }));
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Document Upload</h2>

      {["idProof", "addressProof", "incomeProof"].map((docType, index) => (
        <div key={index} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 capitalize">
            {docType.replace(/([A-Z])/g, " $1")}
          </label>
          
          <input type="file" onChange={(e) => handleFileUpload(e, docType)} />

          {uploadStatus[docType] && <p className="text-blue-600">{uploadStatus[docType]}</p>}
          
          {documents[docType] && (
            <p className="text-green-600">
              Uploaded: <a href={documents[docType]} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">View File</a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
