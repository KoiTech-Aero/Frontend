import type { formSectionProps } from "../../types/formSection";

export default function FormSection({
  children,
}: formSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {children}
    </div>
  );
}