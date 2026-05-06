import { gql } from "@apollo/client"

export interface SkillRefType {
  documentId: string
  key: string
  name: string
  level: string | null
}

export interface SubCategoryType {
  id: string
  name: string
  skills: SkillRefType[]
}

export interface SkillCategoryType {
  documentId: string
  key: string
  name: string
  subCategories: SubCategoryType[]
}

export interface SkillCategoriesDataType {
  techs: SkillCategoryType[]
  knowHow: SkillCategoryType[]
  softSkills: SkillCategoryType[]
}

// Strapi 5 doesn't expose a single-by-numeric-id query the way v4 did. We look
// up each category by its stable `key` instead. The query returns an array
// (one entry per category), and the consumer takes the first item.
export const GET_SKILLS = gql`
  fragment SkillCategoryFragment on SkillCategory {
    documentId
    key
    name
    subCategories {
      id
      name
      skills {
        documentId
        key
        name
        level
      }
    }
  }

  query GET_SKILLS($locale: I18NLocaleCode) {
    techs: skillCategories(
      filters: { key: { eq: "techs" } }
      locale: $locale
    ) {
      ...SkillCategoryFragment
    }
    knowHow: skillCategories(
      filters: { key: { eq: "knowHow" } }
      locale: $locale
    ) {
      ...SkillCategoryFragment
    }
    softSkills: skillCategories(
      filters: { key: { eq: "softSkills" } }
      locale: $locale
    ) {
      ...SkillCategoryFragment
    }
  }
`
