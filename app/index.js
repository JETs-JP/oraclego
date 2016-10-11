var express = require('express');
var bodyParser = require('body-parser');
var oracledb = require('oracledb');

var PORT = process.env.PORT || 8089;

var app = express();

var connectionProperties = {
    user: process.env.DBAAS_USER_NAME || "oracle",
    password: process.env.DBAAS_USER_PASSWORD || "password",
    connectString: process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR || "URL"
};

function doRelease(connection) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}

var router = express.Router();
router.use(function (request, response, next) {
    console.log("REQUEST:" + request.method + "   " + request.url);
    console.log("BODY:" + JSON.stringify(request.body));
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);
    next();
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

router.route('/list').get(function(request, response) {
    response.json(stuffList);
});

/**
 * GET /id
 * Returns the detail of a staff
 */
router.route('/:id').get(function (request, response) {
    console.log("GET STAFF BY ID:" + request.params.id);
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        var id = request.params.id;
        connection.execute(
            "SELECT ID, NAME FROM STAFFS WHERE ID = :id",
            [id],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }
                console.log("RESULTSET:" + JSON.stringify(result));
                if (result.rows.length === 1) {
                    var staff = {id: result.rows[0].ID, name: result.rows[0].NAME, geo_location: result.rows[0].GEO_LOCATION};
                    response.json(staff);
                    doRelease(connection);
                } else {
                    response.end();
                }
            }
        );
    });
});

app.use('/stuffs', router);
var server = app.listen(PORT, function() {
    console.log("Node.js is listening to PORT:" + server.address().port);
});
