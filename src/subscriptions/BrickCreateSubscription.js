import gql from 'graphql-tag'

export default gql`
subscription BrickCreateSubscription {
  onCreateBrick {
    id
    super
    sort
    title
    subtitle
    owner
    PIN
    date
  }
}`;
