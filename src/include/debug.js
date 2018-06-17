function debug (expression, comment='', hide=false) {

  if(!hide) {
    console.error(comment + ': %o', expression);
  }

  return expression;
}

export default debug
