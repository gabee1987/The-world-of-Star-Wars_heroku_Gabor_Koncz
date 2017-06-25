'''
    SQL database handler for The-world-of-Star-Wars assignment.
    by Gabor Koncz
'''


import os
import psycopg2
import urllib
'''from local_config import *'''


def connect_db(connect_data):
    '''
        Set the connection with the database.
    '''
    connection = None
    try:
        urllib.parse.uses_netloc.append('postgres')
        url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
        connection = psycopg2.connect(
            database=url.path[1:],
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port
        )
        conn = psycopg2.connect(connection)
        return connection
    except Exception as error:
        print(error)
        return 'connection error'


def handle_database(query):
    '''
        Handle querys from database.
    '''
    result = {}

    urllib.parse.uses_netloc.append('postgres')
    url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
    connection = psycopg2.connect(
            database=url.path[1:],
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port
        )

    connect_data = "dbname={0} user={1} password={2} host={3} port={4}".format(url.path[1:], url.username, url.password, url.hostname, url.port)
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
