export interface fileUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
}