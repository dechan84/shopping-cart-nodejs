var Product = require('../models/product');

var mongoose = require('mongoose');

//Adding mongoose cnx to mlab, remeber to change the user and pass before deploy
//Mongoose connect goes here...

// mongoose.connect('mongodb://localhost/shopping');

// Cat.create({
//     name: "Baobao",
//     age: 1,
//     temperament: "Happy"
// }, function(err, cat){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(cat);
//     }   
// })

var products = [
    Product.create({
    imagePath:'http://thegamesdb.net/banners/boxart/original/front/5178-1.jpg',
    title: 'Super Mario Bros',
    description: 'Classic Game from Nintendo!! Featuring Mario and Luigi',
    price: 10.99
}),
    Product.create({
    imagePath:'https://openretro.org/image/d66547971cd9d2b36451a0f9ba29574ce372e46f?s=512&f=jpg',
    title: 'The Legend of Zelda II',
    description: 'One of the most controversial and best Zelda game',
    price: 12.59
}),
    Product.create({
    imagePath:'https://openretro.org/image/d9df7dea3cc538902e538fe5d6df07e285206ded?s=512&f=jpg',
    title: 'Street Fighter',
    description: 'The original game that started it all! Experience the first one',
    price: 15.99
}),
    Product.create({
    imagePath:'https://openretro.org/image/88a4bca27bcf4d2e374e710f04a1998beb251b54?s=512&f=jpg',
    title: 'Ms Pac-Man',
    description: 'The sequel to classic Pac-Man made by Midway in the 80s',
    price: 3.59
}),
    Product.create({
    imagePath:'https://openretro.org/image/b92d41608caf66e9266eb2e8aaeb6ef5067a8107?s=512&f=jpg',
    title: 'Bomberman',
    description: 'The best action & puzzle game on NES minus multiplayer',
    price: 15.99
}),
    Product.create({
    imagePath:'https://openretro.org/image/31d6a3745e469483228f36b7f0136db2c6fce5c7?s=512&f=jpg',
    title: 'Chip & Dale',
    description: 'A Disney-Capcom game collaboration featuring Chip & Dale',
    price: 3.59
}),
    
];



// var done = 0;
// for (var i =0; i<products.length; i++){
//     products[i].save(function(err, result){
//         done++;
//         if(done === products.length){
//             exit();
//         }
//     });
// }

// function exit(){
//     mongoose.disconnect();
// }
