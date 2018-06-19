import gql from 'graphql-tag';

export default gql`
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
}`
