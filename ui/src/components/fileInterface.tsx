import Section, { type SectionProps } from "@/components/section";

// Hooks
import useCore from "@/hooks/useCore";

interface Props extends SectionProps {
  reset: () => void;
  id: string;
}

/** The Section to interact with the Spreadsheet file */
const FileInterface = ({ id, isActive, isVisible }: Props) => {
  const { file } = useCore();

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
    </Section>
  );
};

export default FileInterface;
