import { motion as m } from "framer-motion"
import { useTranslation } from "react-i18next"

import { container, fadeInItem } from "@/animations/pageContainer"

import PageTitle from "@/components/PageTitle"
import PageTransition from "@/components/PageTransition"
import Title from "@/components/Title"
import Feat from "@/features/Profile"
import { AUTHOR, cN } from "@/lib"
import { type IPageProps } from "@/types"

export default function Profile({ previousRoute }: IPageProps) {
  const [t] = useTranslation()

  return (
    <PageTransition
      headTitle={t("profile.title") + " ?"}
      previousRoute={previousRoute}
      className="page:profile bg-orange-300"
    >
      <m.main
        variants={container}
        initial="hidden"
        animate="show"
        className={cN(
          "grid gap-x-6 md:gap-x-10 gap-y-2 sm:gap-y-4 lg:gap-y-8 2xl:gap-y-10",
          "template-[base] sm:template-[sm] lg:template-[lg] 2xl:template-[2xl]",
          "px-4 sm:px-8 lg:px-[8vw] 2xl:px-[5rem] pb-8",
          "h-full overflow-y-auto no-scrollbar"
        )}
      >
        <PageTitle className="area-[pagetitle] 2xl:area-[overlap/pagetitle]">
          <div className="group flex gap-3">
            <div>{t("profile.title")}</div>
            <div className="group-hover:tilt-shake">?</div>
          </div>
        </PageTitle>

        <Feat.Picture className="area-[photo]" />

        <m.div
          variants={fadeInItem}
          className="area-[name] flex items-end lg:hidden"
        >
          <Title.h1 className="flex flex-col gap-x-2 whitespace-nowrap">
            {AUTHOR.firstname}
            <span className="text-4xl sm:text-5xl md:text-6xl text-white">
              {AUTHOR.lastname}
            </span>
          </Title.h1>
        </m.div>

        <Feat.ContactMe className="area-[mailBtn] 2xl:area-[mailBtn/overlap]" />

        <Feat.Digest className="area-[digest]" />

        <Feat.Stats className="area-[stats]" />
      </m.main>
    </PageTransition>
  )
}
