from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/")
def index():
    # ask for initial info (age), tell story about life calendar
    return render_template('index.html')

@app.route("/calendar")
def calendar():
    # show calendar with highlighted weeks according to age (pass age from index)
    return render_template('calendar.html')


if __name__ == "__main__":
    app.run(debug=True)
