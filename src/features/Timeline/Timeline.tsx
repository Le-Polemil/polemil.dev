import { motion as m } from "framer-motion"
import { CSSProperties, ReactNode } from "react"

import { container, fadeInItem } from "@/animations/pageContainer"
import { cN } from "@/lib"
import css from "./timeline.module.scss"

export default function Timeline({
  rgbGradient,
  children,
  beforeLength = "w-40",
  containerClassName,
  moreInfos,
}: {
  rgbGradient?: string
  children: ReactNode
  beforeLength?: string
  containerClassName?: string
  moreInfos?: ReactNode
}) {
  return (
    <m.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cN(
        css.timeline,
        "hidden justify-center whitespace-nowrap w-full"
      )}
      style={{ "--rgb-gradient": rgbGradient } as CSSProperties}
    >
      <ol
        className={cN(
          containerClassName,
          "flex-[2] flex flex-col 3xl:flex-row text-stone-800 transition-all duration-1000 snap-x snap-mandatory w-full"
        )}
      >
        <m.li variants={fadeInItem} className={cN(beforeLength, "relative")} />

        {children}
      </ol>

      <div className="hidden lg:flex flex-col flex-1 p-8 overflow-hidden align-center">
        <div className="bg-custom-white p-4 w-full">
          {moreInfos}
        </div>
        {/* <div className="text-sm text-stone-800">{children}</div> */}

        <div className="flex-1" />
      </div>
    </m.div>
  )
}
