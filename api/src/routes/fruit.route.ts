import Api from "../api";
import FruitRepository from "../repositories/fruit.mongodb.repository";
import { IFruit } from "../repositories/fruit.mongodb.repository";

export const FruitRoute = async ()=>{
    const Fruit = await FruitRepository.getInstance();


    Api.getInstance().then(instance=>{
        var app = instance.getApp();
        
        app.post('/fruit/save', async (req:any, res:any) => {
            try{
                res.status(200).send(await Fruit.save(req.body));
            } catch(error) {
                res.status(500).send(error)
            }
        });
    
        app.get('/fruit/get', async (req, res) => {
            try{
                res.status(200).send(await Fruit.find(req.body));
            } catch(error) {
                res.status(500).send(error)
            }        
        });

        app.delete('/fruit/delete/:id', async (req, res) => {
            try{
                res.status(200).send(await Fruit.delete(req.params.id));
            } catch(error) {
                res.status(500).send(error)
            }                
        });

        app.patch('/fruit/update/:id', async (req, res) => {
            try{
                res.status(200).send(await Fruit.update(req.params.id,req.body));
            } catch(error) {
                res.status(500).send(error)
            }            
        });
    
    });
}

