from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    location = db.Column(db.String)

    assignments = db.relationship("Assignment", back_populates = 'project', cascade= 'all, delete-orphan')
    teammates = association_proxy("assignments", "teammate")
    # projects = db.relationship("Project", secondary = "assignment", back_populates = "teammates")

class Teammate(db.Model, SerializerMixin):
    __tablename__ = 'teammates'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)

    assignments = db.relationship("Assignment", back_populates = 'teammate')
    projects = association_proxy("assignments", 'teammate')

class Assignment(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key = True)
    role = db.Column( db.String)
    teammate_id = db.Column(db.Integer, db.ForeignKey('teammates.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    project = db.relationship("Project", back_populates = 'assignments')
    teammate = db.relationship("Teammate", back_populates = 'assignments')
    


