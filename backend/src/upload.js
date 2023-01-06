import userModel from "./models/user";

const pass = '$2b$10$QMx45L5VyXB/LuLrJA.iheh1Ke4zaJoNc6FpUIafosZ4F7lvsrGIa'

const example = [
  {
    name: "Adam",
    password: pass,
    status: "OFFLINE",
    friends: [],
    message: "",
    friendRequest: [],
  },
  {
    name: "Betty",
    password: pass,
    status: "OFFLINE",
    friends: [],
    message: "",
    friendRequest: [],
  },
  {
    name: "Cindy",
    password: pass,
    status: "OFFLINE",
    friends: [],
    message: "",
    friendRequest: [],

  },
  {
    name: "Daniel",
    password: pass,
    status: "OFFLINE",
    friends: [],
    message: "",
    friendRequest: [],
  },
  {
    name: "Ethan",
    password: pass,
    status: "OFFLINE",
    friends: [],
    message: "",
    friendRequest: [],
  },
];

const dataInit = async () => {
  await userModel.deleteMany({});
  await userModel.insertMany(example);
  console.log("Database initialized!");
};

export { dataInit };