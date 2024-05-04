import type { Dispatch, SetStateAction } from "react";
import type { GetRows, ParseFile, GetSheets } from "@/wasm/main";

import { createContext } from "react";
import wasm from "@/wasm";

export type FileInfo = null | {
  name: string;
  size: number;
  reducedTo: number;
};

interface CoreContext {
  initialized: boolean;
  wasm: {
    parseFile: ParseFile;
    getRows: GetRows;
    getSheets: GetSheets;
  };
  file: {
    info: FileInfo;
    set: Dispatch<SetStateAction<FileInfo>>;
  };
}

/** Facilitates the access of XLSX bindings to the rest of the react project */
const CoreContext = createContext<CoreContext>({
  initialized: false,
  wasm: {
    parseFile: wasm.parseFile,
    getRows: wasm.getRows,
    getSheets: wasm.getSheets,
  },
  file: {
    info: null,
    set: () => {},
  },
});

export default CoreContext;
