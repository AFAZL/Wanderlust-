const express=require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userCotroller = require("../controllers/users.js");


router.get("/signup",userCotroller.renderSignupForm);

router.post("/signup", wrapAsync(userCotroller.signup));

router.get("/login",wrapAsync(userCotroller.renderLoginForm));

router.post("/login",saveRedirectUrl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash: true,
}),
    userCotroller.login
);

router.get("/logout",userCotroller.loggout)

module.exports=router;