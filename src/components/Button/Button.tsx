import { cN } from "@/lib"
import { ButtonHTMLAttributes, ReactNode } from "react"

export enum Colors {
  INDIGO = "indigo",
  PURPLISH = "purplish",
  BLACK = "black",
  BLUE = "blue",
  WHITE = "white",
}

export enum Sizes {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface IButton
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  children?: ReactNode
  text?: string
  icon?: string
  color?: Colors
  rounded?: boolean
  borderless?: boolean
  noPressAnim?: boolean
  padding?: string
  size?: Sizes
}

const BUTTON_COLOR = {
  [Colors.BLACK]: "text-stone-800 hover:text-stone-50 active:text-stone-200",
  [Colors.INDIGO]: "text-indigo-500 hover:text-stone-50 active:text-stone-200",
  [Colors.BLUE]: "text-blue-500 hover:text-stone-50 active:text-stone-200",
  [Colors.PURPLISH]:
    "text-purplish-600 hover:text-stone-50 active:text-stone-200",
  [Colors.WHITE]: "text-stone-50 hover:text-stone-800 active:text-red-400",
}

const BUTTON_BG = {
  [Colors.BLACK]: "hover:bg-stone-800 active:bg-stone-900",
  [Colors.INDIGO]: "hover:bg-indigo-500 active:bg-indigo-600",
  [Colors.BLUE]: "hover:bg-blue-500 active:bg-blue-600",
  [Colors.PURPLISH]: "hover:bg-purplish-600 active:bg-purplish-700",
  [Colors.WHITE]: "hover:bg-stone-50 active:bg-stone-100",
}

const BUTTON_BORDER = {
  [Colors.BLACK]: "border-stone-800 active:border-stone-900",
  [Colors.INDIGO]: "border-indigo-500 active:border-indigo-600",
  [Colors.BLUE]: "border-blue-500 active:border-blue-600",
  [Colors.PURPLISH]: "border-purplish-600 active:border-purplish-700",
  [Colors.WHITE]: "border-stone-50 active:border-stone-100",
}

const BORDERLESS_COLOR = {
  [Colors.BLACK]: "text-stone-200 hover:text-stone-50",
  [Colors.INDIGO]: "text-stone-200 hover:text-stone-50",
  [Colors.BLUE]: "text-stone-200 hover:text-stone-50",
  [Colors.PURPLISH]: "text-stone-200 hover:text-stone-50",
  [Colors.WHITE]: "text-stone-800 hover:text-red-400",
}
const BORDERLESS_BG = {
  [Colors.BLACK]: "bg-stone-800 hover:bg-stone-900 active:bg-stone-950",
  [Colors.INDIGO]: "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700",
  [Colors.BLUE]: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
  [Colors.PURPLISH]:
    "bg-purplish-600 hover:bg-purplish-700 active:bg-purplish-800",
  [Colors.WHITE]: "bg-stone-50 hover:bg-stone-100 active:bg-stone-200",
}
const SHADOW_COLOR = {
  [Colors.BLACK]: "after:border-stone-950",
  [Colors.INDIGO]: "after:border-indigo-700",
  [Colors.BLUE]: "after:border-blue-700",
  [Colors.PURPLISH]: "after:border-purplish-800",
  [Colors.WHITE]: "after:border-stone-300",
}
const FONT_SIZE = {
  [Sizes.SMALL]: "text-sm md:text-md",
  [Sizes.MEDIUM]: "text-lg md:text-xl",
  [Sizes.LARGE]: "text-2xl md:text-3xl",
}
const PADDING = {
  [Sizes.SMALL]: "px-2 py-1 md:px-3 md:py-1.5",
  [Sizes.MEDIUM]: "px-3 py-2 md:px-5 md:py-2.5",
  [Sizes.LARGE]: "px-4 py-3 md:px-6 md:py-3.5",
}

export default function Button({
  children,
  text,
  icon,
  color = Colors.INDIGO,
  rounded = false,
  borderless = false,
  noPressAnim = false,
  padding,
  className,
  size = Sizes.MEDIUM,
  ...otherProps
}: IButton) {
  return (
    <button
      {...otherProps}
      className={cN(
        "flex justify-center items-center outline-none hover:shadow-lg active:shadow-sm",
        "font-archivo transition-all",
        FONT_SIZE[size],
        padding ?? PADDING[size],
        !borderless && "border-4",
        rounded && "rounded-lg after:rounded-lg",
        !noPressAnim && "active:translate-y-0.5",
        borderless ? BORDERLESS_COLOR[color] : BUTTON_COLOR[color],
        borderless ? BORDERLESS_BG[color] : BUTTON_BG[color],
        borderless &&
          "relative after:absolute after:inset-0 after:border-b-4 after:border-r-4",
        borderless ? SHADOW_COLOR[color] : BUTTON_BORDER[color],
        className
      )}
    >
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {children}
      </span>

      {(text || icon) && (
        <div className="flex gap-2 justify-center items-center">
          {text && <span>{text}</span>}
          {icon && (
            <span className="material-icons text-3xl font-bold">{icon}</span>
          )}
        </div>
      )}
    </button>
  )
}
