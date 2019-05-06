//import debug from '../debug'

const saveMsg = (data) => {
  fetch('http://api.ignifer-labs.com/mir-sim/saveMsgFast.php',{
    method: 'post',
    body: JSON.stringify(data)
  }).then(result => result.json())
    .then(result => result);

  fetch('http://api.ignifer-labs.com/mir-sim/saveMsg.php',{
    method: 'post',
    body: JSON.stringify(data)
  }).then(result => result.json())
    .then(result => result);
}

export default saveMsg
