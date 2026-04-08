import { motion as m } from "framer-motion"
import { useTranslation } from "react-i18next"

import { fadeInItem } from "@/animations/pageContainer"
import Title from "@/components/Title"
import { cN } from "@/lib"
import { type WithClassNameProps } from "@/types"
import Link from "next/link"

export default function ContactMe({ className }: WithClassNameProps) {
  const [t] = useTranslation()

  return (
    <m.div
      variants={fadeInItem}
      className={cN(
        className,
        "flex mb-4 md:mb-0 sm:mt-4 lg:mt-0 justify-center lg:justify-start self-center justify-self-center lg:justify-self-start"
      )}
    >
      <Link className="group relative flex gap-4 items-center" href="/contact">
        <m.span
          initial={{ x: -80, y: 80, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="material-icons font-bold text-3xl md:text-6xl lg:text-7xl group-hover:text-red-400 transition-all group-hover:![transform:translate(0.1em,-0.1em)]"
        >
          north_east
        </m.span>
        <Title.h2
          className="group-hover:text-stone-50 transition-colors"
          text={t("contact.me")}
        />
      </Link>
    </m.div>
  )
}
