from psycopg2 import sql
import database_common


@database_common.connection_handler
def get_users(cursor):
    query = f"""SELECT * FROM users;"""
    cursor.execute(query)
    user_data = cursor.fetchall()
    authentication = {}
    for user in user_data:
        rebuild_data = {user["username"]: user["password"] for (k, v) in user.items()}
        authentication.update(rebuild_data)
    return authentication


@database_common.connection_handler
def register_user(cursor, username, password):
    query = f"""INSERT INTO users (username, password) VALUES ('{username}', '{password}');"""
    cursor.execute(query)
    return cursor.statusmessage


@database_common.connection_handler
def add_vote(cursor, planet):
    query = f"""INSERT INTO planets (name, vote) VALUES ('{planet}', 1);"""
    cursor.execute(query)
    return cursor.statusmessage


@database_common.connection_handler
def update_vote(cursor, planet):
    query = f"""UPDATE planets SET vote = vote + 1 WHERE name='{planet}';"""
    cursor.execute(query)
    return cursor.statusmessage


@database_common.connection_handler
def get_planets(cursor):
    query = f"""SELECT * FROM planets ORDER BY vote DESC;"""
    cursor.execute(query)
    return cursor.fetchall()
