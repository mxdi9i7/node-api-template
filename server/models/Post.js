import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  text: String,
  mood: String,
  authorId: String,
  likes: [Object],
  comments: [Object],
  views: Number,
  reports: [Object],
});

const Posts = mongoose.model('Posts', PostSchema);

export default Posts;
