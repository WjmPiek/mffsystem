import os
from flask import Flask
from .models import db
from .routes.auth_routes import auth_bp
from .routes.employee_routes import employee_bp
from .routes.franchise_routes import franchise_bp

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "change-me")

    db.init_app(app)

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(employee_bp, url_prefix="/api/employees")
    app.register_blueprint(franchise_bp, url_prefix="/api/franchises")

    @app.get("/")
    def home():
        return {"message": "Martinsdirect backend running"}

    return app