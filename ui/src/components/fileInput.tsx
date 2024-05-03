import type { ChangeEventHandler } from "react";

// Components
import Loading from "@/components/loading";

/** Styled file input */
const FileInput = ({
  isProcessing = false,
  onChange,
  demo = false,
}: {
  isProcessing?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  demo?: boolean;
}) => {
  return (
    <div>
      <label
        data-processing={isProcessing}
        data-demo={demo}
        className="w-full py-24 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 text-center hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-colors duration-200 hover:cursor-pointer shadow-xl shadow-neutral-900/5 flex justify-center items-center gap-2 data-[processing=true]:select-none data-[processing=true]:pointer-events-none data-[demo=true]:select-none data-[demo=true]:pointer-events-none bg-white dark:bg-neutral-950"
        htmlFor={"filePicker" + (demo ? "-demo" : "")}
      >
        {isProcessing ? (
          <>
            <Loading className="w-6 h-6" />
            <span className="text-sm font-serif leading-none">Processing</span>
          </>
        ) : (
          <span className="text-2xl md:text-3xl font-serif block my-1">
            Please select your file
          </span>
        )}
      </label>
      <input
        onChange={isProcessing ? undefined : onChange}
        accept=".xlsx"
        id={"filePicker" + (demo ? "-demo" : "")}
        type="file"
        className="hidden"
      />
    </div>
  );
};

export default FileInput;
