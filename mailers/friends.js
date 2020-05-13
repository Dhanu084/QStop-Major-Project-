const nodemailer = require('../config/nodemailer');


module.exports.newFriend = (other_user) =>{
    let htmlString = nodemailer.renderTemplate({other_user:other_user},'/friends/new_friend.ejs');
    nodemailer.transporter.sendMail({
        from:'dhanushkiran902@gmail.com',
        to:other_user.email,
        subject:'New follower!',
        html:htmlString
    },(err,info) => {
        if(err){
            console.log(err);
            return;
        }
        //console.log("Mail delivered",info);
        return;
    })
}