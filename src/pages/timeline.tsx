import { t } from "i18next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useState } from "react"

import diplomaAnimation from "@/animations/diploma.json"
import Button, { Sizes } from "@/components/Button"
import PageTitle from "@/components/PageTitle"
import PageTransition from "@/components/PageTransition"
import Feat from "@/features/Timeline"
import { cN } from "@/lib"
import { type IPageProps } from "@/types"

const TMP_SCHOOL_DATA = [
  {
    id: "dut",
    title: "Juillet 2017",
    subTitle: "DUT Informatique",
    children: []
  },
  {
    id: "licence",
    title: "Mai 2018",
    subTitle: "Licence Générale Informatique",
    children: []
  },
]

const TMP_EXP_DATA = [
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
      "Je quitte Artprice pour rejoindre ma première agence Web : Soluti.",
      "J'ai travaillé sur des projets très intéressants, dans le domaine du médical, du streaming, des sondages...",
      "Mais ce que je retiens le plus de ce poste, c'était mon travail en binôme avec un dev. back Symfony.",
      "Notre complémentarité portait ses fruits à tel point que Soluti nous plaçait ensemble sur chacuns de nos projets."],
  },
  {
    id: "abbeal",
    title: "Juin 2021",
    subTitle: "Ingénieur d'études",
    children: [
      "Me voici employé chez Abbeal, une ESN, avec laquelle j'intègre les équipes de Cultura, avant de m'atteler à la refonte de l'app interne.", "Ce sont mes premiers pas dans une ESN, bien qu'ayant travaillé pour une agence web précédemment, je trouve que l'ambiance y est complètement différente.", "Travailler chez Cultura pour refaire l'application web des magasiniers était vraiment passionnant car on partait de zéro, aucune dette technique à maintenir grâce à des évolutions par modules ! L'application était refaite en React, afin d'être disponible sur navigateur et sur mobile à travers une WebView."],
  },
  {
    id: "freelance",
    title: "Août 2023",
    subTitle: "Freelance",
    length: "h-32 3xl:h-52 3xl:w-40",
    children: ["Nouvelle aventure ! Je me lance en freelance.", "Ayant déménagé en Normandie durant mon précédent poste en full-remote, je me retrouve dans une situation difficile : il n'y a pas ou peu d'offres disponibles dans la région, et en télétravail la concurrence est forte. Je me lance alors en freelance pour tenter de matcher avec plus d'offres."],
  },
  {
    id: "elao",
    title: "Octobre 2024",
    subTitle: "Développeur Front-End",
    length: "h-52 3xl:h-52 3xl:w-40",
    children: ["Retour en agence web !", "Quel plaisir de quitter la cage aux lions du marché freelance.", "Je peux enfin me consacrer à ce que je sais faire le mieux : le front-end.", "Je travaille chez Elao, une agence web qui me permet de travailler sur des projets passionnants, dans une équipe de développeurs talentueux, avec une vraie liberté sur le travail."],
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
          "grid gap-x-6 md:gap-x-10 gap-y-4 3xl:gap-y-8 2xl:gap-y-10",
          "template-[base]",
          "h-full overflow-y-auto no-scrollbar",
          "px-8 3xl:px-[8vw] 2xl:px-[5rem] pb-8"
        )}
      >
        <PageTitle className="area-[pagetitle]" subTitle="Et mes diplômes">
          Mes expériences
          <span className="ml-4 mr-2 hidden md:inline">pro</span>
          <div className="bounce-in relative ![animation-delay:0.45s]">
            <span className="remove-rounded rounded-[50%] w-1.5 md:w-2 h-1.5 md:h-2 bg-stone-50 inline-block" />
          </div>
        </PageTitle>

        <div className="area-[timeline] overflow-x-auto no-scrollbar 3xl:flex 3xl:items-center">
          <Feat.Timeline rgbGradient="129 140 248" beforeLength="h-8 3xl:flex-1" moreInfos={activeId ? (activeId > 2 ? TMP_EXP_DATA[activeId - 2] : TMP_SCHOOL_DATA[activeId]).children : undefined}>
            {TMP_SCHOOL_DATA.map(({ id, title, subTitle }, index) => (
              <Feat.TimelineItem
                key={id}
                title={title}
                subTitle={subTitle}
                subTitleColor="text-indigo-500"
                color="text-rose-500"
                size="w-72 3xl:w-52"
                length="3xl:w-40 h-28"
                active={activeId === index}
                onClickOnBar={() => setActiveId(index)}
                onClose={() => setActiveId(null)}
                className="!flex-row 3xl:!flex-col gap-x-4 z-[1]"
                icon={
                  <div className="flex justify-center items-center h-full ">
                    <Lottie
                      animationData={diplomaAnimation}
                      className="w-24 -my-2 md:w-28 md:-my-4 3xl:w-32 -ml-8 -mr-6 3xl:-my-6 3xl:-ml-2"
                    />
                  </div>
                }
              />
            ))}

            {TMP_EXP_DATA.map(({ id, children, ...rest }, index) => (
              <Feat.TimelineItem
                key={id}
                onClick={() => selectJob(id)}
                subTitleColor="text-indigo-500"
                active={activeId === index + TMP_SCHOOL_DATA.length}
                onClickOnBar={() => setActiveId(index + TMP_SCHOOL_DATA.length)}
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
              length="relative h-40 3xl:flex-1"
              active={activeId === TMP_EXP_DATA.length + 2}
              isBarHatched
              onClickOnBar={() => setActiveId(TMP_EXP_DATA.length + TMP_SCHOOL_DATA.length)}
              onClose={() => setActiveId(null)}
            >
              <div key="hire-me" className="flex justify-center items-center">
                <Link href="/contact">
                  <Button
                    role="link"
                    text={t("timeline.hire.me")}
                    icon="north_east"
                    size={Sizes.SMALL}
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
