import Posts from '../models/Post';
import paginate from '../helpers/paginate';
import Users from '../models/User';

const fetchPosts = () => {
  return Posts.find();
};

const findPostByUser = async data => {
  const { userId, page } = data;
  try {
    const posts = await Posts.find({ authorId: userId });
    if (posts) {
      return {
        data: paginate(posts, page),
        success: true,
      };
    }
    return {
      data: 'No posts found by this user',
      success: false,
    };
  } catch (error) {
    return {
      success: false,
      data: error.message,
    };
  }
};
const findPostByFriends = async data => {
  const { userId, page } = data;
  try {
    const user = await Users.findById(userId);
    const posts = await Posts.find({ authorId: { $in: user.friends } });
    if (posts) {
      return {
        data: paginate(posts, page),
        success: true,
      };
    }
    return {
      data: 'No posts found by this user',
      success: false,
    };
  } catch (error) {
    return {
      success: false,
      data: error.message,
    };
  }
};

const findPostById = async data => {
  const { postId } = data;
  try {
    const post = await Posts.findById(postId);
    if (post) {
      return {
        data: post,
        success: true,
      };
    }
    return {
      data: 'No post found with this id',
      success: false,
    };
  } catch (error) {
    return {
      data: error.message,
      success: false,
    };
  }
};

const createPost = data => {
  return Posts.create({ ...data, likes: [], comments: [], reports: [] });
};

const createComment = data => {
  const { authorId, text, postId } = data;
  return Posts.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: {
          text,
          authorId,
        },
      },
    },
    { safe: true, upsert: true, new: true },
  );
};

const likeComment = async data => {
  const { authorId, postId, commentIndex } = data;
  const { comments } = await Posts.findById(postId);
  const currentComment = comments[commentIndex];
  const currentLikes = currentComment.likes || [];
  if (currentLikes.includes(authorId)) {
    return 'You have already liked this comment!';
  } else {
    const nextComment = { ...currentComment, likes: [...currentLikes, authorId] };
    return Posts.findByIdAndUpdate(
      postId,
      {
        $set: {
          comments: nextComment,
        },
      },
      { safe: true, upsert: true, new: true },
    );
  }
};
const unlikeComment = async data => {
  const { authorId, postId, commentIndex } = data;
  const { comments } = await Posts.findById(postId);
  const currentComment = comments[commentIndex];
  const currentLikes = currentComment.likes || [];
  if (!currentLikes.includes(authorId)) {
    return 'You have not liked this comment!';
  } else {
    const nextLikes = currentLikes.filter(like => like !== authorId);
    const nextComment = { ...currentComment, likes: [...nextLikes] };
    return Posts.findByIdAndUpdate(
      postId,
      {
        $set: {
          comments: nextComment,
        },
      },
      { safe: true, upsert: true, new: true },
    );
  }
};

const likePost = async data => {
  const { postId, authorId } = data;
  const post = await Posts.findById(postId);
  const { likes = [] } = post;
  if (likes.includes(authorId)) {
    return 'You have already liked this post!';
  } else {
    return Posts.findByIdAndUpdate(
      postId,
      {
        $push: {
          likes: authorId,
        },
      },
      { safe: true, upsert: true, new: true },
    );
  }
};

const unlikePost = async data => {
  const { postId, authorId } = data;
  const post = await Posts.findById(postId);
  const { likes = [] } = post;
  if (!likes.includes(authorId)) {
    return 'You have not liked this post!';
  } else {
    return Posts.findByIdAndUpdate(
      postId,
      {
        $pull: {
          likes: authorId,
        },
      },
      { safe: true, upsert: true, new: true },
    );
  }
};

const reportPost = async data => {
  const { postId, authorId } = data;
  const post = await Posts.findById(postId);
  const { reports = [] } = post;
  if (reports.includes(authorId)) {
    return 'You have already reported this post!';
  } else {
    return Posts.findByIdAndUpdate(
      postId,
      {
        $push: {
          reports: authorId,
        },
      },
      { safe: true, upsert: true, new: true },
    );
  }
};
const unReportPost = async data => {
  const { postId, authorId } = data;
  const post = await Posts.findById(postId);
  const { reports = [] } = post;
  if (!reports.includes(authorId)) {
    return 'You have not reported this post!';
  } else {
    return Posts.findByIdAndUpdate(
      postId,
      {
        $pull: {
          reports: authorId,
        },
      },
      { safe: true, upsert: true, new: true },
    );
  }
};

const PostController = {
  fetchPosts,
  findPostById,
  findPostByFriends,
  findPostByUser,
  createPost,
  likePost,
  unlikePost,
  createComment,
  likeComment,
  unlikeComment,
  reportPost,
  unReportPost,
};

export default PostController;
