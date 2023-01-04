import userModel from "./models/user";
import { v4 as uuidv4 } from "uuid";

const example = [
  {
    id: uuidv4(),
    name: "Adam",
    status: "OFFLINE",
    friends: [],
    messages: [],
    friendRequests: [],
  },
  {
    id: uuidv4(),
    name: "Betty",
    status: "OFFLINE",
    friends: [],
    messages: [],
    friendRequests: [],
  },
  {
    id: uuidv4(),
    name: "Cindy",
    status: "OFFLINE",
    friends: [],
    messages: [],
    friendRequests: [],

  },
  {
    id: uuidv4(),
    name: "Daniel",
    status: "OFFLINE",
    friends: [],
    messages: [],
    friendRequests: [],
  },
  {
    id: uuidv4(),
    name: "Ethan",
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