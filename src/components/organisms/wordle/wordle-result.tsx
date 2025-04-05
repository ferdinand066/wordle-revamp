/* This example requires Tailwind CSS v2.0+ */
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import axios from "axios";
import clsx from "clsx";
import { FC, Fragment, useEffect, useState } from "react";
import { useGameCondition } from "../../../stores/use-game-condition";

type WordleResult = {
  result: string | undefined;
};

const getShadowColor = (win?: boolean): string => {
  if (win === undefined) return "";
  if (!win) return "shadow-red-300";

  return "shadow-green-300";
};

const WordleResult: FC<WordleResult> = ({ result }) => {
  const [open, setOpen] = useState(false);
  const { win } = useGameCondition();
  const [wordDefinition, setWordDefinition] = useState<WordDefinitionProps>();

  useEffect(() => {
    if (win === undefined) {
      // wait for 2 second  first
      setOpen(false);
      return;
    }

    const timeout = setTimeout(() => {
      setOpen(true);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [win]);

  useEffect(() => {
    async function fetchWordDefinition() {
      try {
        const dictionaryResult = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${result}`
        );
        setWordDefinition(dictionaryResult?.data[0] as WordDefinitionProps);
      } catch (error) {
        console.error("Failed to fetch word definition", error);
        setWordDefinition(undefined); // fallback or show a message
      }
    }

    if (result) {
      fetchWordDefinition();
    }
  }, [result]);

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
            <div
              className={clsx(
                `relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-lg transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`,
                getShadowColor(win)
              )}
            >
              <div>
                <div className="mt-3 text-start">
                  <DialogTitle
                    as="h2"
                    className="text-3xl leading-10 font-medium text-gray-900"
                  >
                    {result}
                  </DialogTitle>
                  <span className="text-xl">{wordDefinition?.phonetic}</span>
                  <div className="w-full border-t border-gray-300 mt-2"></div>
                  <div className="mt-2 flex flex-col gap-2 text-gray-500">
                    {(wordDefinition?.meanings ?? []).map((meaning, index) => {
                      return (
                        <div key={index} className="flex flex-col">
                          <span>{meaning.partOfSpeech}</span>
                          <div className="ml-2">
                            {meaning.definitions?.map((definition, index) => {
                              return (
                                <div
                                  className="flex flex-col text-sm"
                                  key={index}
                                >
                                  <span>
                                    {index + 1}. {definition.definition}
                                  </span>
                                  <span className="ml-6">
                                    {definition.example}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                    window.location.reload();
                  }}
                >
                  Play again!
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WordleResult;
