import gql from 'graphql-tag'

export default gql`
subscription BrickUpdateSubscription {
  onUpdateBrick{
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
