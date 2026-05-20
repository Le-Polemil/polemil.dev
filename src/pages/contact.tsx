import { motion as m } from "framer-motion"
import dynamic from "next/dynamic"
import { FormEventHandler, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import mailSentAnimation from "@/animations/mailSent.json"
import Button, { Colors } from "@/components/Button"
import PageTitle from "@/components/PageTitle"
import PageTransition from "@/components/PageTransition"
import Title from "@/components/Title"
import Feat from "@/features/Contact"
import { AUTHOR, cN } from "@/lib"
import { CONTACT_ME, type ContactDataType } from "@/queries/contact"
import { IPageProps } from "@/types"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useLocalStorage } from "usehooks-ts"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const ONLY_WRONG_QUESTIONS = [
  "Trop pressé.e d'avoir une réponse ?",
  "Le numéro de contact ne vous plait pas ?",
  "Le formulaire était carrément sympa ?",
  "Une envie de spammer la conscience tranquille ?",
  "On y retourne ?",
]

export default function Contact({ previousRoute }: IPageProps) {
  const [t] = useTranslation()
  const [showThanks, setShowThanks] = useState(false)
  const router = useRouter()
  const [lastContactId, saveLastContactId] = useLocalStorage(
    "lastContactId",
    ""
  )

  useEffect(() => {
    setShowThanks(!!lastContactId)
  }, [lastContactId])

  const [mutate, { data, loading, called }] =
    useMutation<ContactDataType>(CONTACT_ME)

  const id = data?.createContact?.documentId

  useEffect(() => {
    if (called && !loading && data) {
      setShowThanks(true)
      if (id) saveLastContactId(id)
    }
  }, [saveLastContactId, id, called, data, loading])

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    mutate({
      variables: {
        data: {
          firstname: event.currentTarget.firstname.value,
          lastname: event.currentTarget.lastname.value,
          email: event.currentTarget.email.value,
          phone: event.currentTarget.phone.value,
          message: event.currentTarget.message.value,
        },
      },
    })
  }

  // const callApi = () => console.log("TODO: Call API discord server")
  return (
    <PageTransition
      headTitle={t("contact.me")}
      previousRoute={previousRoute}
      className="page:contact bg-red-400 overflow-hidden"
    >
      <m.main
        className={cN(
          "grid gap-x-6 md:gap-x-10 gap-y-4 lg:gap-y-8 2xl:gap-y-10",
          "template-[base]",
          "h-full overflow-x-hidden overflow-y-auto 2xl:overflow-y-hidden no-scrollbar",
          "px-8 lg:px-[8vw] 2xl:px-[5rem] pb-8"
        )}
      >
        <PageTitle
          className="area-[pagetitle]"
          titleClassName="contact-title before:left-0 before:top-0"
        >
          {t("contact.me")}
        </PageTitle>

        <div className="area-[close] flex items-center ">
          <button
            onClick={router.back}
            className={cN(
              "material-icons text-4xl lg:text-5xl 2xl:text-6xl text-stone-50",
              "masked-border before:border-blue-500"
            )}
          >
            close
          </button>
        </div>

        {!showThanks ? (
          <>
            <Button
              type="button"
              borderless
              color={Colors.BLUE}
              className="area-[copyBtn] justify-self-center group tooltiped overflow-visible w-full mt-4 mb-4 max-w-80"
              onClick={() => navigator.clipboard.writeText(AUTHOR.email)}
            >
              <div className="flex gap-2 items-center">
                <span className="material-icons">mail</span>
                <div className="">
                  <span className="font-rubikBold whitespace-nowrap">
                    {t("contact.email.btn")}
                  </span>
                </div>
              </div>
              <span className="tooltip-active:bottom font-rubikReg text-base text-stone-800 ">
                {t("contact.email.copied")}
              </span>
            </Button>

            <Title.h3
              text={t("common.or")}
              className="area-[or] justify-self-center"
            />

            <Feat.Form
              className="area-[form]"
              onSubmit={onSubmit}
              loading={loading}
            />
          </>
        ) : (
          <div className="area-[form] flex flex-col gap-4 items-center bg-stone-50 md:mx-20 my-auto p-12 rounded-xl">
            <Title.h1
              className="pb-6 justify-self-center mt-auto"
              text={`#${parseInt(id ?? "0") < 10 ? "0" : ""}${
                id ?? "?"
              } - Merci d'avoir pris contact !`}
            />
            <div className="relative md:py-12 md:px-32 -m-4">
              <div className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl"></div>
              <Lottie
                animationData={mailSentAnimation}
                className="w-[14rem] -m-4"
              />
            </div>

            <div className=" mt-12">
              <Title.h6
                className="inline mr-2"
                text={
                  ONLY_WRONG_QUESTIONS?.[
                    Math.floor(Math.random() * ONLY_WRONG_QUESTIONS.length)
                  ]
                }
              />
              <Title.h6 className="inline-flex items-center gap-2 text-left">
                Renvoyez moi un mail
                <span className="material-icons text-3xl text-indigo-500">
                  south_west
                </span>
              </Title.h6>
            </div>

            <div className="mb-auto">
              <Button
                type="button"
                onClick={() => setShowThanks(false)}
                text="J'ai besoin de renvoyer un mail !"
              />
            </div>
          </div>
        )}
      </m.main>
    </PageTransition>
  )
}
