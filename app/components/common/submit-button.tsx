import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
  loadingText?: string;
}

export const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  SubmitButtonProps
>(
  (
    {
      loading = false,
      className,
      loadingText = "Loading...",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        className={className}
        disabled={disabled || loading}
        ref={ref}
        type="submit"
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </Button>
    );
  }
);

SubmitButton.displayName = "SubmitButton";
