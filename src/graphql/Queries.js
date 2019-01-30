import gql from 'graphql-tag';

export const getBrick = gql`
query getBrick ($id: ID!){
  getBrick(id:$id)
  {
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
      params
      type
    }
  }
}`;
