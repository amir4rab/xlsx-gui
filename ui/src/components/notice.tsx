import { ReactNode } from "react";

interface NoticeProps {
  title: string;
  text: string;
  icon: ReactNode;
  type?: "notice" | "warning" | "danger";
}

/** Notice Components to be used in different parts of the application to notify the user from specific informations */
const Notice = ({ icon, text, title, type = "notice" }: NoticeProps) => {
  return (
    <div
      data-type={type}
      className={[
        "px-8",
        "py-6",
        "my-8",
        "rounded-2xl",
        "border",
        "data-[type=notice]:bg-sky-200/10",
        "dark:data-[type=notice]:bg-sky-900/10",
        "data-[type=notice]:border-sky-200",
        "dark:data-[type=notice]:border-sky-900",
        "data-[type=warning]:bg-yellow-200/10",
        "dark:data-[type=warning]:bg-yellow-900/10",
        "data-[type=warning]:border-yellow-200",
        "dark:data-[type=warning]:border-yellow-900",
        "data-[type=danger]:bg-red-200/10",
        "dark:data-[type=danger]:bg-red-900/10",
        "data-[type=danger]:border-red-200",
        "dark:data-[type=danger]:border-red-900",
      ].join(" ")}
    >
      <div className="flex gap-2 mb-3 justify-start items-center">
        {icon}
        <p className="my-0 font-serif text-xl">{title}</p>
      </div>
      <p className="my-0 text-sm md:text-base font-extralight leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default Notice;
