const axios= require("axios");
const {Dog, Temperament, Dog_Temperament} = require("../db");
const getTemperament = async function(req, res){
try{
    var data = await Temperament.findAll({})
    res.json(data)
}catch(e){
    res.status(404).send(e.message)
}
}

async function temperDb() {
    var tempersApi=[]
    try {
      const {data} =  await axios.get('https://api.thedogapi.com/v1/breeds');

      data.forEach(raza => {
        if(raza.temperament){
        tempersApi = [...new Set( [...tempersApi, ...raza.temperament.split(', ')] )].sort()
       }
      });

      tempersApi.forEach(temp => {
        Temperament.create({name: temp})
      })
      console.log('Temperaments loaded')

    } catch (error) {
      console.error(error);
    }

}
async function deleteTemperament(req,res){
  try{
    const {id} = req.params
    Temperament.destroy({
        where : {id : id}
      })
      res.send("Temperamento eliminado con exito")
  }catch(e){
        res.send(e.message)
  }
}

module.exports = {
    getTemperament:getTemperament,
    temperDb,
    deleteTemperament,
}