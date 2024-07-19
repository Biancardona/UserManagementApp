import Users from "../model/Users.js";
import idGenerator from "../helpers/idGenerator.js";
import generateJWT from "../helpers/generateJWT.js";
import emailRegister from "../helpers/emailRegister.js";

const register = async (req, res) => {

    const { name, email } = req.body;
    const userEmailExist = await Users.findOne({ email: email });
    if (userEmailExist) {
        const error = new Error("Email already exists");
        return res.status(400).json({ msg: error.message });
    }
    try {
        const user = new Users(req.body);

        const userObject = await user.save();

        emailRegister({
            name,
            email,
            token: userObject.token,
        });
        res.json(userObject);
    } catch (error) {
        console.log(error)
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users);
    } catch (error) {
        console.log(error)
    }
};


const profile = (req, res) => {
    const { user } = req;
    res.json(user);
};


const readToken = async (req, res) => {
    const { token } = req.params;
    const tokenExist = await Users.findOne({ token });
    console.log(tokenExist)

    if (!tokenExist) {
        const error = new Error("Invalid token");
        return res.status(404).json({ msg: error.message });
    }
    try {
        tokenExist.token = null;
        tokenExist.confirmed = true;
        await tokenExist.save();
        res.json({ msg: "Successfully user confirmed " });
    } catch (error) {
        console.log(error)
    }
};

const auth = async (req, res) => {
    console.log(req.body);
    //
    const { email, password } = req.body;
    const emailExist = await Users.findOne({ email });

    if (!emailExist) {
        const error = new Error("User does not exist");
        return res.status(403).json({ msg: error.message });
    }
    if (emailExist.blocked) {
        return res.status(403).json({ msg: "User is blocked" });
    }
    if (!emailExist.confirmed) {
        const error = new Error("Email not autenticated");
        return res.status(403).json({ msg: error.message });
    }
    if (await emailExist.comparedPasswords(password)) {

        res.json({
            _id: emailExist._id,
            name: emailExist.name,
            email: emailExist.email,
            token: generateJWT(emailExist.id),
        });
    } else {
        const error = new Error("Invalid credentials");
        return res.status(403).json({ msg: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await Users.findOneAndDelete({ _id: id },
            res.json({ msg: " User has been remove" }))

    } catch (error) {
        console.log(error)

    }
};
const blockUser = async (req, res) => {
    const { id } = req.params;
    try {
        console.log("Attempting to block user")
        const updatedUser = await Users.findByIdAndUpdate({ _id: id }, { blocked: true }, { new: true })
        res.json({
            msg: "Blocked user correctly",
            user: updatedUser
        });
    } catch (error) {
        console.log("Error blocking user")
    }
}
const unblockUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await Users.findByIdAndUpdate({ _id: id }, { blocked: false }, { new: true })
        res.json({
            msg: "Activated user correctly",
            user: updatedUser
        });
    } catch (error) {
        console.log("Error unlocking user")

    }
}


const authToken = async (req, res) => {

    const { token } = req.params;

    const tokenExist = await Users.findOne({ token });
    console.log(tokenExist);
    if (tokenExist) {
        res.json({ msg: "Token  valido" });
    } else {
        const error = new Error("Invalid Token");
        return res.status(404).json({ msg: error.message });
    }
};

export {
    register,
    getAllUsers,
    profile,
    readToken,
    authToken,
    auth,
    deleteUser,
    blockUser,
    unblockUser,
};