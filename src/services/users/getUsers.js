import userData from "../../data/users.json" assert { type: "json" };

const getUsers = (name, username) => {
    let users = userData.users;

    if (name) {
        users = users.filter(user => user.name === name);
    }

    if (username !== undefined) {
        users = users.filter(user => user.username === JSON.parse(username));
    }

    return users;
};

export default getUsers;