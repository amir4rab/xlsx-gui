// import wasmURL from "/wasm/xlsx-core.wasm?url";

let worker: Worker;
let blocked = false;

/** Commands for communication to the worker */
const commands = {
  init: "init",
  parse: "parse",
} as const;

type InitResponse = {
  successful: boolean;
  err: string | null;
};

/** Initializes the wasm module and moves it into a worker */
const init = () =>
  new Promise<InitResponse>((res) => {
    if (worker !== undefined) {
      res({ err: "already-initialized", successful: false });
      return;
    }

    worker = new Worker(new URL("/wasm/worker.js", import.meta.url));
    worker.postMessage({ command: commands.init, data: null });

    // Handles the responses to init message
    const handleInit = (e: MessageEvent) => {
      // Parsing the response
      const { command, successful } = e.data as {
        command: string;
        successful: boolean;
      };

      // Checking the response
      if (command === commands.init && successful) {
        res({ err: null, successful: true });
      }
      if (command === commands.init && !successful) {
        res({ err: null, successful: false });
      }

      // cleanup
      worker.removeEventListener("message", handleInit);
    };

    worker.addEventListener("message", handleInit);
  });

export type ParseFileResponse = {
  successful: boolean;
  err: string | null;
  fileSize: number;
};

export type ParseFile = (file: File) => Promise<ParseFileResponse>;

/** Validates the XLSX files and sends them to the web worker for processing */
const parseFile: ParseFile = (file) =>
  new Promise<ParseFileResponse>((res) => {
    // Checking if the worker isn't initialized or there are other processes happening at the same time
    if (worker === null || blocked) return;
    blocked = true;

    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      // Validating the filetype
      window.alert("File type is not supported!");
      return;
    }

    // Validating the file extension
    if (!file.name.endsWith(".xlsx")) {
      window.alert("File type is not supported!");
      return;
    }

    worker.postMessage({ command: commands.parse, data: file });

    // Handles the responses to init message
    const handleInit = (e: MessageEvent) => {
      // Parsing the response
      const { command, successful, data } = e.data as {
        command: string;
        successful: boolean;
        data: { size: number };
      };

      // Checking the response
      if (command === commands.parse && successful) {
        res({ err: null, successful: true, fileSize: data.size });
      } else if (command === commands.parse && !successful) {
        res({ err: null, successful: false, fileSize: 0 });
      }

      // cleanup
      worker.removeEventListener("message", handleInit);
      blocked = false;
    };

    worker.addEventListener("message", handleInit);
  });

export default { init, parseFile };
