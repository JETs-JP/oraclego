var express = require('express');
var bodyParser = require('body-parser');
var oracledb = require('oracledb');
var sanitizer = require('sanitizer');

var PORT = process.env.PORT || 8089;
var app = express();
app.use('/images', express.static('images'));

var connectionProperties = {
    user         : process.env.DBAAS_USER_NAME || "oracle",
    password     : process.env.DBAAS_USER_PASSWORD || "password",
    connectString: process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR || "URL"
};
oracledb.autoCommit = true;

function doRelease(connection) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

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
 * Returns stuffs nearby current location
 */
router.route('/nearby').get(function (request, response) {
    var lat = sanitizer.escape(request.query.lat);
    var lon = sanitizer.escape(request.query.lon);
    var dist = sanitizer.escape(request.query.dist);
    if (isNaN(lat) || isNaN(lon) || isNaN(dist)) {
        console.error("Invalid request parameter");
        response.status(400).send("Invalid request parameter");
        return;
    }
    console.log("GET STUFFS NEARBY CURRENT LOCATION: " + "lat=" + lat + " lon=" + lon + " dist=" + dist);
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        connection.execute(
            "SELECT ID, NAME, CATEGORY, DESCRIPTION, IMAGE, LATITUDE, LONGITUDE FROM STUFFS WHERE SDO_WITHIN_DISTANCE(GEO_LOCATION, SDO_GEOMETRY('POINT(" + lat + " " + lon + ")', 4326), 'distance=" + dist + " unit=KM') = 'TRUE'",
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
                    response.status(400).send("No stuffs found nearby");
                    return;
                }
                var stuffs = [];
                result.rows.forEach(function (element) {
                    stuffs.push({
                        id: element.ID,
                        name: element.NAME,
                        category: element.CATEGORY,
                        description: element.DESCRIPTION,
                        image: element.IMAGE,
                        latitude: element.LATITUDE,
                        longitude: element.LONGITUDE
                    });
                }, this);
                response.json(stuffs);
                doRelease(connection);
            }
        );
    });
});

/**
 * GET /id
 * Returns the detail of a stuff
 */
router.route('/:id').get(function (request, response) {
    console.log("GET STUFF BY ID:" + request.params.id);
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        var id = request.params.id;
        connection.execute(
            "SELECT ID, NAME, CATEGORY, DESCRIPTION, IMAGE, LATITUDE, LONGITUDE FROM STUFFS WHERE ID = :id",
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
                    var stuff = {
                        id: result.rows[0].ID,
                        name: result.rows[0].NAME,
                        category: result.rows[0].CATEGORY,
                        description: result.rows[0].DESCRIPTION,
                        image: result.rows[0].IMAGE,
                        latitude: result.rows[0].LATITUDE,
                        longitude: result.rows[0].LONGITUDE
                    };
                    response.json(stuff);
                    doRelease(connection);
                } else {
                    response.end();
                }
            }
        );
    });
});

/**
 * POST /
 * Saves a new stuff.
 */
router.route('/').post(function(request, response) {
    console.log("POST STUFF");
    oracledb.getConnection(connectionProperties, function(err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        var body = request.body;
        connection.execute(
            "INSERT INTO ORACLEGO.STUFFS (ID, NAME, CATEGORY, DESCRIPTION, IMAGE, GEO_LOCATION, LATITUDE, LONGITUDE) VALUES ((SELECT MAX(ID) + 1 FROM ORACLEGO.STUFFS), :name, :category, :description, :image, MDSYS.SDO_GEOMETRY (2001, 4326, MDSYS.SDO_POINT_TYPE (:latitude, :longitude, NULL), NULL, NULL), :latitude, :longitude)",
            [body.name, body.category, body.description, body.image, body.latitude, body.longitude, body.latitude, body.longitude],
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error saving stuff to DB");
                    doRelease(connection);
                    return;
                }
                response.status(201).end();
                doRelease(connection);
            }
        );
    });
});

app.use('/stuffs', router);
var server = app.listen(PORT, function() {
    console.log("Node.js is listening to PORT:" + server.address().port);
})
