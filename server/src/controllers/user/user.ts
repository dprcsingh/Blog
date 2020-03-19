import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import envs from '../../config/configuration';
import baseHelper from '../../lib/helper/baseHelper';
import UserModel from '../../model/user';
export default class User {
    public async createUser(req: Request, res: Response) {
        const { email, password, firstName, lastName } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).send('That user already exisits!');
        }
        else {
            const hashPassword = await baseHelper.hashPassword(password);
            const userModel = new UserModel({
                firstName,
                lastName,
                email,
                password: hashPassword,
            });
            userModel.save().then(() => {
                res.status(200).send('user registred successfully');
            }).catch(err => {
                return res.status(500).send('some error ocurred');
            });
        }

    }
    public async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const user: any = await UserModel.findOne({ email });
        if (!user) { return res.status(401).send('Email is not registered'); }
        const validPassword: boolean = await bcrypt.compare(password, user.password);
        if (!validPassword) { return res.status(401).send('incorrect password'); }
        jwt.sign({ _id: user._id }, envs.SECRET as jwt.Secret, (err: Error, token: string) => {
            if (err) { return res.status(401).send('Error while generating token'); }
            else {
                return res.status(200).send({ token });
            }
        });

    }
}