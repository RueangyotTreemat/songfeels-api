import mongoose from 'mongoose';
import { Router } from 'express';
import Users from '../model/user';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';

import {generateAccessToken, respond, authenticate} from '../middleware/authMiddleware'

export default ({config,db}) => {


    const api = Router();
    

    // '/api/v1/user'
    api.get('/', (req,res) => {
        Users.find({}, (err, users) => {
            if(err){
                res.send(err);
            }
            res.json(users);
        });
    });

    // '/api/v1/user/register'
    api.post('/register', (req,res) => {

        Users.register(new Users({
            username: req.body.email
        }), req.body.password, (err, users) => {
            if(err){
                if(err.name == "UserExistsError"){
                    console.log("User Exists");
                    return res.status(409).send(err);
                }else{
                    return res.status(300).send(err);
                }
            }


            passport.authenticate(
                'local',{
                    session: false
                })(req,res, () => {
                    res.status(200).send('Successfully created new user');
                });
        });
    });

    // '/api/v1/account/login'
    api.post('/login', passport.authenticate(
        'local',{
            session: false,
            scope: []
        }), generateAccessToken,respond);
    

    // '/api/v1/user/logout'
    api.get('/logout', authenticate, (req,res) => {
        req.logout();
        res.status(200).send('Successfully loged out')
    });

    api.get('/me', authenticate, (req,res) => {
        res.status(200).json(req.user);
    });

    return api;
}