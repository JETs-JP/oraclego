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
    GEO_LOCATION
) VALUES (
    (SELECT MAX(ID) + 1 FROM ORACLEGO.STAFFS),
    '非常用消火器A',
    'disaster_equipment',
    '消火器です',
    'images/001.jpg',
    MDSYS.SDO_GEOMETRY (
        2001,
        4326,
        MDSYS.SDO_POINT_TYPE (35.642288, 139.713643, NULL),
        NULL,
        NULL
    )
);
