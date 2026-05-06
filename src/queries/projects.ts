import { gql } from "@apollo/client"
import { type ImageDataType } from "."

export interface ProjectSkillRefType {
  documentId: string
  key: string
  name: string
  level: string | null
}

export interface ProjectType {
  documentId: string
  order: number
  key: string
  name: string
  subTitle?: string | null
  description?: string | null
  details?: string | null
  dateInfos?: string | null
  link?: string | null
  githubLink?: string | null
  isPaused?: boolean
  isDone?: boolean
  isDev?: boolean
  skills?: ProjectSkillRefType[]
  image: ImageDataType | null
}

export interface ProjectsDataType {
  projects: ProjectType[]
}

export const GET_PROJECTS = gql`
  query findProjects($locale: I18NLocaleCode) {
    projects(
      sort: "order"
      filters: { order: { gte: 0 } }
      pagination: { limit: 50 }
      locale: $locale
    ) {
      documentId
      order
      key
      name
      subTitle
      description
      details
      dateInfos
      link
      githubLink
      isPaused
      isDone
      isDev
      skills {
        documentId
        key
        name
        level
      }
      image {
        documentId
        name
        alternativeText
        width
        height
        caption
        url
      }
    }
  }
`
