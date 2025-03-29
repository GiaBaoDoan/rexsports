import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const OrderUser = ({
  isEdit,
  value,
  label,
  icon,
  typeInput,
  onChange,
  name,
}: {
  isEdit: boolean;
  label: string;
  value?: string;
  icon: React.ReactNode;
  typeInput?: "input" | "text-area";
  name: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  const commonProps = {
    name,
    onChange,
    value,
    className: "w-[500px]",
    placeholder: `Nhập ${label.toLowerCase()}`,
  };

  return (
    <div className="flex gap-3 items-center mb-3 text-sm">
      <div className="flex items-center gap-3 w-32">
        {icon}
        <p>{label}:</p>
      </div>
      <div className="max-w-[500px]">
        {isEdit ? (
          typeInput === "text-area" ? (
            <Textarea {...commonProps} className="w-[500px] min-h-[100px]" />
          ) : (
            <Input {...commonProps} />
          )
        ) : (
          value
        )}
      </div>
    </div>
  );
};

export default OrderUser;
