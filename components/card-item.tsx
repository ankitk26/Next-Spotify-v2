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
  return (
    <Link href={`/${type}/${id}`}>
      <div className="h-full cursor-pointer rounded-lg bg-neutral-900 p-4 transition duration-300 hover:bg-neutral-950">
        {images && images.length > 0 ? (
          <Image
            alt={altTitle}
            className={`aspect-square w-full object-cover ${
              imageRounded ? "rounded-full" : "rounded-md"
            }`}
            height={160}
            src={images[0].url}
            width={160}
          />
        ) : (
          <div className="h-40 w-full">
            <Music className="h-full w-full bg-neutral-600" />
          </div>
        )}
        <h3 className="mt-5 truncate font-bold">{heading}</h3>
        {subheading && (
          <h6 className="mt-1 truncate font-semibold text-neutral-500 text-xs">
            {subheading}
          </h6>
        )}
      </div>
    </Link>
  );
}
