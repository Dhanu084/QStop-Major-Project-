const Like = require('../models/Likes');
const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.createLike = async function(req,res){
    console.log(req.query.type);
    console.log(req.query.id);
    try{
        //likes/toggle/?id:abcdef&type="Post"
        let likeable;

        if(req.query.type=='Post'){
            likeable = await Post.findById(req.query.id)
            .populate('likes');
        }
        else{
            likeable = await Comment.findById(req.query.id)
            .populate('likes');
        }
        console.log('likeable',likeable);
        let exisitingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user.id
        });

        if(exisitingLike){
            likeable.likes.pull(exisitingLike._id);
            likeable.save();
            exisitingLike.remove();
            return res.status(200).send({
                message:"Already liked"
            })
    }
        else{
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });
            likeable.likes.push(newLike);
            likeable.save();
            res.status(200).send({
                data:{
                    like:newLike,
                },
                message:"Liked"
            })
        }
    }
    catch(err){
         console.log(err);
         return res.status(500).send({
             message:"Internal server error"
         })
    }
}