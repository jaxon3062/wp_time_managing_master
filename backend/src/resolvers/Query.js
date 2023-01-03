const Query = {
    getFriends: async (parent, { name }, { userModel }) => {
        const user = await userModel
            .findOne({ name: name })
            .populate({ path: "friends" });
        return user.friends;
    },
    findUser: async (parent, { name }, { userModel }) => {
        const user = await userModel
            .findOne({ name: name })
            .populate({ path: "friendRequest" })
            .populate({ path: "friends" });
        return user;
    },

};

export default Query;