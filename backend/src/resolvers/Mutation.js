import bcrypt from 'bcrypt';

const saltRound = process.env.SALT | 10;

const Mutation = {
    addFriend: async (parent, { name, friendName }, { userModel, pubSub }) => {
        const friend = await userModel.findOne({ name: friendName });
        if (!friend) {
            friend.ErrorMessage = "USER_NOT_FOUND";
            return friend;
        }
        const me = await userModel.findOne({ name: name });

        friend.friendRequest.push(me);
        await friend.save();

        pubSub.publish(`${friendName} add friend`, {
            friendAdded: friend
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
            friendAccepted: me
        });

        pubSub.publish(`${friendName} new friend`, {
            friendAccepted: friend
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
            friendRemoved: me
        });

        pubSub.publish(`${friendName} remove friend`, {
            friendRemoved: friend
        })

        return me;
    },
    register: async (parent, { name, password }, { userModel, pubSub }) => {

        // if username already exists
        const existUser = await userModel.findOne({ name: name });
        if (existUser) {
            existUser.ErrorMessage = "USER_EXIST";
            return existUser;
        }

        // create a new user
        const pass = bcrypt.hash(password, saltRound);
        const newUser = new userModel({ 
            name: name,
            password: pass,
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
            user.ErrorMessage = "USER_NOT_FOUND";
            return user;
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            user.ErrorMessage = "WRONG_PASSWORD";
            return user
        }

        user.status = "ONLINE";
        await user.save();

        pubSub.publish(`${name} status update`, {
            friendStatusUpdate: user
        });

        return user;
    },
    statusUpdate: async (parent, { name, status }, { userModel, pubSub }) => {
        const user = await userModel
            .findOne({ name: name })
            .populate({ path: "friends" });
        user.status = status;
        await user.save();
        
        pubSub.publish(`${name} status update`, {
            friendStatusUpdate: user
        });

        return user;
    },
    sendMessage: async (parent, { from, to, context }, { userModel, pubSub }) => {
        const receiver = await userModel.findOne({ name: to });
        receiver.messages.push({ from, to, context });
        receiver.messages = receiver.messages.slice(-5);
        await receiver.save();

        pubSub.publish(`${to} received message`, {
            messageReceived: receiver
        })

        return receiver;
    }
};

export default Mutation;