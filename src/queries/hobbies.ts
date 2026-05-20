import { gql } from "@apollo/client"
import { type ImageDataType } from "."

export interface HobbyType {
  documentId: string
  key: string
  name: string
  description: string
  icon: string
  media: ImageDataType | null
}

export interface HobbiesDataType {
  hobbies: HobbyType[]
}

export const GET_HOBBIES = gql`
  query findHobbies($locale: I18NLocaleCode) {
    hobbies(locale: $locale) {
      documentId
      key
      name
      description
      icon
      media {
        documentId
        url
        name
        alternativeText
        width
        height
      }
    }
  }
`
