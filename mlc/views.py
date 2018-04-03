import json
import datetime
from flask import request, render_template
from mlc import app
from mlc.models import User, Task, db

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
    task = Task(user_id=1, name=task_name, text=task_text, week_num=week_num, year_num=year_num) 
    db.session.add(task)
    db.session.commit()
    return json.dumps({'status':'ok'})


