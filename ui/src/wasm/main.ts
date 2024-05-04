// ------------------------------------------ //
// ---------- Shared Values        ---------- //
// ------------------------------------------ //

let worker: Worker;
let blocked = false;

/** Commands for communication to the worker */
const commands = {
  init: "init",
  parse: "parse",
  getSheets: "get-sheets",
  getRows: "get-rows",
} as const;

// ------------------------------------------ //
// ---------- Init Operation       ---------- //
// ------------------------------------------ //

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

// ------------------------------------------ //
// ---------- Parsing Operation    ---------- //
// ------------------------------------------ //

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

// ------------------------------------------ //
// ---------- Rows Operation       ---------- //
// ------------------------------------------ //

export type GetRowsResponse = {
  err: string | null;
  successful: boolean;
  rows: string[][];
  totalPages: number;
};

export type GetRows = (props: {
  sheet: string;
  page: number;
}) => Promise<GetRowsResponse>;

const getRows: GetRows = ({ page, sheet }) =>
  new Promise((res) => {
    // Checking if the worker isn't initialized or there are other processes happening at the same time
    if (worker === null || blocked) return;
    blocked = true;

    // Passing the message to the worker
    worker.postMessage({ command: commands.getRows, data: { page, sheet } });

    // Handles the responses to init message
    const handleInit = (e: MessageEvent) => {
      // Parsing the response
      const { command, successful, data } = e.data as {
        command: string;
        successful: boolean;
        data: { rows: string[][]; totalPages: number };
      };

      console.log(data);

      // Checking the response
      if (command === commands.getRows && successful) {
        res({ err: null, successful: true, ...data });
      } else if (command === commands.getRows && !successful) {
        res({ err: null, successful: false, rows: [], totalPages: 0 });
      }

      // cleanup
      worker.removeEventListener("message", handleInit);
      blocked = false;
    };

    worker.addEventListener("message", handleInit);
  });

// ------------------------------------------ //
// ---------- Sheets Operation     ---------- //
// ------------------------------------------ //

export type GetSheetsResponse = {
  err: string | null;
  successful: boolean;
  sheets: string[];
};

export type GetSheets = () => Promise<GetSheetsResponse>;

const getSheets: GetSheets = () =>
  new Promise((res) => {
    // Checking if the worker isn't initialized or there are other processes happening at the same time
    if (worker === null || blocked) return;
    blocked = true;

    // Passing the message to the worker
    worker.postMessage({ command: commands.getSheets, data: {} });

    // Handles the responses to init message
    const handleInit = (e: MessageEvent) => {
      // Parsing the response
      const { command, successful, data } = e.data as {
        command: string;
        successful: boolean;
        data: { sheets: string[] };
      };

      // Checking the response
      if (command === commands.getSheets && successful) {
        res({ err: null, successful: true, ...data });
      } else if (command === commands.getSheets && !successful) {
        res({ err: null, successful: false, sheets: [] });
      }

      // cleanup
      worker.removeEventListener("message", handleInit);
      blocked = false;
    };

    worker.addEventListener("message", handleInit);
  });

// ------------------------------------------ //
// ---------- Exports              ---------- //
// ------------------------------------------ //

export default { init, parseFile, getRows, getSheets };
