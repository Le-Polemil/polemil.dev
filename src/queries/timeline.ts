import { gql } from "@apollo/client"

export interface EducationType {
  documentId: string
  key: string
  grade: string
  name: string
  yearStart: number
  yearEnd: number
  school: string
  city: string
}

export interface JobMissionType {
  id: string
  text: string
}

export interface JobType {
  documentId: string
  key: string
  title: string
  missions: JobMissionType[]
  company: string
  companyDetails: string
  dateStart: string
  dateEnd: string
}

export interface TimelineDataType {
  educations: EducationType[]
  jobs: JobType[]
}

export const GET_TIMELINE = gql`
  query findTimeline($locale: I18NLocaleCode) {
    educations(locale: $locale, sort: "yearStart:desc") {
      documentId
      key
      grade
      name
      yearStart
      yearEnd
      school
      city
    }
    jobs(locale: $locale, sort: "dateStart:desc") {
      documentId
      key
      title
      missions {
        id
        text
      }
      company
      companyDetails
      dateStart
      dateEnd
    }
  }
`
