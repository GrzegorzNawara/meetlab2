import gql from 'graphql-tag'

export const onCreateBrick = gql`
subscription onCreateBrick {
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


export const onUpdateBrick = gql`
subscription onUpdateBrick {
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

export const onDeleteBrick = gql`
subscription onDeleteBrick {
  onDeleteBrick {
    id
  }
}`;