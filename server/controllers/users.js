import Users from '../models/User';
import paginate from '../helpers/paginate';

const fetchUsers = () => {
  return Users.find();
};

const changeAvatar = async (data,url) =>{
  const { phone } = data;
  const user = await Users.findOne({ phone });
	if(user){
		await Users.findOneAndUpdate(
			{ phone },
			{ $set: { avatar: url } },
			{ new: true },
		);
	}
}

const UserController = {
  fetchUsers,
  changeAvatar
};



export default UserController;
