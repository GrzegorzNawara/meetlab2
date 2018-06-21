import gql from 'graphql-tag';

export const getKey = gql`
query getKey ($id: ID!){
  getKey(id:$id)
  {
    id
    owner
    validFrom
    validTo
    used
    capacity
  }
}`;

export const listBricks = gql`
query listBricks ($super: String){
  listBricks (super: $super){
    items {
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
}`;
