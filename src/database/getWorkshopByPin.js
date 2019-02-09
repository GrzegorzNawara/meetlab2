//import debug from '../debug'

const getWorkshopByPin = ( pin, setResult ) => {
  fetch('http://api.ignifer-labs.com/mir-join/getWorkshopByPin.php',{
    method: 'post',
    body: JSON.stringify({PIN: pin})
  }).then(result => result.json())
    .then(result => setResult(result));
}

export default getWorkshopByPin
