import mongoose from 'mongoose';
import Users from './user';

 const Schema = mongoose.Schema;

 const DataDetectedSchema = new Schema({
    
        data_detected:{
            color:String,
            object_in_image:{
                object_name:String
            },
            dateTime_detected: { type: Date, default: Date.now }
        },
        users: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required:true
        }
    
 });

 module.exports = mongoose.model('DataDetected',DataDetectedSchema);