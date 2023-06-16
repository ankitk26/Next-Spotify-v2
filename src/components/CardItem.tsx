import { Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  images: any;
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
      <div className="p-4 transition duration-300 rounded cursor-pointer hover:bg-paper-secondary bg-paper">
        {images.length > 0 ? (
          <Image
            src={images[0].url}
            alt={altTitle}
            height={144}
            width={144}
            className={`object-cover w-full h-36 ${
              imageRounded ? "rounded-full" : "rounded"
            }`}
          />
        ) : (
          <div className="w-full h-40">
            <Music className="w-full h-full bg-paper " />
          </div>
        )}
        <h3 className="mt-5 font-bold truncate">{heading}</h3>
        {subheading && (
          <h6 className="text-sm truncate text-gray">{subheading}</h6>
        )}
      </div>
    </Link>
  );
}
