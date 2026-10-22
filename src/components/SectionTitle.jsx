function SectionTitle({ children }) {
  return (
    <div className="mb-12 flex items-center justify-start text-xl font-bold min-[501px]:text-[30px]">
      <p className="mr-5 whitespace-nowrap">{children}</p>
      <div className="h-px w-[200px] border border-black/30 bg-black opacity-30 min-[801px]:w-[300px]" />
    </div>
  );
}

export default SectionTitle;
