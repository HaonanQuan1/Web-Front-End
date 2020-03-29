'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for Todo object.
 */
let TodoSchema = new Schema({
    // Id:{
    //     type:Number,
    //     required:"id is required"
    // },
    title:{
        type:String,
        required:"title is required"
    },
    due:{
        type:String,
        // required:"description is required"
    },
    description:{
        type:String,
        // required:"description is required"
    },
    createdDate:{
        type:Date,
        default:Date.now(),
        required:"createdDae is required"
    },
    complete:{
        type:String,
        default:"uncompleted"
    },
    modifiedDate:{
        type:Date
    }
},
{
    versionKey: false
});
// Duplicate the id field as mongoose returns _id field instead of id.
TodoSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serielized.
TodoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Todo', TodoSchema);