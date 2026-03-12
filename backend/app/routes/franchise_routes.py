from flask import Blueprint, request, jsonify
from app.services.franchise_service import create_franchise
from app.services.auth_service import register_user

franchise_bp = Blueprint('franchise', __name__)

@franchise_bp.post('/register')
def register_franchise():
    data = request.get_json()

    franchise = create_franchise(
        franchise_name=data['franchise_name'],
        ta_name=data.get('ta_name'),
        owner_name=data.get('owner_name'),
        email=data.get('email'),
        phone=data.get('phone'),
        office_address=data.get('office_address')
    )

    user = register_user(
        email=data['email'],
        password=data['password'],
        role='franchisee',
        franchise_id=franchise.id
    )

    return jsonify({
        'message': 'Franchise registered successfully',
        'franchise_id': franchise.id,
        'franchise_code': franchise.franchise_code,
        'user_id': user.id
    }), 201
