from flask import Flask, request, redirect, url_for
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)

# Configure db
db = yaml.load(open('app.yaml'), Loader=yaml.FullLoader)
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']
mysql = MySQL(app)

@app.route('/login', methods=['GET'])
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    if not username or not password:
        return "Please provide both username and password", 400

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT password FROM User WHERE username = %s", (username,))
    result = cursor.fetchone()
    if result:
        stored_password = result[0]
        if password == stored_password:
            return redirect(url_for('home'))
        else:
            return "Incorrect password", 401
    else:
        return "Username does not exist", 404
    

@app.route('/signup', methods=['POST'])
def signup():
    username = request.form['username']
    password = request.form['password']
    state_id = request.form['state_id']
    gender = request.form['gender']
    if not username or not password or not state_id or not gender:
        return "Please provide all required information: username, password, state ID, and gender", 400
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM User WHERE username = %s", (username,))
    if cursor.fetchone():
        return "Username already exists", 409  
    cursor.execute("INSERT INTO User(username, stateID, gender, password) VALUES(%s, %s, %s, %s)", (username, state_id, gender, password))
    mysql.connection.commit()
    cursor.close()
    return redirect(url_for('login'))

@app.route('/')
def home():
    return "Welcome to the Home Page!"  

if __name__ == '__main__':
    app.run(debug=True)
