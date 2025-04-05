/* This example requires Tailwind CSS v2.0+ */
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
// import { CheckIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { useAppScore } from "../../../stores/use-game-information-store";

export default function WordleInstruction() {
  const { firstInstruction, setInstruction } = useAppScore();
  const open = firstInstruction.wordle;
  const setOpen = (val: boolean) => {
    setInstruction("wordle", val);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            {/* <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" /> */}
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full">
                  <i className="fa fa-question-circle hover:text-gray-800 cursor-pointer text-4xl text-yellow-400"></i>
                  {/* <CheckIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  /> */}
                </div>
                <div className="mt-3 text-start sm:mt-5">
                  <DialogTitle
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 text-center"
                  >
                    How to play Wordle
                  </DialogTitle>
                  <div className="mt-2 flex flex-col gap-2">
                    <p className="text-sm text-gray-500">
                      Each guess must be a valid five-letter word. Hit the enter
                      button to submit.
                    </p>
                    <p className="text-sm text-gray-500">
                      After each guess, the color of the tiles will change to
                      show how close your guess was to the word.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Play now!
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
