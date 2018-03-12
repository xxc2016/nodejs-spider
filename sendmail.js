/**
 * Created by xxc on 2018/2/24.
 */
let email=require('./config').email;
let nodemailer=require('nodemailer');

let transporter=nodemailer.createTransport({
    host:email.host,
    port:'25',
    secureConnection:true,
    auth:{
        user:email.user,
        pass:email.password
    }
});

module.exports=function (contents) {
    transporter.sendMail({
        from:email.user,
        to:email.toUser,
        subject:"教务新闻",
        text:contents||'today is no news!'
    },function (err,res) {
        if(err){
            console.log(err);
        }else {
            console.log(res.response);
        }
    });
    transporter.close();
};