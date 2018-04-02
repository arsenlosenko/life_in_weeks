import json
import datetime
import sqlite3
from flask import Flask, request, render_template, g

app = Flask(__name__)

DATABASE = 'database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route("/", methods=['GET', 'POST'])
def index():
    # ask for initial info (age), tell story about life calendar
    return render_template('index.html')

@app.route("/calendar", methods=['GET', 'POST'])
def calendar():
    # show calendar with highlighted weeks according to age (pass age from index)
    age = int(request.form.get('age'))
    cur = get_db().cursor()
    cur.execute('insert into users (age, email) values (?, ?);', (age, 'arsenlosenko@gmail.com'))
    week_num = datetime.datetime.now().isocalendar()[1]
    return render_template('calendar.html', age=age, week_num=week_num)

@app.route("/sendTaskData", methods=["POST"])
def save_task():
    task_name = request.form.get('name')
    task_text = request.form.get('text')
    week_num = request.form.get('weekNum')
    year_num = request.form.get('yearNum')
    cur = get_db().cursor()
    return json.dumps({'status':'ok'})


if __name__ == "__main__":
    app.run(debug=True)
