import { useQuery } from "@apollo/client"
import { AnimatePresence, motion as m } from "framer-motion"
import { useTranslation } from "react-i18next"

import { container, fadeInItemRapid } from "@/animations/pageContainer"
import Title from "@/components/Title"
import { cN } from "@/lib"
import { GET_PROJECTS, type ProjectsDataType } from "@/queries/projects"

interface IDetails {
  index: number
  className?: string
}

export default function Details({ className, index }: IDetails) {
  const { i18n } = useTranslation()

  const { data, loading } = useQuery<ProjectsDataType>(GET_PROJECTS, {
    variables: { locale: i18n.language },
  })
  const projects = data?.projects ?? []

  const project = projects[index]
  const { name, description, dateInfos, subTitle } = project ?? {}

  return (
    <AnimatePresence>
      <m.div
        variants={container}
        initial="hidden"
        animate="show"
        exit="hidden"
        key={index}
        className={cN(
          className,
          "min-h-[20vh] overflow-y-auto flex flex-col gap-4 pr-4"
        )}
      >
        <m.div className="hidden portrait:block" variants={fadeInItemRapid}>
          <Title.h1 text={name ?? ""} />
        </m.div>
        <m.div className="hidden portrait:block" variants={fadeInItemRapid}>
          <Title.h3 text={subTitle ?? ""} />
        </m.div>
        {/* TODO : Chips isDev / isPaused / isDone */}

        <m.time variants={fadeInItemRapid} className="text-stone-50 text-xl">
          {dateInfos ?? ""}
        </m.time>

        <m.p
          variants={fadeInItemRapid}
          className="text-sm sm:text-base 2xl:text-xl md:mb-6"
        >
          {description ?? ""}
        </m.p>
      </m.div>
    </AnimatePresence>
  )
}
