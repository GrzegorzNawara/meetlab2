import debug from '../debug'

const saveMsg = (data) => {
  fetch('http://api.ignifer-labs.com/mir-sim/saveMsg.php',{
    method: 'post',
    body: JSON.stringify(data)
  }).then(result => result.json())
    .then(result => debug(result,'SAVE MIR'));
}

export default saveMsg
