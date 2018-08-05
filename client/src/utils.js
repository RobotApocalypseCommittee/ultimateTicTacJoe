
export function reload(){
  window.location.replace(window.location.protocol + "//" + window.location.host + window.location.pathname);
}

export function areEqualShallow(a, b) {
  for(let key in a) {
    if(!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }
  for(let key in b) {
    if(!(key in a) || a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}