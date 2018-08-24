// A class to abstractify the storage for matches, just in case a real database is required.

class Matches {
  constructor() {
    this.matches = {}
  }

  get_match(id) {
    return this.matches[id]
  }

  add_match(match) {
    this.matches[match.id] = match;
    return match
  }

  remove_match(id) {
    delete this.matches[id];
  }

  generate_new_id(){
    let potential = (Math.round(Math.random()*899999)+100000).toString();
    if (this.matches.hasOwnProperty(potential)) {
      return this.generate_new_id()
    } else {
      return potential
    }
  }

}

module.exports = new Matches();
