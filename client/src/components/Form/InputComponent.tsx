import { useState } from "react";

interface InputComponent {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  size: string;
  maxLength: number;
}

export const InputComponent = ({
  type,
  placeholder,
  onChange,
  name,
  size,
  maxLength,
}: InputComponent) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <>
      <label htmlFor={type} className="relative">
        <div
          className={`${
            isFocused
              ? "w-2 pointer-events-none h-full bg-lavender absolute"
              : "hidden"
          }
          `}
        ></div>

        <input
          type={type}
          className={`p-2 bg-input text-slate-100 shadow-md outline-none indent-2  ${size}`}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onChange}
          name={name}
          maxLength={maxLength}
        ></input>
      </label>
    </>
  );
};
