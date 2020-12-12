import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  phone: {
    type:String,
    unique: true
  },
  password: String,
  avatar:String,
});

const Users = mongoose.model('Users', UserSchema);

export default Users;
