var express    = require("express"),
    Camp       = require("../models/camp"),
    Comentario = require("../models/comentario"),
    router     = express.Router({mergeParams: true}), // capturar id da rota comentario
    midleware  = require("../midleware");


//NEW - Abre rota para criar novo comentario
router.get("/new",midleware.isLoggedIn, function(req, res){
    Camp.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err);            
        }else{
            res.render("comentario/new", {camp:camp});
        }
    });
});

//CREATE - Cria novo comentario e posta
router.post("/",midleware.isLoggedIn, function(req, res){
    Camp.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err);            
        }else{
            Comentario.create(req.body.comentario, function(err, comentario){
                if(err){
                    req.flash("error", "Error no banco de dados!");
                    console.log(err);                    
                }else{
                    //adicionar usuario
                    comentario.autor.id = req.user._id;
                    comentario.autor.username = req.user.username;
                    comentario.save();
                    //adicionar comentario
                    camp.comentarios.push(comentario);
                    camp.save();
                    req.flash("success", "Comentario criado com sucesso!");
                    res.redirect("/camp/"+ req.params.id);
                }
            });
        }
    });
});


//ROTA-GET-EDIT-COMENTARIO - essa rota renderiza os dados do banco encontrado sobre comentario
router.get("/:comentario_id/edit",midleware.isAutorizedComentario, function(req, res){
    Comentario.findById(req.params.comentario_id, function(err, comentarioEdit){
        if(err){
            req.flash("error", "Error no banco de dados!");
            res.redirect("back");
        }else{
            res.render("comentario/edit", {camp_id: req.params.id,  comentarioEdit: comentarioEdit});
        }
    });
});

//ROTA-PUT-UPDATE-COMENTARIO - essa rota manda pro banco as infos novas, atualiza e redenriza
router.put("/:comentario_id",midleware.isAutorizedComentario, function(req, res){
    Comentario.findByIdAndUpdate(req.params.comentario_id, req.body.comentario, function(err, comentarioAtualizado){
        if(err){
            req.flash("error", "Error no banco de dados!");
            res.redirect("back");
        }else{
            req.flash("success", "Comentario atualizado com sucesso!");
            res.redirect("/camp/"+ req.params.id);
        }
    });
});

//ROTA-DELETE-DELETE-COMENTARIO - essa rota destroy pra sempre o comentario
router.delete("/:comentario_id",midleware.isAutorizedComentario, function(req,res){
    Comentario.findByIdAndRemove(req.params.comentario_id, function(err, comentarioDeletado){
        if(err){
            req.flash("error", "Error no banco de dados!");
            res.redirect("back")            
        }else{
            req.flash("success", "Comentario deletado com sucesso!");
            res.redirect("/camp/"+ req.params.id);
        }
    })
});


module.exports = router;