import { useQuery } from "@apollo/client"
import { motion as m } from "framer-motion"
import { CSSProperties, useState } from "react"
import { useTranslation } from "react-i18next"

import { container, fadeInItem } from "@/animations/pageContainer"
import PageTitle from "@/components/PageTitle"
import PageTransition from "@/components/PageTransition"
import { BO_URL, cN } from "@/lib"
import { GET_PROJECTS, ProjectsDataType } from "@/queries/projects"
import { type IPageProps } from "@/types"

import Title from "@/components/Title"
import Feat from "@/features/Projects"

export default function Projects({ previousRoute }: IPageProps) {
  const { i18n } = useTranslation()
  const [index, setIndex] = useState(0)

  const { data, loading } = useQuery<ProjectsDataType>(GET_PROJECTS, {
    variables: { locale: i18n.language },
  })
  const projects = data?.projects ?? []

  const current = projects[index]
  const { name, subTitle, skills, link, githubLink } = current ?? {}

  return (
    <PageTransition
      headTitle="Mes projets"
      previousRoute={previousRoute}
      className="page:projects bg-purplish-600 overflow-hidden h-full"
    >
      <m.main
        variants={container}
        initial="hidden"
        animate="show"
        exit="hidden"
        className={cN(
          "grid gap-x-6 xl:gap-x-18 gap-y-4 lg:gap-y-8 2xl:gap-y-10",
          "template-[base] md:template-[md]",
          "px-8 lg:px-[8vw] 2xl:px-[5rem] pb-8",
          "h-full overflow-y-auto no-scrollbar"
        )}
      >
        <PageTitle
          className="area-[pagetitle] !self-start -mb-12"
          titleClassName="bubbles"
        >
          Mes projets
        </PageTitle>

        <m.div variants={fadeInItem} className="area-[index] self-end">
          <div className="flex items-end gap-x-10">
            <Title.h1 className="font-bukhari text-4xl md:text-6xl lg:text-6xl text-stone-50">
              {index + 1 > 9 ? index + 1 : `0${index + 1}`}.
            </Title.h1>
            <Title.h1 className="portrait:hidden" text={name ?? ""} />
          </div>
          <Title.h3 className="portrait:hidden" text={subTitle ?? ""} />
        </m.div>

        <Feat.Details className="area-[desc]" index={index} />

        <Feat.Carousel
          className="area-[image]"
          cards={projects.map((project) => ({
            title: project.name,
            description: project.description ?? "",
            image: project.image
              ? { ...project.image, url: BO_URL + project.image.url }
              : undefined,
          }))}
          index={index}
          setIndex={setIndex}
          link={link ?? undefined}
          githubLink={githubLink ?? undefined}
        />

        {!!skills?.length && (
          <m.div
            variants={fadeInItem}
            className="area-[skills] border-t-2 border-stone-800 pt-4 2xl:my-6 w-full overflow-hidden"
          >
            <m.div
              variants={fadeInItem}
              className="infinite-roller text-xl text-stone-50 min-h-8"
            >
              {skills.map((skill, idx, arr) => (
                <div
                  key={skill.documentId}
                  className="inline-block text-lg md:text-2xl lg:text-3xl whitespace-nowrap min-w-28 md:min-w-44"
                  style={
                    {
                      "--index": idx,
                      "--itemsCount": arr.length,
                    } as CSSProperties
                  }
                >
                  {skill.name}
                </div>
              ))}
            </m.div>
          </m.div>
        )}
      </m.main>
    </PageTransition>
  )
}
