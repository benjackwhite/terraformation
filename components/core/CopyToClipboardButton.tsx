import { Popover, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useState } from "react";
import { RiFileCopyLine } from "react-icons/ri";
import { Button } from "./Buttons";

export type CopyToClipboardButtonProps = {
  text: string;
  children?: ReactNode;
};

export const CopyToClipboardButton = ({
  text,
  children,
}: CopyToClipboardButtonProps) => {
  const [showingToast, setShowingToast] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("written");
    });

    setShowingToast(true);

    setTimeout(() => {
      setShowingToast(false);
    }, 2000);
  };
  return (
    <span className="relative inline-block">
      <Button LeftIcon={RiFileCopyLine} onClick={() => copyToClipboard()}>
        {children}
      </Button>
      <Transition
        as={Fragment}
        show={showingToast}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-x-4 scale-95"
        enterTo="opacity-100 translate-x-0 scale-100 "
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-x-0 scale-100"
        leaveTo="opacity-0 translate-x-4 scale-95"
      >
        <div className="absolute z-50 p-2 bg-white shadow-lg border rounded-lg right-full top-0 mr-2 text-xs">
          Copied!
        </div>
      </Transition>
    </span>
  );
};
