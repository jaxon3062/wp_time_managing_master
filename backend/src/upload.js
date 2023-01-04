import userModel from "./models/user";
import bcrypt from 'bcrypt';

const pass = await bcrypt.hash('asd', 10);

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