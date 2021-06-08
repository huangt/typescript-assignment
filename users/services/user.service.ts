import UsersDao from '../dao/user.dao';
import { UserService } from '../../common/interfaces/userservice.interface';
import { RegisterUserDto } from '../dto/register.user.dto';

class UserServiceImpl implements UserService {
    async create(user: RegisterUserDto) {
        return UsersDao.addUser(user);
    }

    async deleteByUsername(username: string) {
        return UsersDao.removeUserByUsername(username);
    }

    async list(limit: number, page: number) {
        return UsersDao.getUsers();
    }

    async getByUsername(username: string) {
        return UsersDao.getUserByUsername(username);
    }
}

export default new UserServiceImpl();