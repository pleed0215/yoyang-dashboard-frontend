import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/common/input-error';

interface LabelInputProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  errors?: string[];
}

export default function LabelInput({
  label,
  id,
  name,
  type,
  placeholder,
  required,
  defaultValue,
  errors,
}: LabelInputProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-foreground">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        className="focus:!ring-0"
      />
      <InputError errors={errors} />
    </div>
  );
}
