import React from "react";
import { cn } from "~/lib/utils";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: string | string[];
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export const LabelInput = React.forwardRef<HTMLInputElement, LabelInputProps>(
  (
    {
      label,
      errors,
      className,
      labelClassName,
      inputClassName,
      ...props
    },
    ref
  ) => {
    // Convert errors to array if it's a string
    const errorMessages = errors 
      ? (typeof errors === 'string' ? [errors] : errors) 
      : [];

    const hasErrors = errorMessages.length > 0;

    return (
      <div className={cn("space-y-2", className)}>
        <Label
          htmlFor={props.id}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            labelClassName
          )}
        >
          {label}
        </Label>
        <Input
          className={cn(
            hasErrors && "border-red-500 focus-visible:ring-red-500",
            inputClassName
          )}
          ref={ref}
          aria-invalid={hasErrors}
          {...props}
        />
        {hasErrors && (
          <div className="text-sm text-red-500 space-y-1">
            {errorMessages.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
    );
  }
);

LabelInput.displayName = "LabelInput";
