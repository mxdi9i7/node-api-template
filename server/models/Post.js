import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  text: String,
});

const Posts = mongoose.model('Posts', PostSchema);

export default Posts;
