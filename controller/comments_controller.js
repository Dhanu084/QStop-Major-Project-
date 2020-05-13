const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = async function(req,res){
    //console.log(req.body);
    try{
       let post = await Post.findById(req.body.post);
       //console.log(post);
       if(post==null || post == undefined){
           res.redirect('back');
       }
       let comment = await Comment.create({
           content:req.body.content,
           user:req.user.id,
           post:post.id
       })

       await post.comments.push(comment);
       await post.save();
       if(req.xhr){
           return res.status(200).send({
               data:{
                   comment:comment
               },
               message:"Comment created"
           })
       }
       req.flash('success','answer added');
       res.redirect('back');
    }
    catch(err){
        console.log(err);
        res.redirect('back');
    }
}


module.exports.delete = async function(req,res){
    console.log(req.params.id)
    try{
        
        let comment = await Comment.findById(req.params.id);
        console.log(comment.user._id , req.user.id)
        if(comment.user._id == req.user.id){
            let postId = comment.post.id;
            await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            await comment.remove();
            await comment.save();
            req.flash('success','answer deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error','not authorized');
            return res.redirect('back');
        }
        
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}