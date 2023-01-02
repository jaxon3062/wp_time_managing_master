import userModel from "../models/user";

const Mutation = {
    addFriend: async (parent, { id, friendID }, { pubSub }) => {
        const friend = userModel.findById(friendID);
        const me = userModel.findById(id);

        friend.friendRequest.push(me);
        await friend.save();

        pubSub.publish(`${friendID} add friend`, {
            sender: me
        });

        return friend;
    },
    acceptFriend: async (parent, { id, friendID }, { pubSub }) => {
        const me = await userModel.findById(id);
        const friend = await userModel.findById(friendID);

        const myFriendReq = me.friendRequest.filter((fr) => (fr.id !== friendID));
        me.friendRequest = myFriendReq;

        me.friends.push(friend);
        await me.save();

        friend.friends.push(me);
        await friend.save();

        pubSub.publish(`${id} new friend`, {
            friend: friend
        });

        pubSub.publish(`${friendID} new friend`, {
            friend: me
        });

        return friend;
    },
    removeFriend: async (parent, { id, friendID }, { pubSub }) => {
        const me = await userModel.findById(id);
        const friend = await userModel.findById(friendID);

        let newFriendList = me.friends.filter((fr) => (fr.id !== friendID));
        me.friends = newFriendList;
        await me.save();

        newFriendList = friend.friends.filter((fr) => (fr.id !== id));
        friend.friends = newFriendList;
        await friend.save();

        return friend;
    },
    register: async (parent, { name }, { pubSub }) => {
        // TODO: crypt
        const newUser = await new userModel({ name: name }).save();
        return newUser;
    },

};

export default Mutation;