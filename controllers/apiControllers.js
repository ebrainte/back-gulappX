var Dishes = require('../model/modelDish');
var Comments = require('../model/modelComment');
var bodyParser = require('body-parser');
var request = require("request")
const rp = require('request-promise')

    
let getDishes = (req, res) =>
{      
    console.log("Listado de Platos");
    //Listar resultados
    
    Dishes.find(function(err,listaPlatos)
    {
        //devuelvo resultado query   
        //console.log(listaContactos); 
        res.status(200).send(listaPlatos);
        //si hay error
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });
           
};


const getDishesbyName = async (req, res) =>
{      
    disharray = [];
    distance = String;
    console.log("lectura de platos por nombre");
    //Obtener id busqueda
    let name = {dishName: { $regex: '.*' + req.body.dishName + '.*', $options: 'i' } };
    console.log("ahora viene la variable");
    console.log(name);
    //Listar resultados

    Dishes.find(name, (err, text) =>{
        if (err){
            console.log(err);
            
            return res.status(500).send(text);
        }
        else{
            //console.log(text);
            console.log(req.body.address);
            if (req.body.address) {
                console.log("entro una direccion");
                console.log(req.body.address);
                    getDistance(req.body.address, text).then(function(data){ //element.restaurantAddress, text).then(function(data){
                        //console.log("ACA VIENE LA MAGIA" +  data);
                           return (data);
                        }).then(function(content){
                            console.log("ACA VIENE EL CONTENT:" + content);
                            return res.status(200).send(content);

                     })
                   
            }else
            {
                return res.status(200).send(text);
            }
            
            
        }
    })

      
};


let getDishesAutocomplete = (req, res) =>
{      
    console.log("autocomplete");
    //Obtener id busqueda
    let name = {dishName: { $regex: '.*' + req.body.dishName + '.*', $options: 'i' } };
    console.log("ahora viene la variable");
    console.log(name);
    //Listar resultados

    Dishes.findOne(name,{dishName: true}, (err, text) =>{
        if (err){
            console.log(err);
            return res.status(500).send(text);
        }
        else{
            console.log(text);
            return res.status(200).send(text);
        }
    })
    //     // (text)=>
    //     // {
    //     //     console.log(dishList);
    //     //     res.status(200).send(dishList); //devuelvo resultado query   
    //     //     //console.log(listaContactos);    
    //     // },
    //     // (err)=>
    //     // {
    //     //     res.status(500).send(err);
    //     //     console.log(err);
    //     // }
    // })
    // Dishes.find(name, (err, people) =>{
    //     if (err) return res.status(500).send(err)
    //     // send the list of all people in database with name of "John James" and age of 36
    //     // Very possible this will be an array with just one Person object in it.
    //     return res.status(200).send(people);
    // })

      
};



    async function getDistance(firstAddr,text ) {


        
            
            let promiseArray = text.map((value) => {
                // console.log(value);
                return rp({
                    uri: "https://maps.googleapis.com/maps/api/directions/json?origin=" + firstAddr + "&destination=" + value.restaurantAddress + "&key=AIzaSyBHfXPuQY3IGXBEFXzZ3Oo3HDqilYNVFv4",
                    json: true
                  })
                    .then(function (data)  {
                      var obj = data.routes[0].legs[0].distance.text;
                      console.log(obj);
                      asd = value;
                      asd.distance = obj;
                      console.log("PUTODEMIERDA" + asd);
                      return (asd);
                    })
    
            });
            // console.log(promiseArray);
            // resolve(promiseArray);

        return Promise.all(promiseArray);

        
      }
      


