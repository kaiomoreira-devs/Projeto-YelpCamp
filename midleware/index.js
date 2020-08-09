//MIDLEWARES - aqui estão todos midleware do projeto

var midleware = {},
    Camp        = require("../models/camp"),
    Comentario  = require("../models/comentario");

    //Midleware de Camp

    //Middleware - cadeado de rota
    midleware.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Você precisar fazer o login para isso!");
    res.redirect("/login");
    }

    //Middleware - Autorização
    midleware.isAutorizedCamp = function(req, res, next){
    //saber se ela ta autenticada [X]
    if(req.isAuthenticated()){
        Camp.findById(req.params.id, function(err, campEdit){
            if(err){
                req.flash("error", "Error no banco de dados!");
                res.redirect("back");
            }else{
                //saber se ela esta autorizada 
                if(campEdit.autor.id.equals(req.user._id)){
                    //renderizar pedido
                    next();
                }else{
                    req.flash("error", "Você não tem permissao para isso!");
                    res.redirect("back");
                }
            }  
        });
        }else{
            res.redirect("back");     
        }
    }

    //Midlewares de Comentario

    midleware.isAutorizedComentario = function(req, res, next){
        //saber se ela ta autenticada [X]
        if(req.isAuthenticated()){
            Comentario.findById(req.params.comentario_id, function(err, comentarioEdit){
                if(err){
                    req.flash("error", "Error no banco de dados!"); 
                    res.redirect("back");
                }else{ 
                    //saber se ela esta autorizada 
                    if(comentarioEdit.autor.id.equals(req.user._id)){
                        //renderizar pedido
                        next();
                    }else{
                        req.flash("error", "Você não tem permissao para isso!");
                        res.redirect("back");
                    }
                }  
            });
            }else{
                res.redirect("back");     
            }
        }

module.exports = midleware;