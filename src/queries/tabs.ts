import { gql } from "@apollo/client"

export interface TabType {
  documentId: string
  key: string
  label: string
  icon: string
  url: string
  order: number
}

export interface TabsDataType {
  tabs: TabType[]
}

export const GET_TABS = gql`
  query findTabs($locale: I18NLocaleCode) {
    tabs(
      sort: "order"
      filters: { order: { gte: 0 } }
      locale: $locale
    ) {
      documentId
      order
      key
      label
      icon
      url
    }
  }
`
