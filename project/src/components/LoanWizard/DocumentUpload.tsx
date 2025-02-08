import { useState } from "react";

export function DocumentUpload({ data, updateData }) {
  const [documents, setDocuments] = useState(data || {});

  const handleFileUpload = (event, docType) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newDocuments = { ...documents, [docType]: reader.result };
        setDocuments(newDocuments);
        updateData(newDocuments);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Document Upload</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">ID Proof</label>
        <input type="file" onChange={(e) => handleFileUpload(e, "idProof")} />
        {documents.idProof && <p className="text-green-600">ID Proof uploaded</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Address Proof</label>
        <input type="file" onChange={(e) => handleFileUpload(e, "addressProof")} />
        {documents.addressProof && <p className="text-green-600">Address Proof uploaded</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Income Proof</label>
        <input type="file" onChange={(e) => handleFileUpload(e, "incomeProof")} />
        {documents.incomeProof && <p className="text-green-600">Income Proof uploaded</p>}
      </div>
    </div>
  );
}
