const express = require('express');
const router = express.Router();
const Snack = require("./snack");


router.get("/", (req, res, next) =>{ 
   try{
    // let newSnack = new Snack("cheetos", ".99")
    // console.log(newSnack) 
    return res.json({ shoppingList: Snack.getList() });
   } catch(err){
    return next(e)
   }
})

router.post("/", (req, res, next) => {
    try{
    let newSnack = new Snack(req.body.name, req.body.price);
    console.log(newSnack)
    return res.json({item: newSnack})
    } catch(e) {
        return next(e)
    }
})

router.get("/:name", (req, res, next) => {
    try{
        let search = Snack.search(req.params.name, req.body);
        return res.json({ item: search})
    } catch(err) {
        return next(err)
    }
});

router.patch('/:name', (req, res, next) => {
        try{
            let search = Snack.update(req.params.name, req.body);
            return res.json({ item: search});
        } catch(err) {
            return next(err)
        }
});

router.delete('/:name', (req, res, next) =>{
    try{
        Snack.remove(req.params.name);
        return res.json({message:'Deleted'});
    } catch(err){
        return next(err)
    }
})


module.exports=router;