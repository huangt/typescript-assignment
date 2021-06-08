import express from 'express';
import userService from '../services/user.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:user-controller');
class UsersMiddleware {

	// - 只能以英文字母或下划线开头
	// - 只能包含英文字母，下划线或数字
	async validateUsername(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		log('Validating username', req.body.username);
		let startsWith: string = req.body.username.match(/^[a-zA-Z\_]/);
		let validUsername: string = req.body.username.match(/^[a-zA-Z0-9\_]+$/);
		if (startsWith == null || validUsername == null) {
			res.status(400).send({
				error: `username not valid`,
			});
		} else {
			next();
		}
	}

	// - 长度在 6 位以上
	// - 不能含有 3 位以上的连续数字
	// - 必须有大写字母，小写字母或数字中的两项
	async validatePassword(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		log('Validating password', req.body.password);
		let count: number = 0;
		if (/\d/.test(req.body.password)) {
			count++;
		}
		if (/[A-Z]/.test(req.body.password)) {
			count++;
		}
		if (/[a-z]/.test(req.body.password)) {
			count++;
		}
		if (req.body.password.length <= 6 || 
			/\d{3}/.test(req.body.password) || 
			count < 2) {
			res.status(400).send({
				error: `password not valid`,
			});
		} else {
			next();
		}
	}

	async validateRequiredUserBodyFields(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (req.body && req.body.username && req.body.password) {
			next();
		} else {
			res.status(400).send({
				error: `Missing required fields username and password`,
			});
		}
	}
	
	async validateUserExists(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const user = await userService.getByUsername(req.params.username);
		if (user) {
			next();
		} else {
			res.status(404).send({
				error: `User ${req.params.username} not found`,
			});
		}
	}

	async validateUsernameDoesntExist(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const user = await userService.getByUsername(req.body.username);
		if (user) {
			res.status(400).send({ error: `Username already exists` });
		} else {
			next();
		}
	}

	async extractUsername(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		req.body.username = req.params.username;
		next();
	}
}

export default new UsersMiddleware();

