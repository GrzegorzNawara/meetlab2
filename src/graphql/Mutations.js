import gql from 'graphql-tag'

export const updateBrick = gql`
  mutation updateBrick(
      $id: ID!,
      $super: String!,
      $sort: String!,
      $title: String!,
      $subtitle: String!,
      $owner: String!,
      $PIN: String,
      $date: String
    ) {
    updateBrick(input: {
      id: $id,
      super: $super,
      sort: $sort,
      title: $title,
      subtitle: $subtitle,
      owner: $owner,
      PIN: $PIN,
      date: $date
    }) {
      id
      super
      sort
  		title
  		subtitle
  		owner
  		PIN
      date
    }
  }
`


export const createBrick = gql`
  mutation createBrick(
      $id: ID!,
      $super: String!,
      $sort: String!,
      $title: String!,
      $subtitle: String!,
      $owner: String!,
      $PIN: String,
      $date: String
    ) {
    createBrick(input: {
      id: $id,
      super: $super,
      sort: $sort,
      title: $title,
      subtitle: $subtitle,
      owner: $owner,
      PIN: $PIN,
      date: $date
    }) {
      id
      super
      sort
  		title
  		subtitle
  		owner
  		PIN
      date
    }
  }
`
