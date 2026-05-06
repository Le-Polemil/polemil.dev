import { useMediaQuery } from "usehooks-ts"

import {
  appearFromBottom,
  appearFromLeft,
  appearFromRight,
  appearFromTop,
} from "@/animations/pageContainer"
import { GET_TABS, TabsDataType } from "@/queries/tabs"
import { useQuery } from "@apollo/client"
import { usePathname } from "next/navigation"
import { useTranslation } from "react-i18next"

const useAnimatePageProps = (previousRoute: string) => {
  const isNotMobile = useMediaQuery("(min-width: 768px)")
  const { i18n } = useTranslation()
  const { data } = useQuery<TabsDataType>(GET_TABS, {
    variables: { locale: i18n.language },
  })
  const currentRoute = usePathname()

  const tabs = data?.tabs ?? []

  const currentTabIndex = tabs.findIndex((tab) => tab.url === currentRoute)
  const previousTabIndex = tabs.findIndex((tab) => tab.url === previousRoute)

  if (currentTabIndex === -1) return appearFromBottom
  if (previousTabIndex === -1) return appearFromTop

  if (isNotMobile) {
    return currentTabIndex > previousTabIndex ? appearFromRight : appearFromLeft
  }
  return currentTabIndex > previousTabIndex ? appearFromBottom : appearFromTop
}

export default useAnimatePageProps
