const items = require("./fakeDb")

class Snack{
    constructor(name, price) {
        this.name = name;
        this.price = price;
        //add to our db
        items.push(this);
    }
    static getList(){
        return items
      }

    static search(name) {
        const item = items.find(x => x.name === name);
        if (item){
            return item
        }else{
            throw { message: "item not found"} 
    }
}

static update(name, data) {
    let item = Snack.search(name);
    if(item){
        item.name = data.name;
        item.price = data.price;
        return item
    } else {
        throw { message:"item not found"}
    }


}

//from solutions
static remove(name) {
    let foundIdx = items.findIndex(v => v.name === name);
    if (foundIdx === -1) {
      throw {message: "Not Found", status: 404}
    }
    items.splice(foundIdx, 1);
  }
}


module.exports = Snack



// class Snack{
//     constructor(name, price) {
//         this.name = name;
//         this.price = price;

//         //add new item to db
//         items.push(this);
//     }

//     findAll = function(){
//         return items
//     }
// }

