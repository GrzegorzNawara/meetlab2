//import debug from '../debug'

const lastMod = ( lastMod, setResult ) => {
  if(lastMod!==undefined)
    fetch('http://api.ignifer-labs.com/mir-join/lastMod.php',{
      method: 'post',
      body: JSON.stringify({ lastMod: lastMod })
    }).then(result => result.json())
      .then(result => setResult(result));
}

export default lastMod
