import type { DetailedHTMLProps, HTMLAttributes } from "react";

/** Interface of Section Wrapper components */
export interface SectionProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  isActive?: boolean;
  isVisible?: boolean;
}

/** Should be used as a Wrapper to animate the different sections of the homepage */
const Section = ({
  isActive = true,
  isVisible = true,
  className = "",
  children,
  ...props
}: SectionProps) => {
  return (
    <section
      data-is-visible={isVisible}
      data-is-active={isActive}
      className={
        "mt-2 mb-24 data-[is-active=false]:opacity-25 data-[is-active=false]:select-none data-[is-active=false]:pointer-events-none data-[is-visible=false]:translate-y-4 data-[is-visible=false]:opacity-0 data-[is-visible=false]:max-h-0 transition-[opacity,transform] duration-500 " +
        className
      }
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
