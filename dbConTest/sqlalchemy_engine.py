from sqlalchemy import create_engine, text
import psycopg2

# create the engine with the database url
engine = create_engine("postgresql://app:terminal@localhost:5432/fsFlaskReact")

# create connection to database
conn = engine.connect()

# execute a sql query
result = conn.execute(text('SELECT * FROM public.speakers'))

# loop through the result set and print the values
for row in result:
    print(row)

# close the result set and connection
result.close()
conn.close()