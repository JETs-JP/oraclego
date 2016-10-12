--
-- Create tables for Oracle Go.
--
-- @author: hhayakawa_jp <hiroshi.hayakawa@oracle.com>
--

CREATE TABLE ORACLEGO.STAFFS (
    ID NUMBER,
    NAME VARCHAR2(128),
    CATEGORY VARCHAR2(32),
    DESCRIPTION VARCHAR2(256),
    IMAGE VARCHAR2(256),
    GEO_LOCATION SDO_GEOMETRY,
    LATITUDE NUMBER(*, 6),
    LONGITUDE NUMBER(*, 6)
);

INSERT INTO USER_SDO_GEOM_METADATA
    VALUES (
        'STAFFS',
        'GEO_LOCATION',
        MDSYS.SDO_DIM_ARRAY(
            MDSYS.SDO_DIM_ELEMENT('Longitude', -180.0, 180.0, 0.05),
            MDSYS.SDO_DIM_ELEMENT('Latitude', -90.0, 90.0, 0.05)
        ),
        4326
    );

CREATE INDEX STAFFS_GEO_LOCATION
    ON ORACLEGO.STAFFS(GEO_LOCATION) INDEXTYPE IS MDSYS.SPATIAL_INDEX;
