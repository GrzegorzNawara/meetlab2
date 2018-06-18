import gql from 'graphql-tag'

export default gql`
  mutation createWorkshop(
      $id: ID!,
      $title: String!,
      $subtitle: String!,
      $owner: String!,
      $PIN: String!,
      $date: String!
    ) {
    createWorkshop(input: {
      id: $id,
      title: $title,
      subtitle: $subtitle,
      owner: $owner,
      PIN: $PIN,
      date: $date
    }) {
      id
  		title
  		subtitle
  		owner
  		PIN
      date
    }
  }
`
