import { motion as m } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import { delayedContainer, fadeInItem } from "@/animations/pageContainer"
import DashBorder from "@/components/DashBorder/DashBorder"
import SVG from "@/components/svg"
import { CV_URL, cN } from "@/lib"
import { WithClassNameProps } from "@/types"

export default function Links({ className }: WithClassNameProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [refWidth, setWidth] = useState<number>()
  const [refHeight, setHeight] = useState<number>()

  useEffect(() => {
    if (!ref.current) return
    const resizeObserver = new ResizeObserver(() => {
      setWidth(ref?.current?.clientWidth)
      setHeight(ref?.current?.clientHeight)
    })
    resizeObserver.observe(ref.current)
    return () => resizeObserver.disconnect() // clean up
  }, [])

  return (
    <m.div
      variants={delayedContainer}
      initial="hidden"
      animate="show"
      className={cN(
        className,
        "flex flex-col sm:flex-row xl:flex-nowrap gap-x-16 gap-y-6",
        "font-rubikBold text-base lg:text-xl xl:text-2xl"
      )}
    >
      <m.a
        ref={ref}
        variants={fadeInItem}
        href={CV_URL}
        rel="nofollow noopener noreferrer"
        target="_blank"
        className={cN(
          "relative group flex items-center justify-center w-full md:w-auto",
          "order-2 sm:order-1",
          // "before:absolute before:inset-0 before:rounded-full before:border-2 before:border-dashed before:border-current",
          "py-3 pl-6 pr-8",
          "flex gap-2 items-center hover:text-stone-50 transition-all"
        )}
      >
        <DashBorder
          width={refWidth}
          height={refHeight}
          rectClassName="[stroke-width:3] lg:[stroke-width:4] [stroke-dashoffset:5] group-hover:[stroke-dashoffset:-80]"
        />

        <div className="overflow-hidden group-hover:-translate-y-2.5 transition-tran">
          <m.span className="group-hover:translate-y-4 transition-transform flex items-center">
            <span className="material-icons text-3xl lg:text-4xl">
              arrow_downward
            </span>
          </m.span>
        </div>
        <span className="whitespace-nowrap">Télécharger mon CV</span>
      </m.a>

      <div className="order-1 sm:order-2 flex gap-x-16 gap-y-6 justify-between md:justify-start w-full md:w-auto">
        <m.a
          variants={fadeInItem}
          href="https://www.linkedin.com/in/paul-emile-moreau/"
          target="_blank"
          className="group flex gap-2 hover:gap-4 md:gap-4 items-center hover:text-stone-50 transition-color"
        >
          <SVG.Linkedin
            textColor="rgb(253 186 116)"
            className="w-6 md:w-8 lg:w-10"
          />
          <span className="group-hover:translate-x-2 transition-transform">
            Linkedin
          </span>
        </m.a>
        <m.a
          variants={fadeInItem}
          href="https://github.com/Le-Polemil"
          target="_blank"
          className="group flex gap-2 hover:gap-4 md:gap-4 items-center hover:text-stone-50 transition-all"
        >
          <SVG.Github className="w-6 md:w-8 lg:w-10" />
          <span className="group-hover:translate-x-2 transition-transform">
            Github
          </span>
        </m.a>
      </div>
    </m.div>
  )
}
