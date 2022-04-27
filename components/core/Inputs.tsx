import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid";
import { Fragment } from "react";

export const TextLabel: React.FC<React.HTMLProps<HTMLLabelElement>> = ({
  className = "",
  ...props
}) => {
  return (
    <label
      className={` text-sm mb-2 opacity-75 font-medium ${className}`}
      {...props}
    />
  );
};

export interface ITextInputProps
  extends React.ComponentPropsWithoutRef<"input"> {
  type?: "text" | "email" | "password";
}

const defaultInputStyles = `
rounded-md shadow-sm w-full
bg-white
border border-gray-300 focus:border-indigo-300 
focus:ring focus:ring-indigo-200 focus:ring-opacity-50
disabled:opacity-50
`;

export const TextInput: React.FC<ITextInputProps> = ({
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      className={`${className} ${defaultInputStyles}`}
      {...props}
    ></input>
  );
};

export const TextInputError = (props: any) => {
  return <p className="text-red-800 text-sm " {...props} />;
};

export interface SelectBoxProps {
  options: any[];
  value: string;
  onChange: (val: string) => void;
  renderOption?: (val: string) => any;
  renderValue?: (val: string) => any;
}

export const SelectBox = ({
  value,
  onChange,
  options,
  renderOption = (e) => e,
  renderValue = (e) => e,
}: SelectBoxProps) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button
          className={`${defaultInputStyles} relative py-2 pl-3 pr-10 text-left cursor-default`}
        >
          <span className="block truncate">{renderValue(value)}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, optionIndex) => (
              <Listbox.Option
                key={optionIndex}
                className={({ active }) =>
                  `${active ? "text-indigo-900 bg-indigo-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pr-10 pl-4`
                }
                value={option}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? "font-medium" : "font-normal"
                      } block truncate`}
                    >
                      {renderOption(option)}
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? "text-indigo-600" : "text-indigo-600"
                        } absolute inset-y-0 right-0 flex items-center pr-3`}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export const Checkbox: React.FC<React.HTMLProps<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      className="appearance-none h-5 w-5 border border-gray-300 rounded-md bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
      type="checkbox"
      {...props}
    />
  );
};
