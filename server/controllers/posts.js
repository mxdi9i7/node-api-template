import Posts from '../models/Post';
import paginate from '../helpers/paginate';
import Users from '../models/User';

const fetchPosts = () => {
  return Posts.find();
};

const PostController = {
  fetchPosts,
};

export default PostController;
