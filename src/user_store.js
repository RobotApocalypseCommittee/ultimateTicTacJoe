const nanoid = require("nanoid");

class UserStore {


    constructor() {
        this.current_users = {};
    }

    add_user(user) {
        var id = nanoid();
        user.on("disconnect", () => {
          console.log("User %s disconnected.", id)
            this.remove_user(id);
        });
        this.current_users[id] = user;
        return id;
    }

    get_user(id) {
        return this.current_users[id];
    }

    remove_user(id) {
        delete this.current_users[id];
    }
}

module.exports = new UserStore();