'''
    SQL database handler for The-world-of-Star-Wars assignment.
    by Gabor Koncz
'''


import os
import psycopg2
import urllib
from local_config import *


urllib.parse.uses_netloc.append('postgres')
url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
connection = psycopg2.connect(
    database=url.path[1:],
    user=url.username,
    password=url.password,
    host=url.hostname,
    port=url.port
)


def connect_db(connect_data):
    '''
        Set the connection with the database.
    '''
    conn = None
    try:
        conn = psycopg2.connect(connect_data)
        return conn
    except Exception as error:
        print(error)
        return 'connection error'


def handle_database(query):
    '''
        Handle querys from database.
    '''
    result = {}
    connect_data = "dbname={0} user={1} password={2} host={3}".format(DATABASE, USER, PASSWORD, HOST)
    connection = connect_db(connect_data)
    if connection == 'connection error':
        result = 'Connection error. Server unreachable.'
        return result
    else:
        try:
            connection.autocommit = True
            cursor = connection.cursor()
            cursor.execute(query)
            if "SELECT" in query:
                result = cursor.fetchall()
            cursor.close()
        except Exception as error:
            result = error
            print(error)
        return result
