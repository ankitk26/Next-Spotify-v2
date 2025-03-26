import { Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  images?: {
    url: string;
  }[];
  id: string;
  altTitle: string;
  heading: string;
  subheading?: string;
  imageRounded?: boolean;
  type: string;
}

export default function CardItem({
  images,
  id,
  altTitle,
  heading,
  subheading,
  imageRounded = false,
  type,
}: Props) {
  // Render content with or without link based on type
  const Content = () => (
    <div className="h-full p-4 transition duration-300 rounded-lg cursor-pointer hover:bg-neutral-950 bg-neutral-900">
      {images && images.length > 0 ? (
        <Image
          src={images[0].url}
          alt={altTitle}
          height={160}
          width={160}
          className={`aspect-square object-cover w-full ${
            imageRounded ? "rounded-full" : "rounded-md"
          }`}
        />
      ) : (
        <div className="w-full h-40">
          <Music className="w-full h-full bg-neutral-600" />
        </div>
      )}
      <h3 className="mt-5 font-bold truncate">{heading}</h3>
      {subheading && (
        <h6 className="mt-1 text-xs font-semibold truncate text-neutral-500">
          {subheading}
        </h6>
      )}
    </div>
  );

  // Conditionally wrap with Link or return plain content
  return type === "categories" ? (
    <Content />
  ) : (
    <Link href={`/${type}/${id}`}>
      <Content />
    </Link>
  );
}
