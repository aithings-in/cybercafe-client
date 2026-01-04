interface ContentSectionProps {
  children?: React.ReactNode;
}

export default function ContentSection({ children }: ContentSectionProps) {
  return (
    <div className="wrap w-full">
      <section
        className="content w-full relative pt-[80px]"
        data-cursor-element-id="cursor-el-1"
      >
        {children}
      </section>
    </div>
  );
}
