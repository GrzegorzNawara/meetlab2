import gql from 'graphql-tag'

export default gql`
subscription WorkshopCreateSubscription {
  onCreateWorkshop {
    id
    title
    subtitle
    owner
    PIN
    date
  }
}`;
