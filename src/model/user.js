import mongoose from 'mongoose';
import Playlist from './playlist';
import DataDetected from './datadetected';
import passportLocalMongoose from 'passport-local-mongoose';


 const Schema = mongoose.Schema;

 const UserSchema = new Schema({

            name: String,
            email: String,
            password:String,
            photoUrl: String,
            emailVerified:String,
            uid:String,
            dateTime_createdUser:Date,
            playlists: {
                playlist_id:String
            },
            data_detected:{
                data_detected_id:String
            },
            
        playlists :[{type: Schema.Types.ObjectId, ref: 'Playlist'}],
        datas_detected :[{type: Schema.Types.ObjectId, ref: 'DataDetected'}]
    
    
 });
 UserSchema.plugin(passportLocalMongoose);
 module.exports = mongoose.model('User',UserSchema);

 

