//import debug from '../debug'

const listBricks = ( owner, workshopId, setResult ) => {
  if(owner!==undefined)
    fetch('http://api.ignifer-labs.com/raven-join/listBricks.php',{
      method: 'post',
      body: JSON.stringify({owner: owner, workshopId: workshopId})
    }).then(result => result.json())
      .then(result => setResult(result));
}

export default listBricks
