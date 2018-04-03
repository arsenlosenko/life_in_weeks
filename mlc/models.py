from flask_sqlalchemy import SQLAlchemy
from mlc import app

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User email=%r age=%r>' % (self.email, self.age)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(120), nullable=False)
    text = db.Column(db.Text, nullable=False)
    week_num = db.Column(db.Integer, nullable=False)
    year_num = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Task name=%r user_id=%r>' % (self.name, self.user_id)

