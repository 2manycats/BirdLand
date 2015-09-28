var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/birds';


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  var directory = process.cwd();

// Changing the working directory
//  process.chdir('static');

  console.log('Example app listening at http://%s:%s', host, port);
  console.log('Starting directory: ' + directory);
//  console.log('New directory: ' + process.cwd());

});

// Testing database connection

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

// Insert a document into the birds collection
/* Geographic Coordinates:

Austin:
Latitude: 30.2671500
Longitude: -97.7430600 

Dripping Springs:
Latitude:30.190207
Longitude:-98.086678

Bee Caves:
Latitude:30.306098
Longitude:-97.9523768

Llano:
Latitude:30.7593452
Longitude:-98.6750379

Burnett:
Latitude:30.7593452
Longitude:-98.6750379
*/
/*
var reporter = 'me';//request.json['reporter'];
var bird_species = 'mockingbird'; //request.json['bird_species'];
var datetime = '9/22/2015'; //request.json['datetime'];
var lat = '30.7593452'; //request.json['lat'];
var lon = '-97.9523768'; //request.json['long'];
var image = ''; //request.json['image'];
var sound = ''; //request.json['sound'];
var notes = ''; //request.json['notes'];


var insertDocument = function(db, callback) {
   db.collection('birds').insert( {
        'reporter' : reporter,
        'bird_species': bird_species,
        'datetime': datetime,
        'image': image,
        'sound': sound,
        'notes': notes,
        'coord': [ lat, lon ]
      }), function(err, result) {
    assert.equal(err, null);
    if(result!=null){
      console.log("Inserted a document into the birds collection.");
      callback(result);      
    }
    else {
      console.log("Nothing to insert.");
    }
  };
};


MongoClient.connect(url, function(db) {
  insertDocument(db, function() {
      db.close();
  });
}); */

// Retrieve all birds from the birds collection 

var getBirds = function(db, callback) {
   var birds =[];
   var cursor =db.collection('birds').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.log(doc);
         birds.push(doc);
      } else {
        console.log('There are no birds.');
        callback();      
      }
    //console.log(birds);
    return birds; 
   });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  getBirds(db, function() {
      db.close();
  });
}); 

// Delete all birds from the birds collection

var killBirds = function(db, callback) {
   db.collection('birds').deleteMany( {}, 
    function(err, results) {
      console.log(results);
      callback();
   });
};


//Delete just grackles from the birds collection

var killGrackles = function(db, callback) {
   db.collection('birds').deleteOne( 
    {'bird_species':'grackle'}, 
    function(err, results) {
      console.log(results);
      callback();
   });
};

// Commenting this out so I don't automatically kill all my birds again.
/*
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  killBirds(db, function() {
      db.close();
  });
}); */

/*
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  killGrackles(db, function() {
      db.close();
  });
}); */

// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  //res.send('Hello Birds!');
  res.json(getBirds(birds));
});

// accept POST request on the homepage
app.post('/', function (req, res) {
  //res.send('Got a POST request');
  MongoClient.connect(url, function(db) {
  var reporter = request.json['reporter'];
  var bird_species = request.json['bird_species'];
  var datetime = request.json['datetime'];
  var lat = request.json['lat'];
  var lon = request.json['long'];
  var image = request.json['image'];
  var sound = request.json['sound'];
  var notes = request.json['notes'];

   db.collection('birds').insert( {
      'reporter' : reporter,
      'bird_species': bird_species,
      'datetime': datetime,
      'image': image,
      'sound': sound,
      'notes': notes,
      'coord': [ lat, lon ]
    });
  });
});

// accept PUT request at /user
app.put('/', function (req, res) {
  res.send('Got a PUT request at /user');
});

// accept DELETE request at /user
app.delete('/', function (req, res) {
  res.send('Got a DELETE request at /user');
  killBirds();
});

//<<<<<<< HEAD
//=======

app.use( express.static( __dirname + '/public/'))
app.get('/static', function(req, res) {
  res.sendFile( __dirname + '/public/index.html');
});
//>>>>>>> restructure-frontend
