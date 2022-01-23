var express = require('express');
var app = express();
var dotenv = require('dotenv');
var mongo = require('mongodb');
var cors= require('cors');
const bodyParser = require('body-parser');
var MongoClient = mongo.MongoClient;
dotenv.config();
var mongoUrl = process.env.MongoLiveUrl;
var port = process.env.PORT || 8500;
app.use(bodyParser.urlencoded({ extented: true }));
app.use(bodyParser.json());
app.use(cors());

var db;
//test
app.get('/', (req, res) => {
    res.send("i am from express ");
});

// list of all city >>>>>>>>>>>
app.get('/location', (req, res) => {
    db.collection('location').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

// all meal type >>>>>>>>>>
app.get('/mealType', (req, res) => {
    db.collection('mealType').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
});
/*
//all list of resturants
app.get('/resturantData',(req,res)=>{
    db.collection('resturantData').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
});

*/

// resturant wrt city (query params) >>>>>>
app.get('/resturantData', (req, res) => {
    var query = {};
    if (req.query.city) {
        query = { state_id: Number(req.query.city) }
    }
    db.collection('resturantData').find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

// all list of  menu wrt resturant>>>>>>>>>>>>
app.get('/resturantMenu/:id', (req, res) => {
    var id = parseInt(req.params.id);
    db.collection('resturantMenu').find({ "restaurant_id": id }).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

//Menu wrt to id's
app.post('/menuItem', (req, res) => {
    // console.log(req.body)
    db.collection('resturantMenu').find({ "menu_id": { $in: req.body } }).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
});


//list of all orers >>>>>>>>>>>
app.get('/orderPage', (req, res) => {
    db.collection('orderPage').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

app.post('/placeorder', (req, res) => {
    db.collection('orderPage').insert(req.body, (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log(result)
    })
});

app.delete('/deleteorder', (req, res) => {
    db.collection('orderPage').remove({}, (err, result) => {
        if (err) throw err;
        res.send("order deleted")
    })
})

app.put('/updateStatus/:id', (req, res) => {
    var id = Number(req.params.id);
    var status= req.body.status?req.body.status:"pending"
    db.collection('orderPage').updateOne(
        { id: id }, {
            $set:

            {
                "date": req.body.date,
                "bank_status": req.body.bank_status,
                "bank": req.body.bank,
                "status": status
            }
    }
    )
    res.send("data updated");
});





//list of resturant details on the basic of id (params) >>>>>>>>>>

app.get('/resturant/:id', (req, res) => {
    var id = parseInt(req.params.id);
    db.collection('resturantData').find({ 'restaurant_id': id }).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
})


//Find resturant on the basic of meal type (params)>>>>>>>>cuisine, cost and sort too
app.get('/resturantData/:id', (req, res) => {
    var id = parseInt(req.params.id);
    var query = { "mealTypes.mealtype_id": id };
    var sort = { cost: 1 };
    if (req.query.sortkey) {
        var sortkey = req.query.sortkey;
        if (sortkey > 1 || sortkey < -1 || sortkey == 0) {
            sortkey = 1;
        }
        sort = { cost: Number(sortkey) }
    };

    if (req.query.cuisine && req.query.lcost && req.query.hcost) {
        var lcost = Number(req.query.lcost);
        var hcost = Number(req.query.hcost);
        query = {
            "cuisines.cuisine_id": Number(req.query.cuisine),
            $and: [{ cost: { $gt: lcost, $lt: hcost } }],
            "mealTypes.mealtype_id": id,
        }

    }
    else if (req.query.cuisine) {
        query = { "mealTypes.mealtype_id": id, "cuisines.cuisine_id": Number(req.query.cuisine) }
    } else if (req.query.lcost && req.query.hcost) {
        var lcost = Number(req.query.lcost);
        var hcost = Number(req.query.hcost);
        query = { $and: [{ cost: { $gt: lcost, $lt: hcost } }], "mealTypes.mealtype_id": id };
    }


    db.collection('resturantData').find(query).sort(sort).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});




// database connection with node
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) console.log("erroe while connecting");
    db = client.db('Amato');
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    });
})


