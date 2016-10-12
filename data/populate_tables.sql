--
-- Populate tables.
--
-- @author: hhayakawa_jp <hiroshi.hayakawa@oracle.com>
--

INSERT INTO ORACLEGO.STAFFS (
    ID,
    NAME,
    CATEGORY,
    DESCRIPTION,
    IMAGE,
    GEO_LOCATION,
    LATITUDE,
    LONGITUDE
) VALUES (
    --(SELECT MAX(ID) + 1 FROM ORACLEGO.STAFFS),
    1,
    '非常用消火器A',
    'disaster_equipment',
    '消火器です。',
    'images/001.jpg',
    MDSYS.SDO_GEOMETRY (
        2001,
        4326,
        MDSYS.SDO_POINT_TYPE (35.642288, 139.713643, NULL),
        NULL,
        NULL
    ),
    35.642288,
    139.713643
);

INSERT INTO ORACLEGO.STAFFS (
    ID,
    NAME,
    CATEGORY,
    DESCRIPTION,
    IMAGE,
    GEO_LOCATION,
    LATITUDE,
    LONGITUDE
) VALUES (
    (SELECT MAX(ID) + 1 FROM ORACLEGO.STAFFS),
    'トイレA',
    'facility',
    'トイレです。',
    'images/002.jpg',
    MDSYS.SDO_GEOMETRY (
        2001,
        4326,
        MDSYS.SDO_POINT_TYPE (35.641794, 139.714178, NULL),
        NULL,
        NULL
    ),
    35.641794,
    139.714178
);

INSERT INTO ORACLEGO.STAFFS (
    ID,
    NAME,
    CATEGORY,
    DESCRIPTION,
    IMAGE,
    GEO_LOCATION,
    LATITUDE,
    LONGITUDE
) VALUES (
    (SELECT MAX(ID) + 1 FROM ORACLEGO.STAFFS),
    'カレーの王様',
    'restaulant',
    'カレー屋です。',
    'images/003.jpg',
    MDSYS.SDO_GEOMETRY (
        2001,
        4326,
        MDSYS.SDO_POINT_TYPE (35.643265, 139.713191, NULL),
        NULL,
        NULL
    ),
    35.643265,
    139.713191
);

COMMIT;
