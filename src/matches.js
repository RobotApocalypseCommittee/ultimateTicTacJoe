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

}

module.exports = new Matches();