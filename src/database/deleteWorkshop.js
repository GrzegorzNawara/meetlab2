//import debug from '../debug'

const deleteWorkshop = (workshop) => {
    fetch('http://api.ignifer-labs.com/mir-join/deleteWorkshop.php',{
      method: 'post',
      body: JSON.stringify({owner: workshop.owner, workshopId: workshop.super})
    }).then(result => result.json())
      .then(result => result);
}

export default deleteWorkshop
