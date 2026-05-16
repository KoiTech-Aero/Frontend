import type { ChangeEvent } from "react";

export interface textAreaFieldProps {
  label: string;
  value: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}