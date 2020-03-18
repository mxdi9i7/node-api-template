import Users from "../models/User";
import paginate from "../helpers/paginate";
const publicInfo = "friends firstName lastName age email phone address";

const fetchUsers = () => {
  return Users.find();
};

const fetchUser = async data => {
  const { userId } = data;
  try {
    const user = await Users.findById(userId, publicInfo);
    if (user) {
      return {
        data: user,
        success: true
      };
    }
    return {
      data: "User not found",
      success: false
    };
  } catch (error) {
    return {
      data: error.message,
      success: false
    };
  }
};

const createFriendship = async data => {
  const { userId, friendId } = data;
  const user = await Users.findById(userId);
  const friend = await Users.findById(friendId);
  if (user.friends.includes(friendId) || friend.friends.includes(userId)) {
    return {
      data: "You are already friends with this person!",
      success: false
    };
  } else {
    const userResult = await Users.findByIdAndUpdate(
      userId,
      { $push: { friends: friend.id } },
      { new: true }
    );
    const friendResult = await Users.findByIdAndUpdate(
      friendId,
      { $push: { friends: user.id } },
      { new: true }
    );
    return {
      data: {
        user: userResult,
        friend: friendResult
      },
      success: true
    };
  }
};

const removeFriendship = async data => {
  const { userId, friendId } = data;
  const user = await Users.findById(userId);
  const friend = await Users.findById(friendId);
  if (user.friends.includes(friendId) && friend.friends.includes(userId)) {
    const nextUserFriends = user.friends.filter(friend => friend !== friendId);
    const nextFriendFriends = friend.friends.filter(
      friend => friend !== userId
    );

    const userResult = await Users.findByIdAndUpdate(
      userId,
      { $set: { friends: nextUserFriends } },
      {
        new: true
      }
    );
    const friendResult = await Users.findByIdAndUpdate(
      friendId,
      { $set: { friends: nextFriendFriends } },
      {
        new: true
      }
    );
    return {
      data: {
        user: userResult,
        friend: friendResult
      },
      success: true
    };
  } else {
    return { data: "You are not friends with this person!", success: false };
  }
};

const findFriendsByUserId = async data => {
  const { userId, page } = data;
  try {
    const user = await Users.findById(userId);
    if (user.friends.length > 0) {
      const friendsData = await Users.find(
        {
          _id: {
            $in: user.friends
          }
        },
        publicInfo
      );
      return {
        data: paginate(friendsData, page),
        success: true
      };
    } else {
      return {
        data: [],
        success: true
      };
    }
  } catch (error) {
    return {
      data: error.message,
      success: false
    };
  }
};
const findStrangersByUserId = async data => {
  const { userId, page } = data;
  try {
    const user = await Users.findById(userId);
    if (user.friends.length > 0) {
      const friendsData = await Users.find(
        {
          _id: {
            $nin: user.friends
          }
        },
        publicInfo
      );
      return {
        data: paginate(
          friendsData.filter(v => v.phone !== user.phone),
          page
        ),
        success: true
      };
    } else {
      return {
        data: [],
        success: true
      };
    }
  } catch (error) {
    return {
      data: error.message,
      success: false
    };
  }
};
const searchUsersByUserId = async data => {
  const { userId, query } = data;
  try {
    const user = await Users.findById(userId);
    if (user.friends.length > 0) {
      const friendsData = await Users.find(
        {
          _id: {
            $in: user.friends
          },
          $or: [
            {
              phone: {
                $regex: query
              }
            },
            {
              firstName: {
                $regex: query,
                $options: "i"
              }
            },
            {
              lastName: {
                $regex: query,
                $options: "i"
              }
            }
          ]
        },
        publicInfo
      );
      return {
        data: friendsData.filter(v => v.phone !== user.phone),
        success: true
      };
    } else {
      return {
        data: [],
        success: true
      };
    }
  } catch (error) {
    return {
      data: error.message,
      success: false
    };
  }
};

const handleProfileChange = async data => {
  const { field, value, userId } = data;
  try {
    const newUser = await Users.findByIdAndUpdate(userId, {
      $set: {
        [field]: value
      }
    });
    if (newUser) {
      return {
        data: newUser,
        success: true
      };
    }
    return {
      data: "User not found",
      success: false
    };
  } catch (error) {
    return {
      data: error.message,
      success: false
    };
  }
};

const UserController = {
  fetchUsers,
  fetchUser,
  createFriendship,
  removeFriendship,
  findFriendsByUserId,
  findStrangersByUserId,
  searchUsersByUserId,
  handleProfileChange
};

export default UserController;
