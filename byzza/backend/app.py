from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

# __name__ references the current module name.
# Needed for path discovery.
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://app:terminal@localhost:5432/byzza"

# Disable sqlalchemy operation nofication settings.
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

class Venue(db.Model):
    __tablename__ = 'venues'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    
    def format(self):
        return {
            'id': self.id,
            'name': self.name
        }

# Dectorator can odify the index() view function 
# to return a value in the form of an HTTP reseponse.
@app.route("/")
def index():
    return "Welcome to Byzza REST API Server"

# Using jsonify to convert Python data structures
# into JSON format.
@app.route("/api/v1/venues")
def venues():
    return jsonify({"id":1, "name":"Auditorium A"}), 404

@app.route("/api/v1/venues", methods=['POST'])
def add_venues(): # Invoked on POST request.

    if request.method == 'POST':
        name = request.get_json().get('name')
        all_venues = Venue.query.filter_by(name=name).first()
    if all_venues:
        return jsonify(message="Venue name already exist!"), 409
    else:
        venue = Venue(name=name)
        db.session.add(venue)
        db.session.commit()
        return jsonify({
            'success': True,
            'venues': venue.format()
        }), 201


# Query parameter example.
# The request is used to allow a client to send data
# to the server and other endpoints request operations.
@app.route("/api/v1/speakers")
def speakers():
    # request.args to extract key-value pairs in the URL.
    firstname = request.args.get("firstname")
    lastname = request.args.get("lastname")

    if firstname is not None and lastname is not None:
        return jsonify (message=f"The speaker's fullname is {firstname} {lastname}.")
    else:
        return jsonify(message="No query parameters in the url")

speaker_data = None
@app.route("/api/v1/speakers/<int:speaker_id>")
def get_speaker(speaker_id):
    # Use speaker ID to fethc the appropriate speak data
    # ...
    # Return the speakder data as a JSON response
    return jsonify(speaker_data)

# app.py is the main program.
if __name__ == "__main__":
    app.run()