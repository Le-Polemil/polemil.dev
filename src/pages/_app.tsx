import { ApolloProvider } from "@apollo/client"
import { AnimatePresence, motion as m } from "framer-motion"
import i18n from "i18next"
import ChainedBackend from "i18next-chained-backend"
import HttpBackend from "i18next-http-backend"
import LocalStorageBackend from "i18next-localstorage-backend"
import { AppProps } from "next/app"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { initReactI18next } from "react-i18next"

import { initApolloClient } from "@/apollo"
import usePreviousRoute from "@/hooks/usePreviousRoute"
import { API_URL, AUTHOR, cN, SITE_DESCRIPTION, THUMBNAIL_URL } from "@/lib"
import { IPageProps } from "@/types"

import Arrows from "@/components/Arrows"
import Logo from "@/components/Logo"
import Tabs from "@/components/Tabs"

import "@/styles/_globals.scss"
import "@/styles/animations.scss"
import "@/styles/fonts.scss"
import "@/styles/inputs.scss"
import "@/styles/pages.scss"
import "@/styles/transitions.scss"
import "@fontsource/material-icons-rounded"

i18n
  .use(ChainedBackend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "fr", // if you're using a language detector, do not define the lng option
    fallbackLng: ["fr", "en", "ru"],

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },

    backend: {
      backends: [LocalStorageBackend, HttpBackend],
      backendOptions: [
        {
          expirationTime: 24 * 60 * 60 * 1000, // 24h cache
        },
        {
          loadPath: `${API_URL}/i18n/{{lng}}`,
          crossDomain: true,
        },
      ],
    },
  })

function MyApp({ Component, pageProps, router }: AppProps<IPageProps>) {
  const previousRoute = usePreviousRoute()
  const [client, setClient] = useState<Awaited<ReturnType<typeof initApolloClient>>>()

  useEffect(() => {
    initApolloClient().then(setClient)
  }, [])

  if (!client) return null

  return (
    <ApolloProvider client={client}>
      <Head>
        <link rel="shortcut icon" href="/icon/favicon.ico" />
        <meta name="description" content={SITE_DESCRIPTION} />
        {/* Meta keywords (optionnel, moins utilisé de nos jours) */}
        <meta
          name="keywords"
          content="polemil, dev, développeur, CV en ligne, développeur Web, full-stack, front-end, React, JavaScript, TypeScript, portfolio"
        />

        {/* Auteur */}
        <meta
          name="author"
          content={`${AUTHOR.firstname} ${AUTHOR.lastname}`}
        />

        {/* Open Graph (pour un meilleur partage sur les réseaux sociaux) */}
        <meta property="og:image" content={THUMBNAIL_URL} />
        <meta
          property="og:title"
          content={`Polémil - Développeur Web spécialisé sur React`}
        />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://polemil.dev" />

        {/* Twitter Card (pour un meilleur affichage sur Twitter) */}
        <meta name="twitter:image" content={THUMBNAIL_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Polémil - Développeur Web spécialisé sur React`}
        />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
      </Head>

      <div
        className={cN(
          "relative text-stone-800 font-rubikReg h-screen overflow-hidden",
          "py-6 lg:py-12 px-8 lg:px-[8vw] 2xl:px-[calc(5rem_+_3vw)] 3xl:px-[8vw]"
        )}
      >
        <div className="flex justify-between lg:hidden sticky z-30">
          <Logo />

          <AnimatePresence initial={false}>
            {router.pathname !== "/contact" && (
              <m.span
                key="email"
                className="group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.25 } }}
                exit={{
                  opacity: 0,
                  transition: { delay: 0.45, duration: 0.15 },
                }}
              >
                <div className="flex items-center justify-center relative h-full w-full">
                  <Link href="/contact">
                    <span
                      className={cN(
                        "nav-email relative w-10 h-10 text-4xl",
                        "group-hover:rotate-[30deg] group-hover:translate-y-3 transition-all duration-500"
                      )}
                    >
                      <span className="material-icons z-10">mail</span>
                    </span>
                  </Link>
                </div>
              </m.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-x-12 lg:w-full absolute left-0 right-0 bottom-0 lg:sticky z-30 mb-4 md:mb-2 lg:mb-0">
          <Logo className="hidden lg:flex" />
          <div className="flex-1">
            <Tabs />
          </div>
        </div>
        <AnimatePresence initial={false}>
          <Component
            {...pageProps}
            previousRoute={previousRoute}
            key={router.pathname}
          />
        </AnimatePresence>
        <Arrows />
      </div>
    </ApolloProvider>
  )
}

export default MyApp