let getDistanceBetweenAddresses = (req, res) =>
{      
    console.log("distancia entre direcciones");
    //Obtener id busqueda
    let originAddr = req.body.originAddr;
    let destAddr = req.body.destAddr;
    console.log(originAddr);
    console.log(destAddr);
    var url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + originAddr + "&destination=" + destAddr + "&key=AIzaSyBHfXPuQY3IGXBEFXzZ3Oo3HDqilYNVFv4"
    console.log(url);
    // var url = "https://maps.googleapis.com/maps/api/directions/json?origin=41.43206,-81.38992&destination=42.43206,-81.38992&key=AIzaSyBHfXPuQY3IGXBEFXzZ3Oo3HDqilYNVFv4"
    let options = {json: true};


    rp({
        uri: "https://maps.googleapis.com/maps/api/directions/json?origin=" + originAddr + "&destination=" + destAddr + "&key=AIzaSyBHfXPuQY3IGXBEFXzZ3Oo3HDqilYNVFv4",
        json: true
      })
        .then((data) => {
          obj = data.routes[0].legs[0].distance.text;
          res.status(200).send(obj)
        })
        .catch((err) => {
          console.log(err)
        })


    // request(url, options, (error, res, body) => {
    //     if (error) {
    //         return  console.log(error)
    //     };

    //     if (!error && res.statusCode == 200) {
    //         obj = body.routes[0].legs[0].distance.text;
    //         console.log(obj);
            
    //     };
    // });
    // res.status(200).send(obj);


    
    // //Listar resultados
    // Contactos.find(idBusqueda,function(err,todo)
    // {
    //     (listaContactos)=>
    //     {
    //         res.status(200).send(listaContactos); //devuelvo resultado query   
    //         //console.log(listaContactos);    
    //     },
    //     (err)=>
    //     {
    //         res.status(500).send(err);
    //         console.log(err);
    //     }
    // })
      
};

let insertDish = (req,res) =>
{
    console.log(req.body);

    var newDish = Dishes({
        dishName: req.body.dishName,
        restaurantName: req.body.restaurantName,
        restaurantAddress: req.body.restaurantAddress,
        dishDescription: req.body.dishDescription,
        dishDetailedDesc: req.body.dishDetailedDesc,
        imageUrl: req.body.imageUrl,
        starAverage: req.body.starAverage,
        comments: req.body.comments,
    });
    newDish.save().
    then
    (
        (newDish)=>
        {
            res.status(200).send(newDish); //devuelvo resultado query       
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}
let insertComment = (req,res) => 
{
    console.log(req.body);

    var newComment = Comments({
        restaurantId: req.body.restaurantId,
        fullName: req.body.fullName,
        stars: req.body.stars,
        title: req.body.title,
        body: req.body.body
    });
    newComment.save().
    then
    (
        (newDish)=>
        {
            res.status(200).send(newComment); //devuelvo resultado query       
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    )
}

let getComments = (req, res) =>
{      
    console.log("Comentarios");
    //Listar resultados
    Comments.find(function(err,listaComentarios)
    {
        //devuelvo resultado query   
        //console.log(listaContactos); 
        res.status(200).send(listaComentarios);
        //si hay error
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });
           
};


let getCommentsbyId = (req, res) =>
{      
    console.log("llegue a leer con filtro");
    //Obtener id busqueda
    let idRestaurant = {restaurantId: req.body.idRestaurant};
    console.log(idRestaurant);
    //Listar resultados
    Comments.find(idRestaurant, (err, text) =>{
        if (err){
            console.log(err);
            return res.status(500).send(text);
        }
        else{
            console.log(text);
            return res.status(200).send(text);
        }
    })
      
};



let updateRestaurant = (req,res) => 
{
    let id = { id : req.body.id};
   
    console.log("update",id);
   // console.log(newContacto);
    Dishes.findOneAndUpdate({ _id : req.body.id},{$set : {restaurantName: req.body.restaurantName}},{new:true},function(err)
    {
       //console.log("respuesta",res);
       //let rta = {estado: "Ok"};
       res.status(200).send({estado:"Registro modificado"}); //devuelvo resultado query       
       (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    
    });
}

let deleteContacto = (req,res)=>
{
    let id = { dni : req.body.dniEliminado};
    Contactos.deleteOne(id, function(err)
    {
        res.status(200).send({estado:"Registro eliminado"}); //devuelvo resultado  
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }      
    });
           
   
}
module.exports = {getDishes,getDishesbyName,getDishesAutocomplete,insertDish,insertComment,getComments,getCommentsbyId,updateRestaurant,deleteContacto,getDistanceBetweenAddresses};

