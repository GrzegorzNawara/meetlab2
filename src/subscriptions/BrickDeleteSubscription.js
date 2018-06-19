import gql from 'graphql-tag'

export default gql`
subscription BrickDeleteSubscription {
  onDeleteBrick {
    id
  }
}`;
