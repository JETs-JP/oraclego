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

router.route('/list').get(function(request, response) {
    response.json(stuffList);
});

/**
 * GET /nearby
 * Returns staffs nearby current location
 */
router.route('/nearby').get(function (request, response) {
    var lat = request.query.lat;
    var lon = request.query.lon;
    var dist = request.query.dist;
    console.log("GET STAFFS NEARBY CURRENT LOCATION: " + "lat=" + lat + " lon=" + lon + " dist=" + dist);
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        connection.execute(
            "SELECT ID, NAME, CATEGORY, DESCRIPTION, IMAGE, LATITUDE, LONGITUDE FROM STAFFS WHERE SDO_WITHIN_DISTANCE(GEO_LOCATION, SDO_GEOMETRY('POINT(" + lat + " " + lon + ")', 4326), 'distance=" + dist + " unit=KM') = 'TRUE'",
            [],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }
                console.log("RESULTSET:" + JSON.stringify(result));
                if (result.rows.length < 1) {
                    response.status(400).send("No staffs found nearby");
                    return;
                }
                var staffs = [];
                result.rows.forEach(function (element) {
                    staffs.push({
                        id: element.ID,
                        name: element.NAME,
                        category: element.CATEGORY,
                        description: element.DESCRIPTION,
                        image: element.IMAGE,
                        latitude: element.LATITUDE,
                        longitude: element.LONGITUDE
                    });
                }, this);
                response.json(staffs);
                doRelease(connection);
            }
        );
    });
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
            "SELECT ID, NAME, CATEGORY, DESCRIPTION, IMAGE, LATITUDE, LONGITUDE FROM STAFFS WHERE ID = :id",
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
                    var staff = {
                        id: result.rows[0].ID,
                        name: result.rows[0].NAME,
                        category: result.rows[0].CATEGORY,
                        description: result.rows[0].DESCRIPTION,
                        image: result.rows[0].IMAGE,
                        latitude: result.rows[0].LATITUDE,
                        longitude: result.rows[0].LONGITUDE
                    };
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
