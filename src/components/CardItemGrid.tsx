interface Props {
  children: React.ReactNode;
}

export default function CardItemGrid({ children }: Props) {
  return <div className="grid grid-cols-6 gap-6">{children}</div>;
}
