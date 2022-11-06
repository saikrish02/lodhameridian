const User = require("../models/UserModel");

// Create User
exports.createUser = async(req,res,next)=> {
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        user
    })
}

// Get Single User
exports.getUser = async(req,res) => {
    const UserData = await User.findById(req.params.id)
    if(!UserData) {
        return res.status(500).json({
            success: false,
            message: "User not found"
        })
    }
    res.status(200).json({
        success: true,
        UserData
    });
}

// Get All users
exports.getAllusers = async(req,res) => {
    const UserData = await User.find()
    res.status(200).json({
        success: true,
        UserData
    });
}

// Update User
exports.updateUser = async(req,res,next)=> {
    let user1 = await User.findById(req.params.id);
    if(!user1){
        return res.status(500).json({
            success: false,
            message: "User not Found"
        })
    }
    user1 = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, 
        runValidator: true, useFindAndModify: false})
 
    res.status(200).json({
        success: true,
        user1
    })
}

// Delete User

exports.deleteUser = async(req,res,next) => {
    const user1 = await User.findById(req.params.id);
    if(!user1) {
        return res.status(500).json({
            success: false,
            message: "User not found"
        })
    }
    await user1.remove();
    res.status(200).json({
        success: true,
        message: "User Deletion successful"
    })
}