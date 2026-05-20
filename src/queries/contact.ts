import { gql } from "@apollo/client"

export interface ContactDataType {
  createContact: {
    documentId: string
  }
}

export const CONTACT_ME = gql`
  mutation contact($data: ContactInput!) {
    createContact(data: $data) {
      documentId
    }
  }
`
