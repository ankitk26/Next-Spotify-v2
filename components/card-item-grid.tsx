export default function CardItemGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grid items-stretch grid-cols-5">{children}</div>;
}
