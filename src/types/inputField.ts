import type { ChangeEvent } from "react";

export interface inputFieldProps {
  label: string;
  icon?: React.ReactNode;
  type?: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}