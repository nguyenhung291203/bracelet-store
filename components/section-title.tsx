type SectionTitleProps = {
  title: string;
  className?: string;
};

export default function SectionTitle({
  title,
  className = "",
}: SectionTitleProps) {
  return (
    <h2
      className={`
        text-md font-semibold
        px-4 py-3 rounded-lg
        bg-black text-white
        dark:bg-white dark:text-black
        ${className}
      `}
    >
      {title}
    </h2>
  );
}
