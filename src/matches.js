// A class to abstractify the storage for matches, just in case a real database is required.

class Matches {
    constructor() {
        this.matches = {}
    }
    get_match(id) {
        return this.matches[id]
    }
    create_match(){
        var new_match = new Match();
        this.matches[new_match.id] = new_match;
        return new_match
    }
    remove_match(id){
        delete this.matches[id];
    }

}

module.exports = new Matches();