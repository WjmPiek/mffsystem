from app.models import db
from app.models.franchise import Franchise
from app.utils.code_generator import generate_franchise_code

def create_franchise(franchise_name, ta_name, owner_name, email, phone, office_address):
    count = Franchise.query.count() + 1
    code = generate_franchise_code(franchise_name, count)

    franchise = Franchise(
        franchise_name=franchise_name,
        ta_name=ta_name,
        franchise_code=code,
        owner_name=owner_name,
        email=email,
        phone=phone,
        office_address=office_address
    )
    db.session.add(franchise)
    db.session.commit()
    return franchise
