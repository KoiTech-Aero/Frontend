import type { ChangeEvent } from "react";

export interface inputFieldProps {
  label: string;
  type?: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}