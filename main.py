from flask import Flask, render_template, request, redirect, session, url_for, flash
from werkzeug.security import generate_password_hash, check_password_hash
from db_connect import *

app = Flask(__name__)
app.secret_key = "Transmission commencing"


@app.route('/register', methods=['GET'])
def display_register():
    return render_template('register.html')


@app.route('/register_post', methods=['POST'])
def register_post():
    user_username = request.form['username']
    user_password = request.form['password']
    query = """SELECT username \
             FROM swusers \
             WHERE username = '{}'""".format(user_username)
    result = handle_database(query)
    print(result)
    if result == []:
        password = generate_password_hash(user_password, method='pbkdf2:sha224', salt_length=2)
        query = """INSERT INTO swusers (username, p4ssword) \
                    VALUES ('{}', '{}')""".format(user_username, password)
        handle_database(query)
        return redirect(url_for('login'))
    else:
        error = 'Username already in use.'
        return render_template('error.html', error=error)


@app.route('/login', methods=['GET'])
def display_login():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def login():
    user_username = request.form['username']
    query = """SELECT username \
             FROM swusers \
             WHERE username = '{}'""".format(user_username)
    result = handle_database(query)
    print(result)
    if result == []:
        error = 'Username not registered.'
        return render_template('error.html', error=error)
    if user_username in result[0][0]:
        user_password = request.form['password']
        query = """SELECT p4ssword \
                FROM swusers \
                WHERE username = '{}'""".format(user_username)
        result = handle_database(query)
        saved_password = result[0][0]
        if check_password_hash(saved_password, user_password):
            session['username'] = user_username
            print(session['username'])
            return redirect(url_for('index'))
        else:
            error = 'Authentification failed.'
            return render_template('error.html', error=error)
    else:
        error = 'Username not registered.'
        return render_template('error.html', error=error)


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/')
@app.route('/index')
def index():
    '''
        Displays the index page.
        Shows the planets as a table.
    '''
    table_headers = [
                    'Name',
                    'Diameter',
                    'Climate',
                    'Terrain',
                    'Surface water percentage',
                    'Population',
                    'Residents'
    ]
    planet_list = []
    if 'username' in session:
        user_username = session['username']
        return render_template('index.html', table_headers=table_headers, user_username=user_username)
    return render_template('index.html', table_headers=table_headers)


if __name__ == '__main__':
    app.run(debug=True)