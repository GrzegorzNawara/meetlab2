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
      $date: String,
      $params: String,
      $type: String
    ) {
    updateBrick(input: {
      id: $id,
      super: $super,
      sort: $sort,
      title: $title,
      subtitle: $subtitle,
      owner: $owner,
      PIN: $PIN,
      date: $date,
      params: $params,
      type: $type
    }) {
      id
      super
      sort
  		title
  		subtitle
  		owner
  		PIN
      date
      params
      type
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
      $date: String,
      $params: String,
      $type: String
    ) {
    createBrick(input: {
      id: $id,
      super: $super,
      sort: $sort,
      title: $title,
      subtitle: $subtitle,
      owner: $owner,
      PIN: $PIN,
      date: $date,
      params: $params,
      type: $type
    }) {
      id
      super
      sort
  		title
  		subtitle
  		owner
  		PIN
      date
      params
      type
    }
  }
`
