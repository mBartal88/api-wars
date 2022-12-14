from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash


def generate_hash(password):
    return generate_password_hash(password)


def check_password(hashed, password):
    return check_password_hash(hashed, password)
