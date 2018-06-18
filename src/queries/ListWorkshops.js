import gql from 'graphql-tag';

export default gql`
query listWorkshops {
  listWorkshops {
    items {
      id
      title
      subtitle
      owner
      PIN
      date
    }
  }
}`
