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
        messages: [{ 
            from: {type: String, required: true },
            to: {type: String, required: true},
            context: {type: String, required: true},
        }],
        friendRequest: [{ 
            type: Schema.Types.ObjectId, 
            required: true,
            ref: "user"
        }],
    },
    {
        collection: "user"
    }
)

export default mongoose.model("user", userSchema);