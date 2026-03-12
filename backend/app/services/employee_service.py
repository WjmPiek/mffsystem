from app.models import db
from app.models.employee import Employee
from app.utils.security import hash_password
from datetime import datetime

def create_employee(data):
    raw_date = data.get('date_employed')
    parsed_date = None

    if raw_date:
        try:
            parsed_date = datetime.strptime(raw_date, '%Y-%m-%d').date()
        except ValueError:
            parsed_date = None

    employee = Employee(
        franchise_id=data['franchise_id'],
        employee_type=data['employee_type'],
        security_role=data['security_role'],
        title=data.get('title'),
        full_name=data['full_name'],
        id_number=data.get('id_number'),
        email=data.get('email'),
        phone=data.get('phone'),
        login_username=data.get('login_username'),
        login_password_hash=hash_password(data['login_password']) if data.get('login_password') else None,
        date_employed=parsed_date,
        branch=data.get('branch'),
        vendors_id=data.get('vendors_id'),
        pin_code=data.get('pin_code'),
        status=data.get('status', 'Active'),
        notes=data.get('notes')
    )

    db.session.add(employee)
    db.session.commit()
    return employee
