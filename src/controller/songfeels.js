import mongoose from 'mongoose';
import { Router } from 'express';
import Users from '../model/users';
import Playlists from '../model/playlist';
import DataDetected from '../model/datadetected';

import { authenticate } from '../middleware/authMiddleware';


export default({config,db}) => {
    const api = Router();

    //CRUD - Create Read Update Delete

    // '/v1/songfeels/users' - Read
    api.get('/users', (req,res) => {
        Users.find({}, (err, songfeels) => {
            if(err){
                res.send(err);
            }
            res.json(songfeels);
        });
    });

    // '/v1/songfeels/users/:id' - Read

    api.get('/users/:id', (req,res) => {
        Users.findById(req.params.id, (err, songfeels) => {
            if(err){
                res.send(err);
            }
            res.json(songfeels);
        });
    });

        // '/v1/songfeels/users/add' - Create
        api.post('/users/add', (req,res) => {
            const newUsers = new Users();// SongFeels is mongoose model
            newUsers.name = req.body.name;
            newUsers.email = req.body.email;
            newUsers.photoUrl = req.body.photoUrl;    
    
    
            newUsers.save( err => {
                if(err){
                    res.send(err);
                }
                res.json({message: 'Users saved successfully'});
            });
        });
    

    // '/v1/songfeels/users/update/:id' - Upadate
    api.put('/users/update/:id', (req,res) => {
        Users.findById(req.params.id, (err, users) => {
            if(err){
                res.send(err);
            }
            users.name = req.body.name;
            users.save(err => {
                if(err){
                    res.send(err);
                }
                res.json({message:'Users info updated'})
            });
        });
    });

    // '/v1/songfeels/delete/:id' - Delete
    api.delete('/users/delete/:id',(req,res) => {
        Users.findById(req.params.id, (err, users) => {
            if(err){
                res.status(500).send(err);
                return;
            }
            if(users === null){
                res.status(404).send("Users not Found");
                return;
            }
            users.remove({
                _id:req.params.id
            }, (err,users) => {
                if(err){
                    res.status(500).send(err);
                    return;
                }
                Playlists.remove({
                    users: req.params.id
                },(err, playlist) => {
                    if(err){
                        res.send(err);
                    }
                DataDetected.remove({
                        users: req.params.id
                    },(err, datadetected) => {
                        if(err){
                            res.send(err);
                        }
                    res.json({message:'Users and Playlists and DataDetected Successfully Removed'});
                })
            });
        });
    });
});
    
     

    // add datadetected for a specific datadetected id
    // '/v1/songfeels/datadetected/add/:id'
    
    api.post('/datadetected/add/:id', (req,res) => {
        DataDetected.findById(req.params.id, ( err, datadetected) => {
            if(err){
                res.send(err);
            }
            const newDataDetected = new  DataDetected();

            newDataDetected.data_detected.color = req.body.color;
            newDataDetected.data_detected.object_in_image.object_name = req.body.object_in_image.object_name;
            newDataDetected.save((err, datadetectd) => {
                if(err){
                    res.send(err);
                }
                users.datadetected.push(newDataDetected);
                users.save(err => {
                    if(err){
                        res.send(err);
                    }
                    res.json({message: 'Users saved Data Detected!'});
                });
            });
        });
    });

    //get datadetected for a specific datadetected id
    // '/v1/songfeels/datadetected/:id'
    api.get('/datadetected/:id', (req,res) => {
        DataDetected.find({users: req.params.id}, (err, users) => {
            if(err){
                res.send(err);
            }
            res.json(users);
        });
    });


        // add playlsits for a specific playlists id
    // '/v1/songfeels/playlists/add/:id'
    
    api.post('/playlists/add/:id', (req,res) => {
        Playlists.findById(req.params.id, ( err, playlist) => {
            if(err){
                res.send(err);
            }
            const newPlaylists = new  Playlists();

            newPlaylists.playlists.playlist_id = req.body.playlists.playlist_id;
            newPlaylists.playlists.playlist_title = req.body.playlists.playlist_title;
            newPlaylists.playlists.playlist_detail = req.body.playlists.playlist_detail;
            newPlaylists.playlists.playlist_photo = req.body.playlists.playlist_photo;
            newPlaylists.playlists.playlist_duration = req.body.playlists.playlist_duration;
            newPlaylists.playlists.playlist_dateTime = req.body.playlists.playlist_dateTime;
            newPlaylists.save((err, playlists) => {
                if(err){
                    res.send(err);
                }
                users.playlists.push(newPlaylists);
                users.save(err => {
                    if(err){
                        res.send(err);
                    }
                    res.json({message: 'Users saved Playlists!'});
                });
            });
        });
    });

    //get playlists for a specific playlists id
    // '/v1/playlists/:id'
    api.get('/playlists/:id', (req,res) => {
        Playlists.find({playlists: req.params.id}, (err, playlsits) => {
            if(err){
                res.send(err);
            }
            res.json(playlsits);
        });
    });


    return api;
}