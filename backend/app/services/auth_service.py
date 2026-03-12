from app.models import db
from app.models.user import User
from app.utils.security import hash_password

def register_user(email, password, role, franchise_id=None, username=None):
    user = User(
        email=email,
        username=username,
        password_hash=hash_password(password),
        role=role,
        franchise_id=franchise_id,
        is_active=True
    )
    db.session.add(user)
    db.session.commit()
    return user
