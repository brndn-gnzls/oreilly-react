from asyncio import Event
import http
from flask import Flask, abort, jsonify, request, redirect, session, jsonify
from flask_bcrypt import bcrypt, Bcrypt
import psycopg2
from flask_sqlalchemy import SQLAlchemy, pagination
import os
from datetime import datetime
from flask_cors import CORS
from datetime import timedelta
# __name__ references the current module name.
# Needed for path discovery.
app = Flask(__name__)
bcrypt = Bcrypt(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://app:terminal@localhost:5432/byzza"
app.secret_key = 'secret_key'


# Disable sqlalchemy operation nofication settings.
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
CORS(app, supports_credentials=True, origins='http://localhost:3000')

app.config.update(
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_SAMESITE='None',
    REMEMBER_COOKIE_DURATION=timedelta(days=1)
)

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


#
# User model
#
class User(db.Model):

    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    roles = db.Column(db.String(100))
    is_active = db.Column(db.Boolean, default=True)
    is_superuser = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow())

    def __repr__(self):

        return '<User %r>' % self.username


#
# login route JWT
#
# @app.route('/api/v1/login', methods=['POST'])
# def login():
#     email = request.json.get('email', None)
#     password = request.json.get('password', None)

#     if email is None or password is None:
#         return jsonify({
#             'message': '[!] Missing email or password...'
#         }), 400

#     user = User.query.filter_by(email=email).first()

#     if user is None or not bcrypt.check_password_hash(user.password, password):
#         return jsonify({
#             'message' : '[!] Invalid email or password...'
#         }), 401

#     access_token = create_access_token(identity=user.user_id)
#     return jsonify({
#         'access_token': access_token
#     }), 200

# @app.route('/api/v1/dashboard', methods=['GET'])
# @jwt_required()
# def dashboard():
#     current_user = get_jwt_identity()
#     user = User.query.filter_by(user_id=current_user).first()

#     if not user:
#         return jsonify({
#             'message': 'User not found'
#         }), 404

#     return jsonify({
#         'email': user.email
#     }), 200
    
#
# end login route
#

# @app.route('/api/v1/speakers', methods=['GET'])
# def get_speakers():
#     speakers = Speaker.query.all()
#     if not speakers:
#         return jsonify({"error": "No speakers found"}), 404
#     return jsonify([speaker.serialize() for speaker in
#         speakers]), 200

@app.route('/api/v1/login', methods=["POST"])
def test_login():
    session['test'] = 'Session is working'
    return jsonify({'message':'logged in'})

@app.route('/api/v1/dashboard', methods=['GET'])
def test_session():
    test_value = session.get('test', 'No session found')
    return jsonify({'test_value': test_value})


# @app.route('/api/v1/login', methods=['POST'])
# def login():
#     email = request.json.get('email')
#     password = request.json.get('password')

#     if not email or not password:
#         return jsonify({
#             'message': '[!] Missing email or password...'
#         }), 400

#     user = User.query.filter_by(email=email).first()
#     if user and bcrypt.check_password_hash(user.password, password):
#         session['user_id'] = user.user_id
#         print(session)
#         return jsonify({
#             'message': 'Login Successful'
#         }), 200
#     else:
#         return jsonify({
#             'message': '[!] Invalid email password...'
#         }), 401

# @app.route('/api/v1/dashboard', methods=['GET'])
# def dashboard():
#     user_id = session.get('user_id')
#     print(session)
  
#     if not user_id:
#         return jsonify({
#             'message': '[-] User not authenticated.'
#         }), 401

#     user = User.query.filter_by(user_id=user_id).first()
#     if not user:
#         return jsonify({
#             'message': '[-] User not found.'
#         }),404

#     return jsonify({
#         'email': user.email
#     }), 200

# # Do logout
# @app.route('/api/v1/logout', methods=['POST'])
# def logout():
#     session.pop('user_id', None)
#     return jsonify({
#         'message' : 'Loggedout successfully'
#     }), 200

# @app.route('/api/v1/speakers', methods=['GET'])
# def get_speakers():
#     page = request.args.get('page', 1, type=int)

#     speakers = Speaker.query.paginate(page=page, per_page=5, error_out=False)

#     if not speakers.items:
#         return jsonify({"error":"[-] No speakers found."}), 404

#     return jsonify({
#         'speakers': [speaker.serialize() for speaker in speakers.items],
#         'total_pages': speakers.pages,
#         'total_items': speakers.total
#     }), 200


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
    app.run(ssl_context=('/Users/AE06909/certs/cert.pem', '/Users/AE06909/certs/key.pem'))