import { useCallback, useEffect, useRef, useState } from "react";

// Hooks
import useCore from "@/hooks/useCore";

// Components
import Section, { type SectionProps } from "@/components/section";
import Table from "@/components/table";
import Loading from "@/components/loading";

// Icons
import { FunnelIcon } from "@heroicons/react/20/solid";

interface Props extends SectionProps {
  reset: () => void;
  id: string;
}

/** Manages the XLSX File after getting available */
const FileManager = ({ sheets }: { sheets: string[] }) => {
  const hydratedRef = useRef(false);

  const [isProcessing, setIsProcessing] = useState(true);
  const [rows, setRows] = useState<string[][] | null>(null);
  const [page] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [activeSheet, setActiveSheet] = useState(sheets[0]);

  const { wasm } = useCore();

  const hydrateContent = useCallback(
    async (sheet: string) => {
      if (sheet === activeSheet && hydratedRef.current) return;

      // Settings processing states
      setIsProcessing(true);
      setActiveSheet(sheet);

      // Getting the rows from the new sheet
      const { rows, successful, totalPages } = await wasm.getRows({
        page,
        sheet,
      });

      // Setting the updated value
      if (successful) {
        setTotalPages(totalPages);
        setRows(rows);
      } else {
        window.alert("Something went wrong!");
      }

      setIsProcessing(false);
    },
    [activeSheet, page, wasm]
  );

  // Hydrates the file manager after the initial load
  useEffect(() => {
    if (hydratedRef.current) return;

    hydrateContent(sheets[0]);

    hydratedRef.current = true;
  });

  return (
    <div
      data-is-processing={isProcessing}
      className="relative data-[is-processing=true]:pointer-events-none"
    >
      {isProcessing === true && (
        <div className="-inset-4 absolute bg-neutral-50/50 dark:bg-neutral-950/50 backdrop-blur-sm flex justify-center items-center">
          <Loading className="w-8 h-8" />
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between gap-4 my-4">
        <div
          className={[
            "flex",
            "gap-2",
            "justify-start",
            "items-center",
            "bg-neutral-100/75",
            "dark:bg-neutral-900/50",
            "border",
            "border-neutral-200",
            "dark:border-transparent",
            "p-1",
            "rounded-2xl",
            "max-w-full",
            "overflow-auto",
            "flex-shrink-0",
            "md:max-w-[50vw]",
          ].join(" ")}
        >
          {sheets.map((sheet) => (
            <button
              className="py-1.5 px-5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:data-[active=false]:bg-neutral-200 dark:hover:data-[active=false]:bg-neutral-800 data-[active=true]:bg-sky-100 dark:data-[active=true]:bg-sky-900/25 transition-colors duration-200 disabled:pointer-events-none disabled:opacity-80"
              onClick={hydrateContent.bind(null, sheet)}
              key={sheet}
              data-active={sheet === activeSheet}
              disabled={rows === null}
            >
              {sheet}
            </button>
          ))}
        </div>
        <div>
          <button
            disabled
            className="ml-auto flex gap-2 py-2.5 px-6 rounded-2xl justify-center items-center bg-neutral-100 dark:bg-neutral-900 [&:not(:disabled):hover]:bg-neutral-200 dark:[&:not(:disabled):hover]:bg-neutral-800 disabled:opacity-50"
          >
            <FunnelIcon className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>
      <div>
        {rows ? (
          <>
            <Table page={page} rows={rows} sheet={activeSheet} />
            <p className="my-2 text-sm opacity-75 text-center">
              Page {page + 1} of {totalPages} pages
            </p>
          </>
        ) : (
          <div className="py-6 flex justify-center items-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

/** The Section to interact with the Spreadsheet file */
const FileInterface = ({ id, isActive, isVisible }: Props) => {
  const { file, wasm } = useCore();
  const [sheets, setSheets] = useState<string[] | null>(null);

  useEffect(() => {
    if (file.info !== null) {
      wasm
        .getSheets()
        .then(({ sheets, successful }) => successful && setSheets(sheets));
    }
  }, [file.info, wasm]);

  return (
    <Section id={id} isActive={isActive} isVisible={isVisible}>
      {file.info && (
        <p className="grid gap-2">
          <span className="text-3xl font-serif">{file.info!.name}</span>
          <span className="text-xs opacity-85">
            {(file.info!.size / 1_000_000).toFixed(2)}mg
          </span>
        </p>
      )}
      {sheets && <FileManager sheets={sheets} />}
    </Section>
  );
};

export default FileInterface;
