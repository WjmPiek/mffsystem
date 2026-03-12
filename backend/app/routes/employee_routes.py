from flask import Blueprint, request, jsonify
from app.services.employee_service import create_employee

employee_bp = Blueprint('employee', __name__)

@employee_bp.post('/')
def add_employee():
    data = request.get_json()

    employee = create_employee(data)

    return jsonify({
        'message': 'Employee added successfully',
        'employee_id': employee.id,
        'full_name': employee.full_name,
        'security_role': employee.security_role,
        'status': employee.status
    }), 201
