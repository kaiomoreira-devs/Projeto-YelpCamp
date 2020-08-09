var mongoose    = require("mongoose"),
    Camp        = require("./models/camp"),
    Comentario  = require("./models/comentario");


//seeds data
// var data = [
//     {nome: "Os sammurs",
//     imagem: "https://www.ourolux.com.br/blog/wp-content/uploads/2019/06/acampar.jpg",
//     descricao: "É um fato estabelecido há muito tempo que um leitor se distrai com o conteúdo legível de uma página ao examinar seu layout. O objetivo de usar Lorem Ipsum é que ele tem uma distribuição de letras mais ou menos normal, em vez de usar 'Conteúdo aqui, conteúdo aqui', fazendo com que pareça um inglês legível. Muitos pacotes de editoração eletrônica e editores de páginas da web agora usam Lorem Ipsum como texto padrão do modelo, e uma pesquisa por 'lorem ipsum' descobrirá muitos sites ainda na infância. Várias versões evoluíram ao longo dos anos, às vezes por acidente, às vezes de propósito (humor injetado e similares).",},

//     {nome: "Camping smith",
//     imagem: "https://diaonline.ig.com.br/wp-content/uploads/2019/05/acampamento-no-interior-de-goias-conheca-destinos-incriveis-1024x665.jpeg",
//     descricao: "É um fato estabelecido há muito tempo que um leitor se distrai com o conteúdo legível de uma página ao examinar seu layout. O objetivo de usar Lorem Ipsum é que ele tem uma distribuição de letras mais ou menos normal, em vez de usar 'Conteúdo aqui, conteúdo aqui', fazendo com que pareça um inglês legível. Muitos pacotes de editoração eletrônica e editores de páginas da web agora usam Lorem Ipsum como texto padrão do modelo, e uma pesquisa por 'lorem ipsum' descobrirá muitos sites ainda na infância. Várias versões evoluíram ao longo dos anos, às vezes por acidente, às vezes de propósito (humor injetado e similares)."},

//     {nome: "Sunset",
//     imagem: "https://i1.wp.com/spcity.com.br/wp-content/uploads/2018/03/camping-finland-iloveimg-resized.jpg?resize=1200%2C700&ssl=1",
//     descricao: "É um fato estabelecido há muito tempo que um leitor se distrai com o conteúdo legível de uma página ao examinar seu layout. O objetivo de usar Lorem Ipsum é que ele tem uma distribuição de letras mais ou menos normal, em vez de usar 'Conteúdo aqui, conteúdo aqui', fazendo com que pareça um inglês legível. Muitos pacotes de editoração eletrônica e editores de páginas da web agora usam Lorem Ipsum como texto padrão do modelo, e uma pesquisa por 'lorem ipsum' descobrirá muitos sites ainda na infância. Várias versões evoluíram ao longo dos anos, às vezes por acidente, às vezes de propósito (humor injetado e similares)."}
    
// ]

function Seeds(){
    Camp.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
         console.log("Deletado com sucesso!");
        // data.forEach(function(seed){
        //     Camp.create(seed, function(err, camp){
        //         if(err){
        //             console.log(err);                    
        //         }else{
        //             console.log("Criado com sucesso!");
        //             Comentario.create({
        //                 autor: "kaio",
        //                 texto: "Existem muitas variações de passagens disponíveis de Lorem Ipsum, mas a maioria sofreu alterações de alguma forma, pelo humor injetado ou por palavras aleatórias que não parecem nem um pouco críveis."
        //             }, function(err, comentario){
        //                 if(err){
        //                     console.log(err);                            
        //                 }else{
        //                     camp.comentarios.push(comentario);
        //                     camp.save();
        //                     console.log("Comentario criado com sucesso!");
                            
        //                 }
        //             });             
        //         }
        //     });
        // }); 
    });
}

module.exports = Seeds;
