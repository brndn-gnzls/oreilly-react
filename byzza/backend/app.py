from flask import Flask, jsonify, request
import psycopg2
from models import Speaker
from flask_sqlalchemy import SQLAlchemy

# __name__ references the current module name.
# Needed for path discovery.
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://app:terminal@localhost:5432/byzza"

# Disable sqlalchemy operation nofication settings.
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# 
#  MODELS
# 

# Event Registration Model
@app.route('/api/v1/speakers', methods=['GET'])
def get_speakers():
    speakers = Speaker.query.all()
    if not speakers:
        return jsonify({"error": "No speakers found"}), 404
    return jsonify([speaker.serialize() for speaker in
        speakers]), 200

# app.py is the main program.
if __name__ == "__main__":
    app.run()