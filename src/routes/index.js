import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import account from '../controller/account';
import songfeels from '../controller/songfeels'
import user from '../controller/users'


const router = express();

//connect to db
initializeDb(db => {
    //internal middleware
    router.use(middleware({config, db}));

    //api routes v1 (/v1)
    router.use('/account', account({config,db}));
    router.use('/songfeels', songfeels({config,db}));
    router.use('/user', user({config,db}));

});

export default router;
