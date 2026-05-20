"use client"

import { PAGE_ANIM_MS } from "@/constants"
import useTabs from "@/hooks/useTabs"
import { motion as m } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { appearFromLeft, appearFromRight } from "../../animations/pageContainer"

export default function Arrows() {
  const [scrollQty, setScrollQty] = useState(0)
  const { previousTab, currentTab, nextTab } = useTabs()
  const { push } = useRouter()
  const previousTabUrl = previousTab?.url
  const nextTabUrl = nextTab?.url
  const lastExecutionTime = useRef(0)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentTime = Date.now()
      if (currentTime - lastExecutionTime.current < PAGE_ANIM_MS) return

      if (event.key === "ArrowLeft" && previousTabUrl) {
        push(previousTabUrl)
      } else if (event.key === "ArrowRight" && nextTabUrl) {
        push(nextTabUrl)
      }

      lastExecutionTime.current = currentTime
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [push, previousTabUrl, nextTabUrl])

  if (!currentTab) return null

  return (
    <>
      {previousTabUrl && (
        <m.div
          className="group hidden lg:block absolute left-0 top-1/2 z-20"
          {...appearFromLeft}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            className="block group-hover:-translate-x-1.5 transition-transform"
            href={previousTabUrl}
            onClick={() => setScrollQty(0)}
            tabIndex={10}
          >
            <span
              className="material-icons text-5xl lg:text-7xl"
              style={{
                transform: `scale(${
                  1 + (scrollQty < 0 ? Math.abs(scrollQty) / 5 : 0)
                })`,
                transformOrigin: "center left",
                transition: "transform 0.25s",
              }}
            >
              chevron_left
            </span>
          </Link>
        </m.div>
      )}

      {nextTabUrl && (
        <m.div
          className="group hidden lg:block absolute right-0 top-1/2 z-20"
          {...appearFromRight}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            className="block group-hover:translate-x-1.5 transition-transform"
            href={nextTabUrl}
            onClick={() => setScrollQty(0)}
            tabIndex={11}
          >
            <span
              className="material-icons text-5xl lg:text-7xl"
              style={{
                transform: `scale(${
                  1 + (scrollQty > 0 ? Math.abs(scrollQty) / 5 : 0)
                })`,
                transformOrigin: "center right",
                transition: "transform 0.25s",
              }}
            >
              chevron_right
            </span>
          </Link>
        </m.div>
      )}
    </>
  )
}
