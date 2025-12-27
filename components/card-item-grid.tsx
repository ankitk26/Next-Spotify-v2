export default function CardItemGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid w-full grid-cols-5 items-stretch gap-5">
      {children}
    </div>
  );
}
