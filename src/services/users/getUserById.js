import userData from "../../data/users.json" assert { type: "json" };
import NotFoundError from "../../errors/NotFoundError.js";

const getUserById = (id) => {
    const user = userData.users.find(user => user.id === id);

    if (!user) {
        throw new NotFoundError("User", id);
    }
    return user;
};

export default getUserById;