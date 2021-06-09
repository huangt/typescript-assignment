import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/user.controller';
import UsersMiddleware from './middleware/user.middleware';
import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/api/register`)
            .post(
                UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateUsername,
                UsersMiddleware.validateUsernameDoesntExist,
                UsersMiddleware.validatePassword,
                UsersController.createUser
            );
        this.app
            .route(`/api/users`)
            .get(UsersController.listUsers);
        this.app.param(`username`, UsersMiddleware.extractUsername);
        this.app
            .route(`/api/:username`)
            .all(UsersMiddleware.validateUserExists)
            .get(UsersController.getUserByUsername)
            .delete(UsersController.removeUser);

        return this.app;
    }
}