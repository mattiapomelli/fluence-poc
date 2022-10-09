import cx from "classnames";
import { forwardRef, InputHTMLAttributes, ReactNode, Ref, useId } from "react";

const iconClass =
  "absolute top-1/2 transform -translate-y-1/2 [&>svg]:max-w-min";

const variantClassName = {
  solid: "bg-base-300",
  bordered: "border-2 border-base-300 bg-transparent",
  ghost: "input-ghost disabled:bg-transparent",
};

const sizeClassName = {
  xs: "input-xs min-w-[4.55rem] h-7 px-2.5",
  sm: "input-sm min-w-[5.2rem] h-8 px-3",
  md: "min-w-[6.5rem] h-10 px-4",
  lg: "input-lg min-w-[7.8rem] h-12 px-5",
};

const iconSizeClassName = {
  xs: "[&>svg]:max-h-4",
  sm: "[&>svg]:max-h-4",
  md: "[&>svg]:max-h-6",
  lg: "[&>svg]:max-h-6",
};

export interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: keyof typeof variantClassName;
  size?: keyof typeof sizeClassName;
  placeholder?: string;
  label?: string;
  topRightLabel?: string;
  bottomLeftLabel?: string;
  bottomRightLabel?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  block?: boolean;
  error?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}

export type InputProps = BaseInputProps & {
  ref?: Ref<HTMLInputElement>;
};

export const Input = forwardRef(
  (
    {
      variant = "solid",
      size = "md",
      placeholder,
      label,
      topRightLabel,
      bottomLeftLabel,
      bottomRightLabel,
      leftIcon,
      rightIcon,
      disabled,
      block,
      error,
      className,
      onValueChange,
      onChange: baseOnChange,
      ...props
    }: InputProps,
    ref?: Ref<HTMLInputElement>,
  ) => {
    const id = useId();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      onValueChange?.(value);
      baseOnChange?.(event);
    };

    return (
      <div
        className={cx("form-control relative", { "w-full": block }, className)}
      >
        {(label || topRightLabel) && (
          <label className="label mb-1 cursor-pointer py-0" htmlFor={id}>
            {label && <span className="label-text font-medium">{label}</span>}
            {topRightLabel && (
              <span className="label-text font-medium text-base-content">
                {topRightLabel}
              </span>
            )}
          </label>
        )}
        {leftIcon && (
          <span
            className={cx(
              iconClass,
              iconSizeClassName[size],
              "left-3 text-base-content-neutral",
            )}
          >
            {leftIcon}
          </span>
        )}
        <input
          {...props}
          id={id}
          ref={ref}
          disabled={disabled}
          onChange={handleChange}
          placeholder={placeholder}
          className={cx(
            "input",
            "focus:border-inherit",
            "text-base-content",
            "placeholder:text-base-content-neutral",
            "focus:outline-none focus:ring-4",
            "w-full",
            variantClassName[variant],
            sizeClassName[size],
            { "pl-11": leftIcon },
            { "pr-11": rightIcon },
            { "border-2 border-error focus:ring-error": error },
            error ? "focus:ring-error/30" : "focus:ring-primary/30",
          )}
        />
        {rightIcon && (
          <span
            className={cx(
              iconClass,
              iconSizeClassName[size],
              "right-3 text-base-content-neutral",
            )}
          >
            {rightIcon}
          </span>
        )}
        {(bottomLeftLabel || bottomRightLabel) && (
          <label className="label mt-1 py-0">
            {bottomLeftLabel && (
              <span className="label-text font-medium text-base-content">
                {bottomLeftLabel}
              </span>
            )}
            {bottomRightLabel && (
              <span className="label-text font-medium text-base-content">
                {bottomRightLabel}
              </span>
            )}
          </label>
        )}
        {error && (
          <label className="label mt-1 py-0">
            <span className="label-text text-error">{error}</span>
          </label>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
