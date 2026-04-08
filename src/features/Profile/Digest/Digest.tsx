import { motion as m } from "framer-motion"
import { useTranslation } from "react-i18next"

import { fadeInItem } from "@/animations/pageContainer"
import Feat from "@/features/Profile"
import { AUTHOR, cN } from "@/lib"
import { type WithClassNameProps } from "@/types"

const AVAILABLE = true

export default function Digest({ className }: WithClassNameProps) {
  const [t] = useTranslation()

  return (
    <section
      className={cN(
        className,
        "self-center sm:justify-center gap-2",
        "font-rubikReg font-semibold text-base sm:text-xl md:text-2xl lg:text-3xl text-left mb-auto lg:mb-0"
      )}
    >
      <m.h2
        variants={fadeInItem}
        className="hidden lg:block text-6xl lg:text-7xl mb-1"
      >
        {AUTHOR.firstname}{" "}
        <span className="text-stone-50">{AUTHOR.lastname}</span>
      </m.h2>

      <div className="flex flex-col gap-2 group">
        <m.div
          variants={fadeInItem}
          className="order-3 group-hover:push-forward"
        >
          {t("profile.xp.webdev.0")}
          <span className="hidden sm:inline"> {t("profile.xp.webdev.1")}</span>,
          spécialisé <span className="text-blue-500">Front-End</span>
        </m.div>
        <m.div
          variants={fadeInItem}
          className="order-4 group-hover:push-forward"
        >
          <span className="">{t("profile.expert.1")}</span>{" "}
          <span className="text-blue-500 anchor cursor-help">React</span>{" "}
          {t("common.and")}{" "}
          <span className="text-blue-500 anchor-2 cursor-help">Typescript</span>
        </m.div>
        <m.div
          variants={fadeInItem}
          className="order-5 group-hover:push-forward"
        >
          Diplômé d{"'"}un <span className="text-blue-500">BAC+3</span> en
          informatique
        </m.div>
      </div>
      <Feat.Links className="order-6 mt-4 sm:mt-8 mb-4 sm:mb-0 lg:mt-4" />
      {/* <m.div
        variants={fadeInItem}
        className="order-2 lg:order-5 group-hover:push-forward mb-6 lg:mb-0"
      >
        <span
          className={[
            "material-icons mr-2 text-2xl lg:text-4xl",
            AVAILABLE
              ? "align-sub text-lime-600"
              : "align-middle text-rose-600",
          ].join(" ")}
        >
          adjust
        </span>
        {AVAILABLE ? (
          <>
            <span>{t("profile.available.yes.0")}</span>{" "}
            <span className="hidden lg:inline">
              {t("profile.available.yes.for")}
            </span>
          </>
        ) : (
          <span>{t("profile.available.false")}</span>
        )}
      </m.div> */}

      {/* <Languages className="order-6 sm:order-7 mr-auto 2xl:mr-0 2xl:ml-auto" /> */}
    </section>
  )
}
