import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    profile: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        phone: {
            type: String
        },
        address: {
            country: {
                type: String
            },
            city: {
                type: String
            },
            street: {
                type: String
            },
            postalCode: {
                type: Number
            },
            houseNumber: {
                type: Number
            },
            fullAddress: {
                type: String
            }
        }
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;

