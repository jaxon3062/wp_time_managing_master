import userModel from "./models/user";

const pass = '$2b$10$QMx45L5VyXB/LuLrJA.iheh1Ke4zaJoNc6FpUIafosZ4F7lvsrGIa'

const example = [
  {
    name: "Adam",
    password: pass,
    status: "OFFLINE",
    friends: [],
    messages: [],
    friendRequests: [],
  },
  {
    name: "Betty",
    password: pass,
    status: "OFFLINE",
    friends: [],
    messages: [],
    friendRequests: [],
  },
  {
    name: "Cindy",
    password: pass,
    status: "OFFLINE",
    friends: [],
    messages: [],
    friendRequests: [],

  },
  {
    name: "Daniel",
    password: pass,
    status: "OFFLINE",
    friends: [],
    messages: [],
    friendRequests: [],
  },
  {
    name: "Ethan",
    password: pass,
    status: "OFFLINE",
    friends: [],
    messages: [],
    friendRequests: [],
  },
];

const dataInit = async () => {
  await userModel.deleteMany({});
  await userModel.insertMany(example);
  console.log("Database initialized!");
};

export { dataInit };