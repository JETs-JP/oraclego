--
-- Create database user and schema for Oracle Go.
--
-- @author: hhayakawa_jp <hiroshi.hayakawa@oracle.com>
--

CREATE USER ORACLEGO IDENTIFIED BY ORACLEGO DEFAULT TABLESPACE USERS TEMPORARY TABLESPACE TEMP;
ALTER USER ORACLEGO quota unlimited on USERS;
GRANT CONNECT, RESOURCE, CREATE TABLE, CREATE SEQUENCE TO ORACLEGO;