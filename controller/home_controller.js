const Post = require('../models/posts');
const Friendship = require('../models/friendships');
module.exports.home = async (req,res) =>{
    
    try{
        let allposts = await Post.find({}).populate('user').exec();
        let friendships = await Friendship.find();
        let friends=[];
        
        if(req.user){
            for(let friend of friendships){
                if(friend.from_user!=req.user.id){
                   // console.log(friend.from_user+" "+user.id)
                    friends.push(friend);
                }
            }
            await Post.find({user:req.user.id}).populate('user').exec(function(err,userposts){
                res.render('home.ejs',{
                    title : 'home',
                    posts: allposts,
                    userposts:userposts,
                    friends
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