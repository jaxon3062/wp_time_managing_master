const Query = {
    getFriends: async (parent, { id }, { userModel }) => {
        const friends = await userModel.findById(id);
        return friends;
    },
    findUser: async (parent, { name }, { userModel }) => {
        const user = await userModel.find({ name: name });
        return user;
    },
    
};

export default Query;