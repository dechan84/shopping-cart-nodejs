//The cart use a previous cart (oldCart) as a reference but if it doesnt exist
//it will be an empty object
module.exports =function Cart(oldCart){
    //Values assigned to a previous cart: items, totalQty and totalPrice
    //If OldCart is undefine use empty items and init totalQty and totalPrice to zero
    this.items=oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    
    //Adding items to the cart
    this.add = function(item, id){
        //Check the id of the stored item
        var storedItem = this.items[id];
        //if the item id is new then it will create a new group for that item,
        //initializing qty and price
        if (!storedItem){
            storedItem=this.items[id] = {item:item, qty:0, price:0};
        }
        //if there is a previous group of item or after it was created previously
        //then we increase qty and the total group price
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        storedItem.price =Math.round(storedItem.price * 100) / 100;
        // console.log('storedItem.price: '+storedItem.price);
        //storedItem.price = storedItem.price.toFixed(2);
        //We increase totalQty of all items and show the total price for all products
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
        this.totalPrice = Math.round(this.totalPrice * 100) / 100;
        
    };
    
    //Reduce by one an item from a group
    this.reduceByOne = function(id){
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;
        this.totalPrice = Math.round(this.totalPrice * 100) / 100;
        if (this.items[id].qty <=0){
            delete this.items[id];
        }
    }
    
    //Remove an item group
    this.removeItem = function(id){
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        this.totalPrice = Math.round(this.totalPrice * 100) / 100;
        delete this.items[id];
    }
    
    //Put a group of list in the items
    this.generateArray = function(){
        var arr =[];
        //Looping for the id in the item
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }
};