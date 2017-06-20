from flask import Flask, render_template, request, session

app = Flask(__name__)
app.secret_key = "Transmission commencing"


@app.route('/')
@app.route('/index')
def index():
    '''
        Displays the index page.
        Shows the planets as a table.
    '''
    table_headers = [
                    'Name',
                    'Diameter in km',
                    'Climate',
                    'Terrain',
                    'Surface water percentage',
                    'Population in formatted way'
    ]
    planet_list = []
    return render_template('index.html', table_headers=table_headers)


if __name__ == '__main__':
    app.run(debug=True)