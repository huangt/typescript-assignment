import { RegisterUserDto } from '../dto/register.user.dto';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    users: Array<RegisterUserDto> = [];

    constructor() {
        log('Created new instance of UsersDao');
    }

	async addUser(user: RegisterUserDto) {
		this.users.push(user);
		return user.username;
	}

	async getUsers() {
		return this.users;
	}

	async getUserByUsername(name: string) {
		return this.users.find((user: { username: string }) => user.username === name);
	}

	async removeUserByUsername(name: string) {
		const objIndex = this.users.findIndex(
			(obj: { username: string }) => obj.username === name
		);
		this.users.splice(objIndex, 1);
		return `${name} removed`;
	}
}

export default new UsersDao();

