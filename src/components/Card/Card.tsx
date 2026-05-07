import { cN } from "@/lib"
import { type ICard } from "@/types"
import Image from "next/image"

interface ICardProps {
  image: ICard["image"]
  title?: ICard["title"]
  description?: ICard["description"]
  className?: string
  imgContainerClassName?: string
  noOverlay?: boolean
}
export default function Card({
  className,
  imgContainerClassName,
  image,
  title,
  description,
  noOverlay = false,
}: ICardProps) {
  return (
    <div
      className={cN("relative grid rounded-lg", className)}
      style={{
        gridTemplateRows: "1fr auto",
        gridTemplateAreas: '"img" "overlap"',
      }}
    >
      <div className={cN("area-[img/overlap]", imgContainerClassName)}>
        {image?.url && image.width && image.height && (
          <Image
            src={image.url}
            alt={image.alternativeText ?? image.name ?? ""}
            className="object-cover rounded-lg w-full h-full"
            width={image.width}
            height={image.height}
          />
        )}
      </div>
      {(title || description) && !noOverlay && (
        <section className="area-[overlap] flex flex-col text-stone-50 bg-stone-900 z-10 bg-blend-multiply">
          {title && <h2 className="text-center text-xl mt-2">{title}</h2>}
          {description && (
            <p className="text-center text-sm text-gray-600">{description}</p>
          )}
        </section>
      )}
    </div>
  )
}
