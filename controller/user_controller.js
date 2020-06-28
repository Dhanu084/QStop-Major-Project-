const bcrypt = require("bcrypt");
const User = require("../models/users");
const fs = require("fs");
const path = require("path");
const Post = require("../models/posts");
const Friendship = require("../models/friendships");
const friendsMailer = require("../mailers/friends");

module.exports.signin = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  res.render("signin.ejs", {
    title: "Signin",
  });
};

module.exports.signup = (req, res) => {
  res.render("signup.ejs", {
    title: "Signup",
  });
};

module.exports.createUser = async function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  //console.log(req.body.password == req.body.confirm_password);
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    await User.create({
      Username: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    //req.flash('success',req.body.email+'signed up successfully');
    res.redirect("/user/signin");
  } catch (err) {
    //req.flash('error','user already exist');
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.createSession = function (req, res) {
  req.flash("success", "Welcome " + req.user.Username);
  res.redirect("/");
};

module.exports.signout = function (req, res) {
  req.flash("success", "logged out");
  req.logout();
  res.redirect("/");
};

module.exports.updateUser = async function (req, res) {
  if (req.user.id != req.params.id) res.redirect("back");
  try {
    //console.log(await User.findById(req.user.id));
    let user = await User.findById(req.params.id);
    //console.log("user:",user);
    User.uploadedAvatar(req, res, function (err) {
      if (err) {
        console.log("Multer error", err);
        return;
      }
      user.Username = req.body.Username;
      user.password = req.body.password;
      user.email = req.body.email;
      user.designation = req.body.designation;
      if (req.file) {
        if (user.avatar) {
          fs.unlinkSync(path.join(__dirname, "..", user.avatar));
        }
        user.avatar = User.avatarPath + "/" + req.file.filename;
      }
      user.save();
      req.flash("success", "updated");
      return res.redirect("back");
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

module.exports.profile = function (req, res) {
  res.render("profile_update.ejs", {
    title: "profile",
  });
};

module.exports.otheruser = async function (req, res) {
  if (!req.isAuthenticated()) res.redirect("/");
  try {
    let user = await (await User.findById(req.query.id)).populate(
      "friendships"
    );
    let post = await Post.find({ user: user.id });
    let friends = [];

    for (let friend of user.friendships) {
      if (friend != user.id) {
        //console.log(friend+" "+user.id)
        friends.push(friend);
      }
    }
    //console.log(friends);
    res.render("other_user.ejs", {
      other_user: user,
      posts: post,
      friends,
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

module.exports.toggleFriend = async function (req, res) {
  try {
    let other_user = await User.findById(req.query.id);
    let current_user = await User.findById(req.user.id);
    let friend = await Friendship.findOne({
      from_user: current_user.id,
      to_user: other_user.id,
    });

    if (friend) {
      other_user.friendships.pull(friend);
      current_user.friendships.pull(friend);
      other_user.save();
      current_user.save();
      friend.remove();
      friend.save();
      req.flash("success", "friend - removed");
      return res.status(200).send({
        message: "friend removed",
      });
    } else {
      friendsMailer.newFriend(other_user);
      friend = await Friendship.create({
        from_user: current_user.id,
        to_user: other_user.id,
      });
      current_user.friendships.push(friend);
      other_user.friendships.push(friend);
      current_user.save();
      other_user.save();
      req.flash("success", "friend added");
      return res.status(200).send({
        data: friend,
        message: "friend added",
      });
    }

    res.redirect("back");
  } catch (err) {
    console.log(err);
    req.redirect("back");
  }
};
