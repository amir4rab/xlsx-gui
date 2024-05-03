import { type ChangeEventHandler, useCallback, useState } from "react";

// Hooks
import useCore from "@/hooks/useCore";

// Components
import Loading from "@/components/loading";
import Section, { type SectionProps } from "@/components/section";
import FileInput from "@/components/fileInput";

interface props extends SectionProps {
  onProgress: () => void;
}

/** A Section of main page which requests the XLSX file form the user */
const FilePicker = ({ onProgress, isActive, isVisible }: props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    initialized,
    wasm,
    file: { set: setFile },
  } = useCore();

  const fileHandlingError = useCallback(() => {
    setIsProcessing(false);
    window.alert(
      "Something wen't wrong while trying to process the file, please reload the page and try again!"
    );
  }, []);

  /** Handles the files after getting captured by the file input */
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (e) => {
      const { files } = e.target;

      // Getting the file
      if (files === null || files.length !== 1) return;
      const file = files[0];

      setIsProcessing(true);
      const { successful } = await wasm.parseFile(file);

      // Handling errors
      if (!successful) {
        fileHandlingError();
        return;
      }

      // Setting files info to the global context
      setFile({
        name: file.name,
        size: file.size,
        reducedTo: file.size,
      });

      onProgress();
      requestAnimationFrame(() => setIsProcessing(false));
    },
    [fileHandlingError, wasm, setFile, onProgress]
  );

  return (
    <Section isVisible={isVisible} isActive={isActive}>
      <h3 className="font-serif text-3xl font-[400]">File Picker</h3>
      <>
        {initialized ? (
          <>
            <FileInput isProcessing={isProcessing} onChange={onChange} />
            <span className="text-xs text-center block my-2 opacity-75">
              Keep in mind larger files take more time to process!
            </span>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center py-12">
            <Loading className="w-10 h-10 mb-2" />
            <span className="text-sm opacity-90">Loading Modules</span>
          </div>
        )}
      </>
    </Section>
  );
};

export default FilePicker;
