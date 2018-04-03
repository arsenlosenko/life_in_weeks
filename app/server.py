import json
import datetime
from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User email=%r age=%r>' % (self.email, self.age)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(120), nullable=False)
    text = db.Column(db.Text, nullable=False)
    week_num = db.Column(db.Integer, nullable=False)
    year_num = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Task name=%r user_id=%r>' % (self.name, self.user_id)

@app.before_request
def before_request():
    if 'localhost' in request.host_url or '0.0.0.0' in request.host_url:
        app.jinja_env.cache = {}

@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route("/calendar", methods=['GET', 'POST'])
def calendar():
    age = int(request.form.get('age'))
    week_num = datetime.datetime.now().isocalendar()[1]
    user = User(age=age, email='test@testovich.com')
    db.session.add(user)
    db.session.commit()
    return render_template('calendar.html', age=age, week_num=week_num)

@app.route("/sendTaskData", methods=["POST"])
def save_task():
    task_name = request.form.get('name')
    task_text = request.form.get('text')
    week_num = request.form.get('weekNum')
    year_num = request.form.get('yearNum')
    return json.dumps({'status':'ok'})


if __name__ == "__main__":
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True)
