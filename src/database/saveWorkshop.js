//import debug from '../debug'

const saveWorkshop = (data) => {
  fetch('http://api.ignifer-labs.com/mir-join/saveWorkshop.php',{
    method: 'post',
    body: JSON.stringify(data)
  }).then(result => result.json())
    .then(result => result);
}

export default saveWorkshop
