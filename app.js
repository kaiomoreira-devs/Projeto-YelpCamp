//pacotes de bibliotecas
var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    methodOverrider       = require("method-override");
    url                   = "mongodb://localhost/yelp_camp",
    Camp                  = require("./models/camp"),
    Comentario            = require("./models/comentario"),
    User                  = require("./models/user"),
    passport              = require("passport"),
    LocalPassportStrategy = require("passport-local"),
    flash                 = require("connect-flash"),
    Seeds                 = require("./seeds");
    
//Requerendo ROTAS
var campsRotas        = require("./rotas/camp"),
    comentariosRotas  = require("./rotas/comentarios"),
    indexRotas        = require("./rotas/index");

//========== Configurando NPM ==========//

//mongodb
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

//body-parse
app.use(bodyParser.urlencoded({extended : true}));

//method-overrider
app.use(methodOverrider("_method"));

//ejs
app.set("view engine", "ejs");

//express static
app.use(express.static("public"));

//flash
app.use(flash());

// ====== Configuração de Autenticação ======

//express session
app.use(require("express-session")({
    secret: "Acampamento magnifico dos Reis",
    resave: false,
    saveUninitialized: false
}));


//passport
app.use(passport.initialize());
app.use(passport.session());


//passport-local-strategy
passport.use(new LocalPassportStrategy(User.authenticate()));

//passport serialize e deserialize
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ====================================

//Middleware para capturar usuario
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//seeds semeando comentarios
//Seeds();

//ROTA INDEX
app.use("/", indexRotas);
//ROTA CAMP
app.use("/camp", campsRotas);
//ROTAS COMENTARIO
app.use("/camp/:id/comentarios", comentariosRotas);

//conexao
app.listen(3000, function(){
    console.log("YelpCamp esta no ar!");
});
