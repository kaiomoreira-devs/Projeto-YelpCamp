var express = require("express"),
    Camp    = require("../models/camp"),
    Comentario = require("../models/comentario"),
    router  = express.Router(),
    midleware  = require("../midleware");

//INDEX - mostra todos acampamentos
router.get("/", function(req, res){
    Camp.find({}, function(err, camps){
        if(err){
            console.log(err);
        }else {
            res.render("camp/index", {allCamp : camps});
        }
    })
    
});

// NEW - mostra formulario para criar acamapamento
router.get("/new",midleware.isLoggedIn, function(req, res){
    res.render("camp/new");
});

//CREATE - adiciona novo acampamentos no banco
router.post("/",midleware.isLoggedIn, function(req, res){
    var nome      = req.body.nome,
        imagem    = req.body.imagem,
        preco     = req.body.preco,
        descricao = req.body.descricao;
    
    var  autor = {
        id: req.user._id,
        username: req.user.username
    }

    var newDataCamp = {nome: nome, imagem: imagem, preco: preco , descricao: descricao, autor: autor}
    Camp.create(newDataCamp, function(err, camp){
        if(err){
            req.flash("error", "Error no banco de dados!"); 
            console.log(err);            
        }else{
            req.flash("success", "Acampista criado com sucesso!");        
            res.redirect("/camp");
        }
    }); 
});


//SHOW - mostra mais informações sobre um acamapamento
router.get("/:id", function(req, res){
    Camp.findById(req.params.id).populate("comentarios").exec(function(err, foundCamp){
        if(err){
            req.flash("error", "Error no banco de dados!"); 
            console.log("back");            
        }else{
            res.render("camp/show", {camp: foundCamp});
        }
    });
    
});

//EDIT - edita infoções do camping criado
router.get("/:id/edit",midleware.isAutorizedCamp, function(req, res){
    Camp.findById(req.params.id, function(err, campEdit){
        res.render("camp/edit", {campEdit: campEdit});
    });
});

//UPDATE - atualiza os dados no banco e renderiza no html atualizado
router.put("/:id",midleware.isAutorizedCamp, function(req, res){
    Camp.findByIdAndUpdate(req.params.id, req.body.camp, function(err, CampAtualizado){
        if(err){
            req.flash("error", "Error no banco de dados!");  
            res.redirect("/camp");
        }else{
            req.flash("success", "Acampista atualizado com sucesso!");  
            res.redirect("/camp/" + req.params.id);
        }
    });
});

// DELETE - deleta um acampamento postado na show
router.delete("/:id",midleware.isAutorizedCamp,function (req, res){
    Camp.findByIdAndDelete(req.params.id, function(err, campDeletado){
        if(err){
            req.flash("error", "Error no banco de dados!");  
            res.redirect("/camp");
        }else{
            req.flash("success", "Acampista deletado com sucesso!");  
            res.redirect("/camp");
        }
    });
});


module.exports = router;
