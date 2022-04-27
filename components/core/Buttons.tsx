import React, { useEffect, useRef, useState } from "react";
import cs from "classnames";

export interface IButtonProps extends React.ComponentPropsWithRef<"button"> {
  disabled?: boolean;
  size?: string;
  LeftIcon?: any;
  timer?: number;
  colorClasses?: string;
}

export const Button: React.FC<IButtonProps> = ({
  disabled = false,
  className,
  children,
  LeftIcon,
  colorClasses = "bg-gray-100 hover:bg-gray-300 text-black",
  timer,
  size = "medium",
  ...props
}) => {
  const common = cs(
    `relative text-sm font-medium rounded-md 
    transition cursor-pointer overflow-hidden whitespace-nowrap`,
    colorClasses,
    {
      "px-3": size === "medium",
      "px-2": size === "small",
      "py-2": size === "medium",
      "py-1": size === "small",
    }
  );
  const disabledCS = cs("opacity-25");
  const iconWidth = 16;
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonRef}
      className={cs(common, className, {
        [disabledCS]: disabled,
      })}
      disabled={disabled}
      {...props}
    >
      <span className="relative flex items-center">
        {LeftIcon ? (
          <span className="transition-all">
            <LeftIcon
              style={{ width: iconWidth, height: iconWidth }}
              className={cs({
                "mr-2": !!children,
              })}
            />
          </span>
        ) : undefined}

        <span>{children}</span>
      </span>
    </button>
  );
};

export const ButtonPrimary: React.FC<IButtonProps> = (props: IButtonProps) => {
  return (
    <Button
      {...props}
      colorClasses="bg-indigo-700 hover:bg-indigo-500 text-white"
    />
  );
};

export const PlaceholderButton = () => {
  return (
    <div className="px-3 py-2 placeholder">
      <span className="opacity-0">Loading...</span>
    </div>
  );
};
