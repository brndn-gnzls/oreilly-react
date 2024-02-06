from flask import Flask, jsonify, request
import psycopg2
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
class EventRegistration(db.Model): # dn.Model is a base class for all models in Flask-SQLA
    __tablename__ = 'attendees'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), unique=True, nullable=False)
    last_name = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(100), unique=True, nullable=False)
    job_title = db.Column(db.String(100), unique=True, nullable=False)
    company_name = db.Column(db.String(100), unique=True, nullable=False)
    company_size = db.Column(db.String(50), unique=True, nullable=False)
    subject = db.Column(db.String(250), nullable=False)

    def format(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'job_title':self.job_title,
            'company_name': self.company_name,
            'company_size': self.company_size,
            'subject': self.subject
        }

# Venue Model
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
# Events Registation routes
#
@app.route("/api/v1/events-registration", methods=['POST'])
def add_attendess():
    if request.method == 'POST':
        first_name = request.get_json().get('first_name')
        last_name = request.get_json().get('last_name')
        email = request.get_json().get('email')
        phone = request.get_json().get('phone')
        job_title = request.get_json().get('job_title')
        company_name = request.get_json().get('company_name')
        company_size = request.get_json().get('company_size')
        subject = request.get_json().get('subject')

        if first_name and last_name and email and phone and subject:
            all_attendees = EventRegistration.query.filter_by(email=email).first()
            if all_attendees:
                return jsonify(message="Email address already in use"), 409
            else:
                new_attendee = EventRegistration(
                    first_name = first_name,
                    last_name = last_name,
                    email = email,
                    phone = phone,
                    job_title = job_title,
                    company_name = company_name,
                    company_size = company_size,
                    subject = subject
                )
                db.session.add(new_attendee)
                db.session.commit()
                return jsonify({
                    'success': True,
                    'new_attendee': new_attendee.format()
                }), 201
        else:
            return jsonify({
                'error': 'Invalid input'
            }), 400
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