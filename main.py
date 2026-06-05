from flask import Flask, render_template, request
from Core.Database import init_db, db
from Core.models import Product, Bill, BillItem

app = Flask(__name__)

init_db(app)


@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('Home.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    return render_template('login.html')


@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    return render_template('dashboard.html')


# @app.route('/create-db')
# def create_db():
#     with app.app_context():
#         db.create_all()

#     return "Database Created Successfully"


if __name__ == "__main__":
    app.run(debug=True, port=8080)
    