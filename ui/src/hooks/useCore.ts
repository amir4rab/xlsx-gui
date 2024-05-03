import { useContext } from "react";
import CoreContext from "@/contexts/core";

/** Provides the methods to use the XLSX wasm bindings */
const useCore = () => useContext(CoreContext);

export default useCore;
