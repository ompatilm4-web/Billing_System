from flask import Flask ,render_template ,redirect,url_for

app = Flask(__name__)


@app.route('/')
def home ():
    return "Welcom to Zade Traders laUDA LE MERA "


if __name__ == "__main__":
    app.run(debug=True,port=8080)

