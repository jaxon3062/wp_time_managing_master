const Query = {
    getFriends: async (parent, { name }, { userModel }) => {
        const user = await userModel.findOne(name);
        return user.friends;
    },
    findUser: async (parent, { name }, { userModel }) => {
        const user = await userModel.find({ name: name });
        return user;
    },

};

export default Query;