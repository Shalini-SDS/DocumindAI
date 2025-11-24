#!/usr/bin/env python
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from app import app, db

def init_database():
    with app.app_context():
        db.create_all()
        print("[OK] Database tables created successfully!")
        
        from app import User
        existing_users = User.query.count()
        if existing_users == 0:
            test_user = User(email="admin@example.com", username="admin", role="admin")
            test_user.set_password("admin123")
            db.session.add(test_user)
            db.session.commit()
            print("[OK] Test admin user created: admin@example.com / admin123")
        else:
            print("[INFO] Database already contains users")

if __name__ == '__main__':
    init_database()
