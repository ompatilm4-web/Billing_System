from werkzeug.security import check_password_hash
from functools import wraps
from flask import session, redirect
import os

OWNER_EMAIL         = os.getenv("OWNER_EMAIL")
OWNER_PASSWORD_HASH = os.getenv("OWNER_PASSWORD_HASH")


def verify_owner(email: str, password: str) -> bool:
    """Returns True only if email + password match the owner credentials."""
    if email != OWNER_EMAIL:
        return False
    return check_password_hash(OWNER_PASSWORD_HASH, password)


def login_required(f):
    """Decorator — redirects to /login if the owner is not logged in."""
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get("logged_in"):
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated