from flask import Blueprint, jsonify, request

from .extensions import db
from .models import User

api = Blueprint("api", __name__)


@api.get("/health")
def health_check():
    return jsonify({"status": "ok"}), 200


@api.post("/auth/login")
def login():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400

    user = User.query.filter(db.func.lower(User.email) == email).first()

    if not user or not user.is_active or not user.check_password(password):
        return jsonify({"error": "Incorrect email or password."}), 401

    return jsonify({"user": user.to_dict()}), 200


@api.get("/users")
def get_users():
    users = User.query.order_by(User.id.desc()).all()
    return jsonify([user.to_dict() for user in users]), 200


@api.post("/users")
def create_user():
    data = request.get_json() or {}

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    role = (data.get("role") or "user").strip().lower()
    is_active = bool(data.get("is_active", True))

    if not name or not email or not password:
        return jsonify({"error": "name, email, and password are required"}), 400

    existing_user = User.query.filter(db.func.lower(User.email) == email).first()
    if existing_user:
        return jsonify({"error": "email already exists"}), 409

    user = User(name=name, email=email, role=role, is_active=is_active)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify(user.to_dict()), 201


@api.delete("/users/<int:user_id>")
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "user not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "user deleted"}), 200
