import express from 'express';
import usersService from '../services/user.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:user-controller');
class UserController {
    async listUsers(req: express.Request, res: express.Response) {
        const users = await usersService.list(100, 0);
        res.status(200).send(users);
    }

    async getUserByUsername(req: express.Request, res: express.Response) {
        const user = await usersService.getByUsername(req.body.username);
        res.status(200).send(user);
    }

    async createUser(req: express.Request, res: express.Response) {
        const userId = await usersService.create(req.body);
        res.status(201).send({ username: userId });
    }

    async removeUser(req: express.Request, res: express.Response) {
        log(await usersService.deleteByUsername(req.body.username));
        res.status(204).send();
    }
}

export default new UserController();