import { v4 as uuidv4 } from 'uuid';

const Mutation = {
    addFriend: async (parent, { name, friendName }, { userModel, pubSub }) => {
        const friend = await userModel.findOne({ name: friendName });
        if (!friend) {
            return friend;
        }
        const me = await userModel.findOne({ name: name });

        friend.friendRequest.push(me);
        await friend.save();

        pubSub.publish(`${friendName} add friend`, {
            friendAdded: me
        });

        return friend;
    },
    acceptFriend: async (parent, { name, friendName }, { userModel, pubSub }) => {
        const me = await userModel
            .findOne({ name: name })
            .populate({ path: "friendRequest" })
            .populate({ path: "friends" });
        const friend = await userModel.findOne({ name: friendName })
            .populate({ path: "friends" });

        const myFriendReq = me.friendRequest.filter((fr) => (fr.name !== friendName));
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
    removeFriend: async (parent, { name, friendName }, { userModel, pubSub }) => {
        const me = await userModel
            .findOne({ name: name })
            .populate({ path: "friends" });
        const friend = await userModel
            .findOne({ name: friendName })
            .populate({ path: "friends" });

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
    register: async (parent, { name, password }, { userModel, pubSub }) => {
        // TODO: crypt

        // if username already exists
        const existUser = await userModel.findOne({ name: name });
        if (existUser) {
            existUser.name = "";
            return existUser;
        }

        // create a new user
        const newUser = new userModel({ 
            id: uuidv4(),
            name: name,
            status: "OFFLINE",
        });
        await newUser.save();
        return newUser;
    },
    logIn: async (parent, { name, password }, { userModel, pubSub }) => {
        // todo: crypt
        const user = await userModel.findOne({ name: name });

        // if user not exist
        if (!user) {
            return user;
        }

        user.status = "ONLINE";
        await user.save();

        pubSub.publish(`${name} status update`, {
            friendStatusUpdate: user
        });

        return user;
    },
    statusUpdate: async (parent, { name, status }, { userModel, pubSub }) => {
        const user = await userModel.findOne({ name: name }); 
        user.status = status;
        await user.save();
        
        pubSub.publish(`${name} status update`, {
            friendStatusUpdate: user
        });

        return user;
    },
};

export default Mutation;