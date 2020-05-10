const Post = require('../models/posts');

module.exports.home = async (req,res) =>{
    
    try{
        let allposts = await Post.find({}).populate('user').exec();
        if(req.user){
            await Post.find({user:req.user.id}).populate('user').exec(function(err,userposts){
                res.render('home.ejs',{
                    title : 'home',
                    posts: allposts,
                    userposts:userposts
                });
            });
            
        }
        else{
            res.render('home.ejs',{
                title : 'home',
                posts: allposts,
            });
        }
    }
    catch(err){
        console.log(err);
        res.redirect('back');
    }
}