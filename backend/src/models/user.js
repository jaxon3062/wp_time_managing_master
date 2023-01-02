import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        friends: [{ type: String, required: true }],
        status: { type: String, required: true },
    },
    {
        collection: "user"
    }
)

export default mongoose.model("user", userSchema);