const nodemailer = require('../config/nodemailer');


module.exports.newPost = (user) =>{

    let htmlString = nodemailer.renderTemplate({user:user},'/posts/posts.ejs');
    console.log(htmlString);
    nodemailer.transporter.sendMail({
        from:'dhanushkiran902@gmail.com',
        to:user.email,
        subject:'New post published',
        html:htmlString
    },(err,info) => {
        if(err){
            console.log(err);
            return;
        }
        //console.log("Mail delivered",info);
        return res.status(200).send({
            data:{
                post:post
            },
            message:"post has been published"
        })
    })
}