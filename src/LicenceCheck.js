//import React from 'react';
//import debug from './debug'

const LicenceCheck = ({setMG}) => {

  localStorage.removeItem('mg','');
  if(localStorage.getItem('licence'))
    fetch('http://api.ignifer-labs.com/mir-join/licence.php?licence='+localStorage.getItem('licence'), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      if(response) localStorage.setItem('mg',response);
      setMG(response);
    });

  return null
}

export default LicenceCheck;
