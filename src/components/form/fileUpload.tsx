import type { ChangeEvent } from "react";
import type { fileUploadProps } from "../../types/fileUpload";

import { Upload } from "lucide-react";

export default function FileUpload({ file, onChange }: fileUploadProps) {
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0] || null;

    onChange(selectedFile);
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-semibold text-lg">Arquivo</h1>

      <label
        className="
        relative
        border-2 border-dashed border-gray-300
        rounded-2xl
        p-10
        flex flex-col items-center justify-center
        gap-4
        cursor-pointer
        hover:bg-gray-50
        transition
      "
      >
        <Upload size={40} />

        <div className="text-center">
          <p className="font-medium">Selecione o arquivo</p>

          <p className="text-sm text-gray-500">PDF da norma</p>
        </div>

        {file && <p className="text-sm text-blue-600">{file.name}</p>}

        <input
          type="file"
          accept="application/pdf"
          required
          className="
          absolute inset-0
          opacity-0
          cursor-pointer
        "
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
