import datetime
from hdbcli import dbapi
conn = dbapi.connect(
    address="hostname",
    port=00000,
	encrypt="true",
    user="",
    password="",
	currentschema=""
)

with conn.cursor() as cursor:
	sql = "select SESSION_USER, CURRENT_SCHEMA from DUMMY"
	cursor.execute(sql)
	result = cursor.fetchall()
print(result)

with conn.cursor() as cursor:
	sql = "select SYSTEM_ID, DATABASE_NAME, HOST, VERSION, USAGE from M_DATABASE"
	cursor.execute(sql)
	result = cursor.fetchall()
print(result)

with conn.cursor() as cursor:
	sql = "insert into \"fs-mta-db::tables.MyTable\" values (:created)"
	created = datetime.datetime.now()
	cursor.execute(sql, {"created": created})

with conn.cursor() as cursor:
	sql = "select * from \"fs-mta-db::tables.MyTable\""
	cursor.execute(sql)
	result = cursor.fetchall()
print(result)

conn.close()
