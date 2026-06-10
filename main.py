
from flask import Flask, render_template, request, redirect, session, flash, url_for
from Core.Database import init_db
from Core.Auth import verify_owner, login_required
import os

app = Flask(__name__)

# Secret Key
app.secret_key = os.getenv("SECRET_KEY", "change-me-in-production")

# Initialize Database
init_db(app)



@app.route("/")
def home():
    return render_template("Home.html")



@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form.get("email", "").strip()
        password = request.form.get("password", "")

        # Debug (remove in production)
        print("FORM EMAIL:", repr(email))
        print("ENV EMAIL :", repr(os.getenv("OWNER_EMAIL")))

        if verify_owner(email, password):

            session["logged_in"] = True
            session["owner_email"] = email

            return redirect(url_for("dashboard"))

        flash("Invalid email or password.", "error")
        return redirect(url_for("login"))

    return render_template("login.html")



@app.route("/logout")
@login_required
def logout():

    session.clear()
    flash("Logged out successfully.", "success")

    return redirect(url_for("login"))


@app.route("/dashboard")
@login_required
def dashboard():

    return render_template("dashboard.html")



@app.route("/invoice")
@login_required
def invoice():

    return render_template("invoices.html")


@app.route("/payments")
@login_required
def payments():

    return render_template("payments.html")



@app.route("/products")
@login_required
def products():

    return render_template("products.html")



@app.route("/settings")
@login_required
def settings():

    return render_template("settings.html")

@app.route("/customers")
@login_required
def customers():
    return render_template("customers.html")

@app.route("/notifications")
@login_required
def notifications():
    return render_template("notifications.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=8080,debug=True)

