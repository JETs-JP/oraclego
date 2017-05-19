@echo off

SET DBAAS_DEFAULT_CONNECT_DESCRIPTOR=localhost:1521/{your DBCS host name}
SET DBAAS_USER_NAME=ORACLEGO
SET DBAAS_USER_PASSWORD=ORACLEGO
SET PATH=%cd%\instantclient;%PATH%
SET OCI_LIB_DIR=%cd%\instantclient\sdk\lib\msvc
SET OCI_INC_DIR=%cd%\instantclient\sdk\include

CALL node_bundle.exe index.js
