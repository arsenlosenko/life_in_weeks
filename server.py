import datetime
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def index():
    # ask for initial info (age), tell story about life calendar
    return render_template('index.html')

@app.route("/calendar", methods=['GET', 'POST'])
def calendar():
    # show calendar with highlighted weeks according to age (pass age from index)
    age = int(request.form.get('age'))
    week_num = datetime.datetime.now().isocalendar()[1]
    return render_template('calendar.html', age=age, week_num=week_num)

@app.route("/sendTaskData", methods=["POST"])
def save_task():
    task_data = request.form.get('body')
    print(task_data)


if __name__ == "__main__":
    app.run(debug=True)
