import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  friends: Array,
  email: String,
  password: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  phone: String,
});

const Users = mongoose.model('Users', UserSchema);

export default Users;
