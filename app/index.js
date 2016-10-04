var express = require("express");
var app = express();

var PORT = process.env.PORT || 80;

var server = app.listen(PORT, function() {
    console.log("Node.js is listening to PORT:" + server.address().port);
});

// 地図上の物のサンプルデータ
var stuffList = [
    {
        id: "001",
        name: "非常用消化器A",
        type: "disaster_equipment",
        description: "消化器です",
        image: "images/001.jpg",
        distance: 100,
        latitude: 35.642288,
        longitude: 139.713643
    }, {
        id: "002",
        name: "トイレA",
        type: "facility",
        description: "トイレです",
        image: "images/002.jpg",
        distance: 100,
        latitude: 35.641794,
        longitude: 139.714178
    }, {
        id: "003",
        name: "カレーの王様",
        type: "restaulant",
        description: "カレー屋です",
        image: "images/003.jpg",
        distance: 100,
        latitude: 35.643265,
        longitude: 139.713191
    }
]

app.get("/stuff/list", function(req, res, next){
    res.json(stuffList);
});


