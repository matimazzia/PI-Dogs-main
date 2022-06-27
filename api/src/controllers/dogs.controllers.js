const dogs = require("../models/Dog")
const axios= require("axios");
const {Dog, Temperament, Dog_Temperament} = require("../db");
const getDogs = async function(req, res){
    const{name}=req.query
    try{
        // traidos de la api
       const {data} = await axios.get('https://api.thedogapi.com/v1/breeds');
        var dogsFilter=[];
        data.forEach(e => dogsFilter.push({id:e.id,name:e.name,temperament:e.temperament,weight:e.weight}))
        // traidos de la db 
        const dogsDb= await Dog.findAll({
            attributes: ['id','name', 'weight'],
            include: Temperament,

        })
        if(dogsDb){
        var response= dogsDb.concat(dogsFilter)
        }else{
        var response=dogsFilter;
        }
        if(name){
        response =response.filter(e=> e.name===name)
        if(!response.length>=1){
                throw new Error("el perro no fue encontrado")
            }    
        }
        res.json(response)
        //junto los dos
        
    } catch(e){
         res.status(404).send(e.message)
    }
}

const getDogsRaza = async function(req,res){
    const{code}=req.params
    const {data} = await axios.get('https://api.thedogapi.com/v1/breeds');
try{    
if(code.length<=4){
    var raza = data.filter(e=> e.id === parseInt(code))
    const datos = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${raza[0].name}`)
    res.json(datos.data[0])
}else{
    const dogDb= await Dog.findByPk(code,{
        include: Temperament,
})
if(dogDb){
    res.json(dogDb)
}else{
    throw new Error('no se encontro el perro')
}
}
}catch(e){
    res.status(404).send(e.message)
}
};
const postDogs =async (req,res)=>{
    const {name,height,weight,life_span,pkt}= req.body;
    if(!(name&&weight&&height)){ throw new Error('Faltan agregar valores');}
try{
    const newDog = await Dog.create({
        name,
        height,
        weight,
        life_span
    })
    if(pkt.length>=1){
        pkt.map(async (e) => {
            var temp= await Temperament.findByPk(e)
            await newDog.setTemperaments(temp)})
            res.send("agregaste la raza con exito");  
     
    }else {res.send("agregaste la raza sin temperamento")}
}catch(e){
    res.status(404).send(e.message)
}
}

module.exports = {
    getDogs: getDogs,
    getDogsRaza:getDogsRaza,
    postDogs:postDogs
}