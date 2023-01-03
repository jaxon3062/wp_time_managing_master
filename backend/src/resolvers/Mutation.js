import userModel from "../models/user";

const Mutation = {
    addFriend: async (parent, { name, friendName }, { pubSub }) => {
        const friend = userModel.findOne({ name: friendName });
        if (!friend) {
            return friend;
        }
        const me = userModel.findOne({ name: name });

        friend.friendRequest.push(me);
        await friend.save();

        pubSub.publish(`${friendName} add friend`, {
            friendAdded: me
        });

        return friend;
    },
    acceptFriend: async (parent, { name, friendName }, { pubSub }) => {
        const me = await userModel.findOne(name);
        const friend = await userModel.findOne(friendName);

        const myFriendReq = me.friendRequest.filter((fr) => (fr.id !== friendID));
        me.friendRequest = myFriendReq;

        me.friends.push(friend);
        await me.save();

        friend.friends.push(me);
        await friend.save();

        pubSub.publish(`${name} new friend`, {
            friendAccepted: friend
        });

        pubSub.publish(`${friendName} new friend`, {
            friendAccepted: me
        });

        return friend;
    },
    removeFriend: async (parent, { name, friendName }, { pubSub }) => {
        const me = await userModel.findOne(name);
        const friend = await userModel.findOne(friendName);

        let newFriendList = me.friends.filter((fr) => (fr.name !== friendName));
        me.friends = newFriendList;
        await me.save();

        newFriendList = friend.friends.filter((fr) => (fr.name !== name));
        friend.friends = newFriendList;
        await friend.save();

        pubSub.publish(`${name} remove friend`, {
            friendRemoved: friend
        });

        pubSub.publish(`${friendName} remove friend`, {
            friendRemoved: me
        })

        return friend;
    },
    register: async (parent, { name }, { pubSub }) => {
        // TODO: crypt

        // if username already exists
        const existUser = userModel.findOne({ name: name });
        if (existUser) {
            existUser.name = "";
            return existUser;
        }

        // create a new user
        const newUser = await new userModel({ 
            name: name,
            status: "OFFLINE",
        }).save();
        return newUser;
    },
    logIn: async (parent, { name, password }, { pubSub }) => {
        // todo: crypt
        const user = userModel.findOneAndUpdate(
            { name: name },
            {
                $set: {
                    status: "ONLINE",
                }
            }
        );

        // TODO: if user not exist
        if (!user) {
            return user;
        }

        pubSub.publish(`${name} status update`, {
            friendStatusUpdate: user
        });

        return user;
    },
    statusUpdate: async (parent, { name, status }, { pubSub }) => {
        const user = await userModel.findOneAndUpdate(
            { name: name }, 
            {
                $set: {
                    status: status,
                }
            }
        );
        
        pubSub.publish(`${name} status update`, {
            friendStatusUpdate: user
        });

        return user;
    },
};

export default Mutation;