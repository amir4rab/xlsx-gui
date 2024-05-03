import { useState } from "react";

// Components
import CoreProvider from "@/components/core";
import Hero from "@/components/hero";
import FilePicker from "@/components/filePicker";
import FileInterface from "@/components/fileInterface";

function App() {
  const [activeStage, setActiveState] = useState<
    "hero" | "filePicker" | "fileInterface"
  >("hero");

  return (
    <CoreProvider>
      <header>
        <h1 className="font-serif my-0 text-6xl sm:text-8xl font-bold">
          Aurora
        </h1>
        <h2 className="my-0 mt-2 mb-6 font-light text-xl opacity-85 text-balance">
          Modify your SpreadSheets files with ease!
        </h2>
      </header>
      <Hero
        isActive={activeStage === "hero"}
        onProgress={setActiveState.bind(null, "filePicker")}
      />
      <FilePicker
        isActive={activeStage === "filePicker"}
        isVisible={
          activeStage === "filePicker" || activeStage === "fileInterface"
        }
        onProgress={setActiveState.bind(null, "fileInterface")}
      />
      <FileInterface
        isActive={activeStage === "fileInterface"}
        isVisible={activeStage === "fileInterface"}
        id="fileInterface"
        reset={() => {}}
      />
    </CoreProvider>
  );
}

export default App;
