import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";
import { AlertErrorIcon, AlertSuccessIcon, AlertWarningIcon, IconProps } from "@/assets/icons";

const alertVariants = cva(
  "flex items-center gap-5 w-full rounded-[10px] border-l-6 dark:bg-opacity-30 p-[8px] ",
  {
    variants: {
      variant: {
        success: "border-green bg-green-light-7 dark:bg-[#1B1B24]",
        warning: "border-[#FFB800] bg-[#FEF5DE] dark:bg-[#1B1B24]",
        error: "border-red-light bg-red-light-5 dark:bg-[#1B1B24]",
      },
    },
    defaultVariants: {
      variant: "error",
    },
  },
);

const icons = {
  error: AlertErrorIcon,
  success: AlertSuccessIcon,
  warning: AlertWarningIcon,
};

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  show: boolean,
  variant: "" | "error" | "success" | "warning";
  title: string;
  description?: string;
};

const Alert = ({
  className,
  show,
  variant,
  title,
  description,
  ...props
}: AlertProps) => {
  let IconComponent: React.ComponentType<IconProps> | null = null;
  if (variant === "error" || variant === "success" || variant === "warning") {
  IconComponent = icons[variant];
  }
  if(!show) return null;
  return (
    <div className="absolute top-0 right-0 lg:w-[400px] w-[300px] md:w-[400px] mt-[10px] me-[10px]">
    <div
      role="alert"
      className={cn(alertVariants({ variant :variant || undefined }), className)}
      {...props}
    >
      {IconComponent  && <IconComponent />}

      <div className="w-full">
        <h5
          className={cn("font-bold m-0 p-0", {
            "text-[#004434] dark:text-[#34D399]": variant === "success",
            "text-[#9D5425]": variant === "warning",
            "text-[#BC1C21]": variant === "error",
          })}
        >
          {title}
        </h5>

        <div
          className={cn({
            "text-[#637381]": variant === "success",
            "text-[#D0915C]": variant == "warning",
            "text-[#CD5D5D]": variant === "error",
          })}
        >
          {description}
        </div>
      </div>
    </div>
    </div>
  );
};

export { Alert, type AlertProps };
