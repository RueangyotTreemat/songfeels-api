import mongoose from 'mongoose';
import Users from './user';

 const Schema = mongoose.Schema;

 const PlaylistsSchema = new Schema({
    
        playlists:{
            playlist_id:String,
            playlist_title:String,
            playlist_detail:String,
            playlist_photo:String,
            playlist_duration:String,
            playlist_dateTime:{ type: Date, default: Date.now }
            ,
            dateTime_createdPlaylist:{
                playlist_created:{
                    date: { type: Date, default: Date.now }
                }
            }
        },
        users: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required:true
        }
    
    
 });

 module.exports = mongoose.model('Playlists',PlaylistsSchema);