import { type ReactNode, useEffect, useRef, useState } from "react";

import CoreContext, { type FileInfo } from "@/contexts/core";
import wasm from "@/wasm";

/** The Wrapper to share the core context to the rest of the react application */
const CoreProvider = ({ children }: { children: ReactNode }) => {
  const calledInitRef = useRef(false);
  const [initialized, setInitialized] = useState(false);
  const [fileInfo, setFileInfo] = useState<FileInfo>(null);

  useEffect(() => {
    if (calledInitRef.current) return;

    wasm.init().then(({ successful }) => {
      if (successful) {
        setInitialized(true);
        console.debug("XLSX Core module is initialized");
      }
    });

    calledInitRef.current = true;
  }, [initialized]);

  return (
    <CoreContext.Provider
      value={{
        initialized,
        file: { info: fileInfo, set: setFileInfo },
        wasm: { parseFile: wasm.parseFile },
      }}
    >
      {children}
    </CoreContext.Provider>
  );
};

export default CoreProvider;
