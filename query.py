from hdbcli import dbapi
conn = dbapi.connect(
    address="hostname",
    port=00000,
	encrypt="true",
    user="",
    password=""
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
	sql = "select MYVALUE from MYTABLE"
	cursor.execute(sql)
	result = cursor.fetchall()
print(result)

conn.close()
