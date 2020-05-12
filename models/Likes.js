const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likeable:{//defines the objectid of the like object
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    onModel:{//used for defining the type of the liked object since this is a dynamic reference
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);

module.exports = Like;