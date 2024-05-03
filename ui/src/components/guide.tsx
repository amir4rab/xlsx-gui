import { useEffect, useRef, useState } from "react";

// Icons
import { LightBulbIcon } from "@heroicons/react/20/solid";

// Components
import FileInput from "@/components/fileInput";

interface GuiderProps {
  displayed: boolean;
}

const guides = [
  {
    title: "Upload Your File",
    id: "fileUpload",
    Guider: ({ displayed }: GuiderProps) => {
      const [mockP, setMockP] = useState(false);
      const timeoutRef = useRef<null | number>(null);

      // Resetting the mocked processing value
      useEffect(() => {
        if (!mockP || timeoutRef.current !== null) return;

        timeoutRef.current = setTimeout(() => {
          setMockP(false);
          timeoutRef.current = null;
        }, 3000) as unknown as number;
      }, [mockP]);

      return (
        <div
          data-displayed={displayed}
          onClick={setMockP.bind(null, true)}
          className="inset-0 data-[displayed=true]:translate-y-0 data-[displayed=false]:opacity-0 data-[displayed=false]:-translate-x-6 data-[displayed=false]:pointer-events-none transition-[transform,opacity] duration-300 p-10 relative h-full w-full"
        >
          <div className="mb-4 text-white">
            <p className="text-2xl md:text-3xl font-serif my-0 mb-2">
              Uploading your files
            </p>
            <p className="text-sm md:text-base font-light my-0 opacity-80">
              Simply select your files with the file selector
            </p>
          </div>
          <div className="absolute inset-0 translate-x-[20%] translate-y-[40%] w-full">
            <FileInput isProcessing={mockP} demo={true} />
          </div>
        </div>
      );
    },
  },
  {
    title: "Apply your actions",
    id: "applyActions",
    Guider: ({ displayed }: GuiderProps) => (
      <div data-displayed={displayed}></div>
    ),
  },
  {
    title: "Download your file",
    id: "fileDownload",
    Guider: ({ displayed }: GuiderProps) => (
      <div data-displayed={displayed}></div>
    ),
  },
];

/** Simple illustration of how to use the Aurora system */
const Guide = () => {
  const [slide, setSlide] = useState<string>("fileUpload");

  return (
    <div className="mt-10 mb-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="inline-block bg-neutral-900 text-neutral-100 rounded-xl p-2.5">
          <LightBulbIcon className="w-4 h-4" />
        </div>
        <h3 className="text-xl my-0 font-[400]">How to use Aurora?</h3>
      </div>
      <div className="grid md:grid-cols-[36%,1fr] gap-6">
        <div className="flex overflow-x-auto max-w-full md:justify-between md:flex-col gap-3 md:py-4">
          {guides.map(({ id, title }, i) => (
            <button
              key={id + "-slide"}
              data-active={id === slide}
              onClick={setSlide.bind(null, id)}
              className="md:hover:-translate-y-0.5 shadow-md shadow-neutral-900/5 data-[active=true]:bg-sky-100 dark:data-[active=true]:bg-sky-950 text-left py-5 md:py-8 px-6 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-[background,transform] duration-200 font-serif whitespace-nowrap"
            >
              <span className="text-xs block mb-1 font-semibold leading-none opacity-75">
                {`Step ${i + 1}`}
              </span>
              <span className="leading-none block text-sm md:text-lg">
                {title}
              </span>
            </button>
          ))}
        </div>
        <div className="h-[40vh] md:h-auto bg-neutral-900 rounded-3xl relative overflow-hidden md:my-4">
          {guides.map(({ id, Guider }) => (
            <Guider key={id + "-guider"} displayed={id === slide} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guide;
