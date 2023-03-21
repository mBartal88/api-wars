import os
import psycopg2
import psycopg2.extras


def get_connection_string():
    # IN CASE DATABASE CLIENT RETURN ONLY THE URL
    # return 'DATABASE_URL'
    
    #FOR LOCAL USAGE
    user_name = 'PSQL USERNAME'
    password = 'PSQL PASSWORD'
    host = 'PSQL HOST'
    database_name = 'PSQL DATABASE'
    
    creditentials_defined = user_name and password and host and database_name
    
     if creditentials_defined:
         return 'postgresql://{user_name}:{password}@{host}/{database_name}'.format(
             user_name=user_name,
             password=password,
             host=host,
             database_name=database_name
         )
     else:
         raise KeyError('Some necessary environment variable(s) are not defined')


def open_database():
    try:
        connection_string = get_connection_string()
        connection = psycopg2.connect(connection_string)
        connection.autocommit = True
    except psycopg2.DatabaseError as exception:
        print('Database connection problem')
        raise exception
    return connection


def connection_handler(function):
    def wrapper(*args, **kwargs):
        connection = open_database()
        dict_cur = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        ret_value = function(dict_cur, *args, **kwargs)
        dict_cur.close()
        connection.close()
        return ret_value

    return wrapper
