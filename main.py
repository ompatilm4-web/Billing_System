from flask import Flask, render_template, request, redirect, session, flash
from Core.Database import init_db, db
from Core.models import Product, Bill, BillItem
from Core.Auth import verify_owner, login_required
import os

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "change-me-in-production")

init_db(app)


@app.route('/')
def home():
    return render_template('Home.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email    = request.form.get('email', '').strip()
        password = request.form.get('password', '')

        print("FORM EMAIL:", repr(email))
        print("FORM PASS :", repr(password))
        print("ENV EMAIL :", repr(os.getenv('OWNER_EMAIL')))

        if verify_owner(email, password):
            session["logged_in"]    = True
            session["owner_email"]  = email
            return redirect("/dashboard")

        flash("Invalid email or password.", "error")
        return redirect("/login")

    return render_template('login.html')


@app.route('/logout')
def logout():
    session.clear()
    return redirect("/login")


@app.route('/dashboard', methods=['GET', 'POST'])
@login_required                                # 🔒 protected
def dashboard():
    return render_template('dashboard.html')


if __name__ == "__main__":
    app.run(debug=True, port=8080)