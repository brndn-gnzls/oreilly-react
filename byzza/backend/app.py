from asyncio import Event
import http
from flask import Flask, abort, jsonify, request
import psycopg2
# from models import Speaker
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime
from werkzeug.utils import secure_filename

# __name__ references the current module name.
# Needed for path discovery.
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://app:terminal@localhost:5432/byzza"

# Disable sqlalchemy operation nofication settings.
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

from datetime import datetime

class Speaker(db.Model):
    __tablename__ = 'speakers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.String(200), nullable=False)
    speaker_avatar = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Built-in to create a string representation of an object.
    def __repr__(self):
        return f'<Speaker {self.name}>'

    # Convert the Speaker object into a dictionary format that can
    # easily be converted into JSON.
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'company': self.company,
            'position': self.position,
            'bio': self.bio,
            'speaker_avatar': self.speaker_avatar,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }


# Event Registration Model
@app.route('/api/v1/speakers', methods=['GET'])
def get_speakers():
    speakers = Speaker.query.all()
    if not speakers:
        return jsonify({"error": "No speakers found"}), 404
    return jsonify([speaker.serialize() for speaker in
        speakers]), 200

@app.route('/api/v1/speakers/<int:speaker_id>', methods=['GET'])
def get_speaker(speaker_id):
    speaker = Speaker.query.get(speaker_id)

    if not speaker:
        return jsonify({
            "error": "[-] Speaker not found."
        }),404
    
    return jsonify(speaker.serialize()),200
    

@app.route('/api/v1/speakers', methods=['POST'])
def add_speaker():
    # Retrieve data fromthe request.
    data = request.get_json()

    # Extract speaker details.
    name = data.get('name')
    email = data.get('email')
    company = data.get('company')
    position = data.get('position')
    bio = data.get('bio')
    avatar = request.files.get('speaker_avatar')

    # Check for allowed file extensions (jpg, png, etc.)
    if avatar and allowed_file(avatar.filename):
        filename = avatar.filename
        avatar.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    else:
        filename = 'default-avatar.gif'

    # Check required fields.
    if not name or not email or not company or not position or not bio:
        return jsonify({
            "error" : "All fields are required"
        }), 400

    # Check if the email is already in use.
    existing_speaker = Speaker.query.filter_by(email=email).first()
    if existing_speaker:
        return jsonify({"error":"Speaker with that email alread exists"}), 409

    # Speaker is new.
    speaker = Speaker(name=name, email=email, company=company, position=position, bio=bio, speaker_avatar=avatar)

    db.session.add(speaker)
    db.session.commit()

    return jsonify(speaker.serialize()), 201

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/api/v1/speakers/<int:speaker_id>', methods=['PUT'])
def update_speaker(speaker_id):
    data = request.get_json()
    speaker = Speaker.query.get(speaker_id)

    if not speaker:
        return jsonify({
            "error": "[-] Speaker not found."
        }),404
    
    # Required fields
    name = data.get('name')
    email = data.get('email')
    company = data.get('company')
    position = data.get('position')
    bio = data.get('bio')

    # Validate required fields are provided
    if not all([name, email, company, position, bio]):
        return jsonify({"error": "All fields except avatar are required"}), 400

    # Check if the email is already in use by another speaker
    if speaker.email != data.get('email') and Speaker.query.filter_by(email=data.get('email')).first():
        return jsonify({"error": "Speaker with that email already exists"}), 409

    speaker.name = data.get('name', speaker.name)
    speaker.email = data.get('email', speaker.email)
    speaker.company = data.get('company', speaker.company)
    speaker.position = data.get('position', speaker.position)
    speaker.bio = data.get('bio', speaker.bio)
    speaker.speaker_avatar = data.get('speaker_avatar', speaker.speaker_avatar)

    db.session.commit()

    return jsonify(speaker.serialize()), 200

@app.route('/api/v1/speakers/<int:speaker_id>', methods=['DELETE'])
def delete_speaker(speaker_id):
    speaker = Speaker.query.get(speaker_id)

    # if not current_user.has_permission("delete_speaker"):
    #     abort(http.Forbidden("You do not have permission to delete this speaker"))

    # events = Event.query.filter_by(speaker_id=speaker_id).all()

    # if events:
    #     abort(http.Conflict("this speaker has associated events, please dlete them first"))

    db.session.delete(speaker)
    db.session.commit()

    return jsonify({
        "message": "Speaker deleted successfully"
    }), 200

# app.py is the main program.
if __name__ == "__main__":
    app.run()