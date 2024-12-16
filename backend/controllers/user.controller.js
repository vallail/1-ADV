import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
    console.log("Error in getUserProfile", error);
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "Cannot follow or Unfollow youself" });
    }
    if (!userToModify || !currentUser) {
      return res.status(404).json({ error: "User Not Found" });
    }
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      //If the user is following the other user then unfollow
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "Unfollowed Successfully" });
    } else {
      //Follow the user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

      //send a notification to user
      const newNotification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });

      await newNotification.save();
      res.status(200).json({ message: "User followed Successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
    console.log("Error in getUserProfile", error);
  }
};
