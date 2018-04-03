from flask import Flask

app = Flask(__name__)
app.jinja_env.auto_reload = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['TEMPLATES_AUTO_RELOAD'] = True

import mlc.views
import mlc.models

