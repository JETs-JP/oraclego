--
-- Create tables for Oracle Go.
--
-- @author: hhayakawa_jp <hiroshi.hayakawa@oracle.com>
--

CREATE TABLE ORACLEGO.STAFFS (
    ID NUMBER(*, 6),
    NAME VARCHAR2(128),
    CATEGORY VARCHAR2(32),
    DESCRIPTION VARCHAR2(256),
    IMAGE VARCHAR2(256),
    GEO_LOCATION SDO_GEOMETRY
);
