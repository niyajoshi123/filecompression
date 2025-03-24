from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to connect

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="rootpassword",
    database="file_compression"
)

cursor = db.cursor()

# Route for User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    try:
        query = "INSERT INTO user (username, email, password_) VALUES (%s, %s, %s)"
        values = (username, email, password)
        cursor.execute(query, values)
        db.commit()
        return jsonify({"message": "User registered successfully!"}), 201
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error: {err}"}), 500

# Route for User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    query = "SELECT * FROM user WHERE username = %s AND password_= %s"
    cursor.execute(query, (username, password))
    user = cursor.fetchone()

    if user:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)
