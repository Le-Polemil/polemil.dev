import { item } from "@/animations/pageContainer"
import { cN } from "@/lib"
import { motion as m } from "framer-motion"
import Link from "next/link"

export interface TabType {
  id: string
  url: string
  text: string
  icon: string
  index: number
  orderOnMobile?: number
  className?: string
}

export default function Tab({
  id,
  url,
  icon,
  text,
  index,
  orderOnMobile,
  className,
}: TabType) {
  return (
    <m.div
      variants={item}
      className={cN(
        orderOnMobile && `order-${orderOnMobile}`,
        `lg:order-${index + 1}`,
        "lg:flex flex-1 w-16 rounded-full",
        "tab group hover:bg-opacity-10 hover:bg-stone-950 cursor-pointer",
        "overflow-hidden text-ellipsis whitespace-nowrap",
        className
      )}
    >
      <Link
        href={url}
        className="py-1 lg:py-2 px-4 md:gap-2 flex-1 flex flex-col xl:flex-row items-center justify-center"
        tabIndex={index + 1}
      >
        <span className="material-icons group-hover:tilt-shake text-2xl lg:text-4xl">
          {icon}
        </span>
        <span className="inline-block text-sm sm:text-base 2xl:text-xl">
          {text}
        </span>
      </Link>
    </m.div>
  )
}
