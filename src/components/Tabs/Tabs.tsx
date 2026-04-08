import { motion as m } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTranslation } from "react-i18next"

import { container } from "@/animations/pageContainer"
import useTabs from "@/hooks/useTabs"
import { cN, findMinimalDiff } from "@/lib"
import { useRouter } from "next/router"
import { useSwipeable } from "react-swipeable"
import Tab from "../Tab"

export default function Tabs() {
  const pathname = usePathname()
  const [t] = useTranslation()

  const { loading, tabs, currentTab, previousTab, nextTab } = useTabs()
  const currentTabOrder = currentTab?.attributes?.order

  const previousTabUrl = previousTab?.attributes?.url,
    nextTabUrl = nextTab?.attributes?.url

  const { push } = useRouter()
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextTabUrl && push(nextTabUrl),
    onSwipedRight: () => previousTabUrl && push(previousTabUrl),
  })

  if (loading) return null

  return (
    <m.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cN(
        "tabs lg:px-8 shadow-around",
        "flex lg:gap-x-0 justify-evenly lg:justify-between"
      )}
      {...swipeHandlers}
    >
      {tabs.map(({ attributes }) => {
        if (!attributes) return null
        const { key, order, url, icon } = attributes

        const minimalDiff = findMinimalDiff(tabs, currentTabOrder ?? 0, order)
        const absoluteDiff = Math.abs(minimalDiff)

        let orderOnMobile
        if (absoluteDiff <= 2) {
          orderOnMobile = 3 + minimalDiff
        }

        return (
          <Tab
            key={key}
            id={key}
            url={url ?? "/" + key}
            index={order}
            orderOnMobile={orderOnMobile}
            className={cN(
              currentTabOrder === order
                ? cN("active", "text-stone-50")
                : "text-stone-800 hover:text-stone-200"
            )}
            icon={icon}
            text={t(`tab.v2.${key}`, t(`tab.${key}`))}
          />
        )
      })}
    </m.div>
  )
}
