var express  = require("express"),
    User     = require("../models/user"),
    passport = require("passport"),
    router   = express.Router();

//Rota root raiz
router.get("/", function(req, res){
    res.render("camp/landing");
});

//mostra form de registro
router.get("/register", function(req, res){
    res.render("autenticacao/register");
});

//Rota de logica de register
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});

    User.register(newUser, req.body.password, function(err, user){
        if(err){
           if(err.message == "A user with the given username is already registered"){
                req.flash("error", "Esse nome de usuário ja existe");
                return res.redirect("/register");
            }
            return next();
            
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Usuário registrado com sucesso!");
            res.redirect("/camp");
        });
    });
});

//mostra formn de login
router.get("/login", function(req, res){
    res.render("autenticacao/login");
});

//Rota de logica login
router.post("/login",passport.authenticate("local", {
    successRedirect: "/camp",
    failureRedirect: "/login"
    }), function(req, res){
});

//Rota de Logout
router.get("/logout", function(req, res){
    req.logOut();
    req.flash("success", "Você fez Loggout com sucesso!");
    res.redirect("/camp");
});

module.exports = router;