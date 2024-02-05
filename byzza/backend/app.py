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

#
# Venue routes
#

# Post entry.
@app.route("/api/v1/venues", methods=['POST'])
def add_venues(): # Invoked on POST request.

    if request.method == 'POST':
        name = request.get_json().get('name')
        all_venues = Venue.query.filter_by(name=name).first()

        if all_venues:
            # 409 - content conflict.
            return jsonify(message="Venue name already exist!"), 409
        else:
            venue = Venue(name=name)
            db.session.add(venue)
            db.session.commit()
            return jsonify({
                'success': True,
                'venues': venue.format()
            }), 201

# Get all entries.
@app.route("/api/v1/venues", methods=['GET'])
def retrieve_venues():
    if request.method == 'GET':
        all_venues = Venue.query.all() # SQLA query.
        
        if all_venues:
            return jsonify({
                'success': True,
                'venues': [venue.format() for venue in all_venues]
            }), 200

        return jsonify(message="No venue record found"), 404
        
# Get single entry.
@app.route("/api/v1/venues/<int:id>", methods=['GET'])
def retrieve_venue(id):
    if request.method == 'GET':
        venue = Venue.query.filter(Venue.id == id).first() # Retrieves first record.

        if venue:
            return jsonify({
                'success': True,
                'venue': venue.format()
            }), 200

        return jsonify(message="Record id not found"), 404

# Update entry.
@app.route("/api/v1/venues/<int:id>", methods=['PUT'])
def update_venue(id):
    if request.method == 'PUT':
        name = request.get_json().get('name')
        venue = Venue.query.get(id)

        if not venue:
            return jsonify(message='Venue record not found'), 404

        venue.name = name
        db.session.commit()

    return jsonify({
        'success': True,
        'updated venue': venue.format()
    }), 200

# Delete an entry.
@app.route("/api/v1/venues/<int:id>", methods=['DELETE'])
def remove_venue(id):
    venue = Venue.query.filter_by(id=id).first() # Check for existence of the record id.

    if venue:
        db.session.delete(venue)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': '[+] You deleted a venue',
            'deleted': venue.format()
        }), 202
    else:
        return jsonify(message="That venue does not exist"), 404



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