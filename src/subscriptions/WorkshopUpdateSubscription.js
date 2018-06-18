import gql from 'graphql-tag'

export default gql`
subscription WorkshopUpdateSubscription {
  onUpdateWorkshop{
		id
		title
		subtitle
		owner
		PIN
	}
}`;
