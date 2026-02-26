const followModel = require("../models/follow.models")




const userconstroller = async (req, res)=>{
    const followerUserName = req.user.userName;
    const followeeUserName = req.params.userName;


    const followRecode = await followModel.create({
        follower:followerUserName,
        followee:followeeUserName,
    });

    res.status(201).json({
        message:`you are now following ${followeeUserName}`,
        follow: followRecode,
    })
}

module.exports = {
    userconstroller,
}