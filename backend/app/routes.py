from flask import Blueprint, jsonify, request
from .extensions import db
from .models import User

api = Blueprint("api", __name__)

@api.get("/users")
def get_users():
    users = User.query.order_by(User.id.desc()).all()
    return jsonify([u.to_dict() for u in users]), 200

@api.post("/users")
def create_user():
    data = request.get_json() or {}

    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"error": "name and email are required"}), 400

    existing = User.query.filter_by(email=email).first()
    if existing:
        return jsonify({"error": "email already exists"}), 409

    user = User(name=name, email=email)
    db.session.add(user)
    db.session.commit()

    return jsonify(user.to_dict()), 201