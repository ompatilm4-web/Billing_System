from flask import Flask ,render_template ,redirect,url_for,request

app = Flask(__name__)


@app.route('/',methods=['GET','POST'])
def home ():
    if request.method  == 'POST':
        pass
    return render_template('Home.html')

@app.route('/login',methods=['GET','POST'])
def login ():
    if request.method == 'POST':
        pass
    return render_template('login.html')

@app.route('/dashboard',methods = ['GET','POST'])
def dashboard ():
    if request.method == 'POST':
        pass
    return render_template('dashboard.html')

if __name__ == "__main__":
    app.run(debug=True,port=8080)

