import mongoose from "mongoose"
import bcrypt from "bcrypt";
import idGenerator from "../helpers/idGenerator.js";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    position: {
        type: String,
        trim: true,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true, //Validation in the DB
        default: Date.now(),
    },
    token: {
        type: String,
        default: idGenerator(),
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "blocked"],
        default: "active",
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    blocked: {
        type: Boolean,
        default: false
    }
});
userSchema.pre("save", function (next) {
    this.status = this.blocked ? "blocked" : "active";
    next();
});

userSchema.pre("findOneAndUpdate", function (next) {
    if (this._update.blocked !== undefined) {
        this._update.status = this._update.blocked ? "blocked" : "active";
    }
    next();
});


userSchema.pre("save", async function (next) {
    console.log(this);

    if (!this.isModified("password")) {
        next();
    }
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
});


userSchema.methods.comparedPasswords = async function (passwordForm) {
    return await bcrypt.compare(passwordForm, this.password)
}

const Users = mongoose.model("Users", userSchema);
export default Users;