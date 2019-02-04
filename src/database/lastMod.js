//import debug from '../debug'

const lastMod = ( owner, setResult ) => {
  if(owner!==undefined)
    fetch('http://api.ignifer-labs.com/raven-join/lastMod.php',{
      method: 'post',
      body: JSON.stringify({owner: owner})
    }).then(result => result.json())
      .then(result => setResult(result));
}

export default lastMod
