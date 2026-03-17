import { motion as m } from "framer-motion"
import { ReactNode } from "react"

import { fadeInItem } from "@/animations/pageContainer"
import { cN } from "@/lib"
import Title from "../../components/Title"
import css from "./timeline.module.scss"

interface ITimelineItemProps {
  title: string
  subTitle?: string
  children?: ReactNode
  color?: string
  bgColor?: string
  subTitleColor?: string
  isBarHatched?: boolean
  className?: string
  active?: boolean
  padding?: string
  length?: string
  size?: string
  icon?: ReactNode
  onClose?(): void
  onClick?(): void
  onClickOnBar?(): void
}

export default function TimelineItem({
  title,
  subTitle,
  children,
  color = "text-red-500",
  bgColor = "bg-stone-50",
  subTitleColor = "text-blue-500",
  isBarHatched = false,
  length = "h-48 3xl:h-52 3xl:w-40",
  size = "w-80",
  className = "",
  active = false,
  icon,
  onClose = () => {},
  onClick = () => {},
  onClickOnBar = () => {},
}: ITimelineItemProps) {
  return (
    <m.li
      variants={fadeInItem}
      className={cN(
        "relative w-full flex items-center",
        length,
        color,
        active && css.active,
        isBarHatched && css.hatched
      )}
      onClick={onClickOnBar}
    >
      <span
        className={cN(
          css.dot,
          color,
          active && "text-indigo-500",
          "absolute bg-current rounded-full"
        )}
      />

      <m.div
        whileTap={{ scale: 0.95 }}
        onTap={onClick}
        className={cN(
          css.textbubble,
          "absolute whitespace-normal flex-col justify-between",
          bgColor,
          size,
          className
        )}
      >
        <span className="flex flex-col">
          <time className={cN(color, "text-xl font-archivo")}>{title}</time>
          <Title.h6 className={cN("text-md mb-2", subTitleColor)}>
            {subTitle}
          </Title.h6>
        </span>
        {icon}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="3xl:hidden z-30 absolute -top-2 -right-2 text-center material-icons font-bold text-3xl p-3"
        >
          close
        </button>
      </m.div>
    </m.li>
  )
}
