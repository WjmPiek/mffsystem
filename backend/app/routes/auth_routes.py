from flask import Blueprint

auth_bp = Blueprint('auth', __name__)

@auth_bp.get('/login')
def login_info():
    return {'message': 'auth route ready'}
