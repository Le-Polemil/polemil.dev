import { CSSProperties } from "react"

export interface IPageProps {
  previousRoute: string
  pathname: string
}

export interface IIcon {
  size?: string | number
  width?: string | number
  height?: string | number
  color?: string
  textColor?: string
  className?: string
  style?: CSSProperties
  shouldntPreserveRatio?: boolean
}

export interface WithClassNameProps {
  className?: string
}

export interface ICard {
  image?: {
    url: string
    alternativeText?: string | null
    width: number
    height: number
    name: string
  }
  title: string
  description: string
}
