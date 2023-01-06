import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        friends: [{ 
            type: Schema.Types.ObjectId, 
            required: true,
            ref: "user"
        }],
        status: { type: String, required: true },
        message: { type: String },
        friendRequest: [{ 
            type: Schema.Types.ObjectId, 
            required: true,
            ref: "user"
        }],
        content: { type: String },
    },
    {
        collection: "user"
    }
)

export default mongoose.model("user", userSchema);