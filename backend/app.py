from flask import Flask, jsonify, request
from flask_cors import CORS

import mysql.connector

app = Flask(__name__)
CORS(app)


connection = mysql.connector.connect(

    host="localhost",

    user="root",

    password="Anish@3124",

    database="expense_ai"

)

cursor = connection.cursor(dictionary=True)

@app.route("/")

def home():

    return "ExpenseAI Backend Running"


@app.route("/expenses", methods=["GET"])

def get_expenses():

    cursor.execute(

        "SELECT * FROM expenses"

    )

    expenses = cursor.fetchall()

    return jsonify(expenses)


@app.route("/expenses", methods=["POST"])

def add_expense():

    data = request.json

    query = """

    INSERT INTO expenses
    (amount, category, description)

    VALUES (%s, %s, %s)

    """

    values = (

        data["amount"],
        data["category"],
        data["description"]

    )

    cursor.execute(query, values)

    connection.commit()

    return jsonify({

        "message": "Expense Added"

    })
@app.route("/expenses/<int:id>", methods=["DELETE"])

def delete_expense(id):

    query = """

    DELETE FROM expenses

    WHERE id = %s

    """

    cursor.execute(query, (id,))

    connection.commit()

    return jsonify({

        "message": "Expense Deleted"

    })
@app.route("/expenses/<int:id>", methods=["PUT"])

def update_expense(id):

    data = request.json

    query = """

    UPDATE expenses

    SET amount = %s,
        category = %s,
        description = %s

    WHERE id = %s

    """

    values = (

        data["amount"],
        data["category"],
        data["description"],
        id

    )

    cursor.execute(query, values)

    connection.commit()

    return jsonify({

        "message": "Expense Updated"

    })


if __name__ == "__main__":

    app.run(debug=True)