interface Props {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function LibraryTypeTag({ active, onClick, children }: Props) {
  const activeStyles = "bg-white text-paper-700";
  const inactiveStyles = "bg-paper-600 hover:bg-paper-400 text-white";

  return (
    <button
      className={`py-2 px-3 transition-colors rounded-full ${
        active ? activeStyles : inactiveStyles
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
