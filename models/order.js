//Interact from node with mongoDB mlab
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
   user:{
       //We are storing an ID from another model, the user model
       type: Schema.Types.ObjectId, ref:'User', 
   },
   cart:{
       type: Object, 
       required: true
   },
   address:{
       type: String, 
       required: true
   },
   name:{
       type: String, 
       required: true
   },
   paymentId:{
       type: String,
       required: true
   },
   createdAt:{
      type: Date, 
      default: Date.now
   }
});

module.exports = mongoose.model('Order', productSchema);