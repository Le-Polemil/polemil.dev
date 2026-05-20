import { useQuery } from "@apollo/client"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import Button, { Colors } from "@/components/Button"
import PageTitle from "@/components/PageTitle"
import PageTransition from "@/components/PageTransition"
import Feat from "@/features/Stack"
import { cN } from "@/lib"
import { GET_SKILLS, type SkillCategoriesDataType } from "@/queries/stack"
import { IPageProps } from "@/types"

const TECHS = "techs",
  KNOW_HOW = "knowHow",
  SOFT_SKILLS = "softSkills"
const CATEGORIES = [TECHS, KNOW_HOW, SOFT_SKILLS] as const

export default function Stack({ previousRoute }: IPageProps) {
  const { i18n } = useTranslation()
  const [tab, setTab] = useState<(typeof CATEGORIES)[number]>(TECHS)

  const { data, loading } = useQuery<SkillCategoriesDataType>(GET_SKILLS, {
    variables: { locale: i18n.language },
  })
  const techs = data?.techs?.[0]
  const knowHow = data?.knowHow?.[0]
  const softSkills = data?.softSkills?.[0]
  const categoryByKey = { techs, knowHow, softSkills }

  return (
    <PageTransition
      headTitle="Mes compétences"
      previousRoute={previousRoute}
      className="page:stack bg-blue-500 overflow-hidden"
    >
      <main
        className={cN(
          "grid gap-x-6 md:gap-x-10 gap-y-4 lg:gap-y-8 2xl:gap-y-10",
          "template-[base] lg:template-[lg]",
          "px-8 lg:px-[8vw] 2xl:px-[5rem] pb-8",
          "max-w-full h-full overflow-x-hidden overflow-y-auto no-scrollbar"
        )}
      >
        <PageTitle className="area-[pagetitle] max-w-full overflow-hidden">
          <span className="hover:[letter-spacing:0.3rem] transition-all">
            Mes compétences
          </span>
        </PageTitle>

        <div className="area-[tabs] flex lg:flex-col items-stretch justify-center gap-2 sm:gap-4 md:gap-8 pt-0 pb-0 lg:py-auto overflow-hidden">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              color={Colors.BLACK}
              className={cN(
                tab === category &&
                  " !bg-stone-50  after:!border-stone-200 text-stone-800 hover:text-stone-800",
                "flex-1 lg:flex-initial text-sm"
              )}
              padding="px-3 py-2 md:px-6 md:py-4 lg:px-16 lg:py-6"
              borderless
              id={category}
              onClick={() => setTab(category)}
            >
              {categoryByKey[category]?.name ?? category}
            </Button>
          ))}
        </div>

        <section className="area-[details] flex flex-col overflow-hidden border-4 border-dashed rounded-lg">
          <div className="w-full h-full">
            <div className="flex flex-wrap gap-4 h-full overflow-x-hidden">
              <Feat.Techs key={tab} data={categoryByKey[tab]} />
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
