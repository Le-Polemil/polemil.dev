import { t } from "i18next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useState } from "react"

import diplomaAnimation from "@/animations/diploma.json"
import Button from "@/components/Button"
import PageTitle from "@/components/PageTitle"
import PageTransition from "@/components/PageTransition"
import Feat from "@/features/Timeline"
import { cN } from "@/lib"
import { type IPageProps } from "@/types"

const TMP_DATA = [
  {
    id: "artprice",
    title: "Mai 2018",
    subTitle: "Développeur Full-Stack",
    children: [
      "J'intègre Artprice ! Une entreprise de cotation d'art et d'artistes.",
      "Ils me forment à React et Redux, en parallèle d'un maintient de l'historique en Ruby-on-Rails.",
    ],
  },
  {
    id: "soluti",
    title: "Octobre 2019",
    subTitle: "Développeur Full-Stack",
    children: [
      "Je quitte Artprice pour rejoindre une agence Web : Soluti.",
      "J'y travaille quasi uniquement en binôme avec un dev back Symfony, tant on est complémentaire.",
    ],
  },
  {
    id: "abbeal",
    title: "Juin 2021",
    subTitle: "Ingénieur d'études",
    children: [
      "Me voici employé chez Abbeal, une ESN, avec laquelle j'intègre les équipes de Cultura, avant de m'atteler à la refonte de l'app interne.",
    ],
  },
  {
    id: "freelance",
    title: "Août 2023",
    subTitle: "Freelance",
    length: "h-32 lg:h-52 lg:w-40",
    children: ["Nouvelle aventure ! Je me lance en freelance."],
  },
  {
    id: "elao",
    title: "Octobre 2024",
    subTitle: "Lead développeur front-end",
    length: "h-56 lg:h-52 lg:w-40",
    children: ["J’intègre Elao et travaille sur plusieurs apps front (React, Astro) : santé, suivi du temps et usine à sites.",
    "En parallèle, j’améliore le workflow design→dev grâce aux nouveaux outils IA (MCP Figma, Skills) et rédige des articles sur l’évolution du CSS."],
  },
]

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })
export default function JobsAndEducations({ previousRoute }: IPageProps) {
  const [selectedJob, selectJob] = useState("")
  const [activeId, setActiveId] = useState<number | null>(0)

  return (
    <PageTransition
      headTitle="Mes expériences pro"
      previousRoute={previousRoute}
      className="page:timeline bg-indigo-400"
    >
      <main
        className={cN(
          "grid gap-x-6 md:gap-x-10 gap-y-4 lg:gap-y-8 2xl:gap-y-10",
          "template-[base]",
          "h-full overflow-y-auto no-scrollbar",
          "px-8 lg:px-[8vw] 2xl:px-[5rem] pb-8"
        )}
      >
        <PageTitle className="area-[pagetitle]" subTitle="Et mes diplômes">
          Mes expériences
          <span className="ml-4 mr-2 hidden md:inline">pro</span>
          <div className="bounce-in relative ![animation-delay:0.45s]">
            <span className="remove-rounded rounded-[50%] w-1.5 md:w-2 h-1.5 md:h-2 bg-stone-50 inline-block" />
          </div>
        </PageTitle>

        <div className="area-[timeline] overflow-y-auto lg:flex lg:items-center">
          <Feat.Timeline rgbGradient="129 140 248" beforeLength="h-8 lg:flex-1">
            <Feat.TimelineItem
              title="Juillet 2017"
              subTitle="DUT Informatique"
              subTitleColor="text-indigo-500"
              color="text-rose-500"
              size="w-72 lg:w-52"
              length="lg:w-40 h-28"
              active={activeId === 0}
              onClickOnBar={() => setActiveId(0)}
              onClose={() => setActiveId(null)}
              className="!flex-row lg:!flex-col gap-4"
            >
              <div className="flex justify-center items-center h-full ">
                <Lottie
                  animationData={diplomaAnimation}
                  className="w-28 md:w-32 lg:w-40 my-auto -ml-8 -mr-6 lg:-my-6 lg:-ml-2"
                />
              </div>
            </Feat.TimelineItem>

            <Feat.TimelineItem
              title="Mai 2018"
              subTitle="Licence Générale Informatique"
              subTitleColor="text-indigo-500"
              color="text-rose-500"
              size="w-72 lg:w-52"
              length="lg:w-12 h-28"
              active={activeId === 1}
              onClickOnBar={() => setActiveId(1)}
              onClose={() => setActiveId(null)}
              className="!flex-row lg:!flex-col gap-4"
            >
              <div className="flex justify-center items-center h-full">
                <Lottie
                  animationData={diplomaAnimation}
                  className="w-28 md:w-32 lg:w-40 my-auto -ml-8 -mr-6 lg:-my-6 lg:-ml-2"
                />
              </div>
            </Feat.TimelineItem>

            {TMP_DATA.map(({ id, children, ...rest }, index) => (
              <Feat.TimelineItem
                key={id}
                onClick={() => selectJob(id)}
                subTitleColor="text-indigo-500"
                active={activeId === index + 2}
                onClickOnBar={() => setActiveId(index + 2)}
                onClose={() => setActiveId(null)}
                {...rest}
              >
                {children.map((child, index) => (
                  <div key={typeof child === "string" ? child : index}>
                    {child}
                  </div>
                ))}
              </Feat.TimelineItem>
            ))}

            <Feat.TimelineItem
              title={t("timeline.whats.next")}
              color="text-rose-500"
              size="w-80"
              length="relative h-40 lg:flex-1"
              active={activeId === TMP_DATA.length + 2}
              onClickOnBar={() => setActiveId(TMP_DATA.length + 2)}
              onClose={() => setActiveId(null)}
            >
              <div key="hire-me" className="flex justify-center items-center">
                <Link href="/contact">
                  <Button
                    role="link"
                    text={t("timeline.hire.me")}
                    icon="north_east"
                  />
                </Link>
              </div>
            </Feat.TimelineItem>
          </Feat.Timeline>
        </div>
      </main>
    </PageTransition>
  )
}
