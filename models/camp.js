var   mongoose    = require("mongoose");


//esquema mongodb
var campSchema = new mongoose.Schema({
    nome: String,
    preco: String,
    imagem: String,
    descricao: String,
    autor: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    
    comentarios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comentario"
        }
    ]
    
});


//model
module.exports = mongoose.model("Camp", campSchema);