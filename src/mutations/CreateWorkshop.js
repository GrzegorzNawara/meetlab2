import gql from 'graphql-tag'

export default gql`
  mutation createWorkshop(
      $id: ID!,
      $title: String!,
      $subtitle: String!,
      $date: String!,
      $PIN: String!,
      $owner: String!
  }
`
