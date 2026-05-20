import { container, fadeInItemRapid } from "@/animations/pageContainer"
import Title from "@/components/Title"
import { cN } from "@/lib"
import { type SkillCategoryType } from "@/queries/stack"
import { AnimatePresence, motion as m } from "framer-motion"
import { Fragment } from "react"

interface ITechs {
  data: SkillCategoryType | undefined
  className?: string
}

const seeMoreClass = cN(
  "relative cursor-pointer w-10 h-10 md:w-10 md:h-10",
  "text-stone-50 hover:text-stone-800 transition-colors"
)

const DEFAULT_VISIBLE_COUNT = 4

export default function Techs({ className, data }: ITechs) {
  return (
    <div
      className={cN(
        " py-2 px-6 md:px-8 lg:py-8 lg:px-12 flex flex-col gap-4",
        className
      )}
    >
      {data?.subCategories.map((subCategory) => (
        <AnimatePresence key={subCategory.id}>
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            key={subCategory.id}
          >
            <Title.h3 className="mb-4" text={subCategory.name} />

            <div className="flex flex-wrap gap-4">
              {subCategory.skills.map((skill, index, arr) => (
                <Fragment key={skill.documentId}>
                  <m.span
                    key={skill.documentId}
                    variants={fadeInItemRapid}
                    className={cN(
                      "group relative whitespace-nowrap",
                      "before:absolute before:inset-0 before:bg-stone-800 before:rounded-full",
                      index >= DEFAULT_VISIBLE_COUNT ? "hidden" : "flex"
                    )}
                  >
                    <span
                      className={cN(
                        "relative overflow-hidden text-ellipsis rounded-full z-10 bg-stone-50 origin-top-left group-hover:-rotate-[2.5deg] transition-transform",
                        "px-4 py-2 md:px-8 md:py-2",
                        "after:absolute after:inset-0 after:border-b-4 after:border-r-4 after:border-stone-200 after:rounded-full"
                      )}
                    >
                      {skill.name}
                    </span>
                  </m.span>
                  {index + 1 === DEFAULT_VISIBLE_COUNT &&
                    arr.length > DEFAULT_VISIBLE_COUNT && (
                      <>
                        <input
                          type="checkbox"
                          id={"see-more-" + subCategory.name}
                          className="see-more"
                        />
                        <m.label
                          key="moreButton"
                          variants={fadeInItemRapid}
                          className={cN(
                            "group see-more-label flex items-center justify-center",
                            seeMoreClass
                          )}
                          htmlFor={"see-more-" + subCategory.name}
                          tabIndex={0}
                        >
                          <div
                            className={cN(
                              "relative block material-icons text-3xl",
                              "before:absolute before:text-lg before:-top-3 before:-right-3 before:font-[inherit] before:content-['add']",
                              "group-hover:before:-top-4 group-hover:before:-right-4 before:transition-[top,right]"
                            )}
                          >
                            visibility
                          </div>
                        </m.label>
                      </>
                    )}
                </Fragment>
              ))}
              {subCategory.skills.length > DEFAULT_VISIBLE_COUNT && (
                <m.label
                  key="moreButton"
                  variants={fadeInItemRapid}
                  className={cN(
                    "group hidden items-center justify-center",
                    seeMoreClass
                  )}
                  htmlFor={"see-more-" + subCategory.name}
                  tabIndex={0}
                >
                  <div
                    className={cN(
                      "relative block material-icons text-3xl",
                      "before:absolute before:text-lg  before:-top-3 before:-right-3 before:font-[inherit] before:content-['remove']",
                      "group-hover:before:-top-4 group-hover:before:-right-4 before:transition-[top,right]"
                    )}
                  >
                    visibility
                  </div>
                </m.label>
              )}
            </div>
          </m.div>
        </AnimatePresence>
      ))}
    </div>
  )
}
