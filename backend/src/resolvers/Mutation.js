import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

const saltRound = process.env.SALT | 10;

const Mutation = {
  addFriend: async (parent, { name, friendName }, { userModel, pubSub }) => {
    const friend = await userModel
      .findOne({ name: friendName })
      .populate({ path: "friends" })
      .populate({ path: "friendRequest" });
    if (!friend) {
      throw GraphQLError("USER_NOT_FOUND");
    }
    const me = await userModel.findOne({ name: name });

    friend.friendRequest.push(me);
    await friend.save();

    pubSub.publish(`${friendName} update friend`, {
      friendUpdate: friend,
    });

    return friend;
  },
  acceptFriend: async (parent, { name, friendName }, { userModel, pubSub }) => {
    const me = await userModel
      .findOne({ name: name })
      .populate({ path: "friendRequest" })
      .populate({ path: "friends" });
    const friend = await userModel
      .findOne({ name: friendName })
      .populate({ path: "friendRequest" })
      .populate({ path: "friends" });

    const myFriendReq = me.friendRequest.filter((fr) => fr.name !== friendName);
    me.friendRequest = myFriendReq;

    console.log(me.friends);
    me.friends.push(friend);
    await me.save();

    console.log(friend.friends);
    friend.friends.push(me);
    await friend.save();

    pubSub.publish(`${name} update friend`, {
      friendUpdate: me,
    });

    pubSub.publish(`${friendName} update friend`, {
      friendUpdate: friend,
    });

    return friend;
  },
  rejectFriend: async (parent, { name, friendName }, { userModel, pubSub }) => {
    const me = await userModel
      .findOne({ name: name })
      .populate({ path: "friendRequest" })
      .populate({ path: "friends" });

    const myFriendReq = me.friendRequest.filter((fr) => fr.name !== friendName);
    me.friendRequest = myFriendReq;

    await me.save();

    pubSub.publish(`${name} update friend`, {
      friendUpdate: me,
    });

    return me;
  },
  removeFriend: async (parent, { name, friendName }, { userModel, pubSub }) => {
    const friend = await userModel
      .findOne({ name: friendName })
      .populate({ path: "friends" })
      .populate({ path: "friendRequest" });

    if (!friend) throw GraphQLError("USER_NOT_FOUND");

    const me = await userModel
      .findOne({ name: name })
      .populate({ path: "friends" })
      .populate({ path: "friendRequest" });

    let newFriendList = me.friends.filter((fr) => fr.name !== friendName);
    me.friends = newFriendList;
    await me.save();

    newFriendList = friend.friends.filter((fr) => fr.name !== name);
    friend.friends = newFriendList;
    await friend.save();

    pubSub.publish(`${name} update friend`, {
      friendUpdate: me,
    });

    pubSub.publish(`${friendName} update friend`, {
      friendUpdate: friend,
    });

    return me;
  },
  register: async (parent, { name, password }, { userModel, pubSub }) => {
    // if username already exists
    const existUser = await userModel.findOne({ name: name });
    if (existUser) {
      throw new GraphQLError("USER_EXIST");
    }

    // create a new user
    const pass = await bcrypt.hash(password, saltRound);
    const newUser = new userModel({
      name: name,
      password: pass,
      status: "OFFLINE",
      content: "",
      message: "",
    });
    await newUser.save();
    return newUser;
  },
  logIn: async (parent, { name, password }, { userModel, pubSub }) => {
    const user = await userModel
      .findOne({ name: name })
      .populate({ path: "friends" });

    // if user not exist
    if (!user) {
      throw new GraphQLError("USER_NOT_FOUND");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new GraphQLError("WRONG_PASSWORD");
    }

    user.status = "ONLINE";
    user.content = "";
    user.message = "";
    await user.save();

    for (let fr of user.friends) {
      pubSub.publish(`${fr.name} status update`, {
        friendStatusUpdate: user,
      });
    }

    return user;
  },
  statusUpdate: async (
    parent,
    { name, status, content },
    { userModel, pubSub }
  ) => {
    const user = await userModel
      .findOne({ name: name })
      .populate({ path: "friends" });
    user.status = status;
    user.content = status === "STUDY" ? content : "";
    await user.save();

    for (let fr of user.friends) {
      pubSub.publish(`${fr.name} status update`, {
        friendStatusUpdate: user,
      });
    }

    return user;
  },
  sendMessage: async (parent, { name, context }, { userModel, pubSub }) => {
    const user = await userModel
      .findOne({ name: name })
      .populate({ path: "friends" });
    user.message = context;
    await user.save();

    for (let fr of user.friends) {
      pubSub.publish(`${fr.name} received message`, {
        messageReceived: user,
      });
    }

    return user;
  },
};

export default Mutation;
