import Users from '../models/User';
import paginate from '../helpers/paginate';

const fetchUsers = () => {
  return Users.find();
};

const UserController = {
  fetchUsers,
};

export default UserController;
