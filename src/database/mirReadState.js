import debug from '../debug'

const mirReadState = (game, setResult) => {
    fetch('http://api.ignifer-labs.com/mir-sim/readState.php',{
      method: 'post',
      body: JSON.stringify({game: game})
    }).then(result => result.json())
        .catch((err) => {
          debug(err,'ERROR')
        })
      .then(result => setResult(result));
}

export default mirReadState
