var Contactos = require('../model/model');
var bodyParser = require('body-parser');

    
let getContactos = (req, res) =>
{      
    console.log("llegue a leer");
    //Listar resultados
    Contactos.find(function(err,listaContactos)
    {
        //devuelvo resultado query   
        //console.log(listaContactos); 
        res.status(200).send(listaContactos);
        //si hay error
        (err)=>{
            res.status(500).send(err);
            console.log(err);
        }
    });
           
};
let getContactosById = (req, res) =>
{      
    console.log("llegue a leer con filtro");
    //Obtener id busqueda
    let idBusqueda = {dni: req.body.dniBuscado};
    console.log(idBusqueda);
    //Listar resultados
    Contactos.find(idBusqueda,function(err,todo)
    {
        (listaContactos)=>
        {
            res.status(200).send(listaContactos); //devuelvo resultado query   
            //console.log(listaContactos);    
        },
        (err)=>
        {
            res.status(500).send(err);
            console.log(err);
        }
    })
      
};

let insertContacto = (req,res) =>
{
    console.log(req.body);
    var newContacto = Contactos({
        nombre: req.body.nombre,
        domicilio: req.body.domicilio,
        cumple: req.body.cumple,
        dni: req.body.dni,
        mail: req.body.mail
    });
    newContacto.save().
    then
    (
        (newContacto)=>
        {
            res.status(200).send(newContacto); //devuelvo resultado query       
        },
        (err)=>
        { 
            res.status(500).send(err);
            console.log(err);
        }
    ) 
}
let updateContacto = (req,res) => 
{
    let id = { dni : req.body.dniBuscado};
   
    console.log("update",id);
   // console.log(newContacto);
    Contactos.findOneAndUpdate({ dni : req.body.dniBuscado},{$set : {nombre: req.body.newData.nombre}},{new:true},function(err)
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
module.exports = {getContactos,insertContacto,updateContacto,deleteContacto,getContactosById};

