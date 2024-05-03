import Guide from "./guide";

// Icons
import { SparklesIcon } from "@heroicons/react/16/solid";

// Components
import Section, { type SectionProps } from "@/components/section";

interface props extends SectionProps {}

/** The Hero component to be displayed on top of the page */
const Hero = ({ isActive, onProgress }: props) => {
  return (
    <Section isActive={isActive} isVisible={true}>
      <Guide />
      <div className="flex justify-end mt-6">
        <button
          onClick={onProgress}
          className="rounded-2xl flex justify-center items-center gap-2 bg-neutral-100 dark:bg-neutral-900 hover:bg-sky-800 [&:hover_span]:text-white dark:hover:bg-neutral-800 [&:hover_svg]:fill-yellow-200 transition-colors duration-300 py-3 px-8 font-serif font-[500]"
        >
          <span className="text-lg text-black dark:text-white transition-colors duration-300">
            Lets Start
          </span>
          <SparklesIcon className="w-5 h-5 text-black dark:text-white transition-colors duration-300" />
        </button>
      </div>
    </Section>
  );
};

export default Hero;
