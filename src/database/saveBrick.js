//import debug from '../debug'

const saveBrick = (data) => {
  fetch('http://api.ignifer-labs.com/mir-join/saveBrick.php',{
    method: 'post',
    body: JSON.stringify(data)
  }).then(result => result.json())
    .then(result => result);
}

export default saveBrick
