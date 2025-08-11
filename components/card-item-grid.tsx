export default function CardItemGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grid grid-cols-5 items-stretch">{children}</div>;
}
