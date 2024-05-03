from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    
    serialize_rules = ('-assignments.project',
                       '-assignments.project_id',
                       '-assignments.teammate_id',
                       'teammates',
                       '-teammates.assignments',
                       '-teammates.projects',
                    #    'teammate_names'
                       )
    



    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(
        db.String, unique=True, nullable=False,
        # traint('length(name)<25 && length(namedb.CheckCons)>5')
    )
    description = db.Column(
        db.String, nullable=False,
        # db.CheckConstraint('length(description)>20 && length(description)<250')
    )
    location = db.Column(
        db.String, nullable=False,
        # db.CheckConstraint('length(location)>2 && length(location)<20')
    )

    assignments = db.relationship("Assignment", back_populates = 'project', cascade= 'all, delete-orphan')
    teammates = association_proxy("assignments", "teammate") #,creator = lambda name: Assignment(name = name))
    # teammates = db.relationship("Teammate", secondary = "assignment", back_populates = "projects")
    def teammate_names(self):
        return [teammate.name for teammate in self.teammates] 

class Teammate(db.Model, SerializerMixin):
    __tablename__ = 'teammates'

    serialize_rules = (
        '-assignments.teammate',
        '-assignments.teammate_id',
        '-assignments.project_id',
        '-assignments.project.description',
        '-assignments.project.location',
        '-assignments.project.teammates'
        )

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)

    assignments = db.relationship("Assignment", back_populates = 'teammate', cascade= 'all, delete-orphan')
    projects = association_proxy("assignments", 'project')

    

class Assignment(db.Model, SerializerMixin):
    __tablename__ = 'assignments'

    serialize_rules = (
        '-teammate.assignments',
        '-project.assignments',
        # '-teammate_id',
        # '-project_id',
        )

    id = db.Column(db.Integer, primary_key = True)
    role = db.Column( db.String)
    teammate_id = db.Column(db.Integer, db.ForeignKey('teammates.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    project = db.relationship("Project", back_populates = 'assignments')
    teammate = db.relationship("Teammate", back_populates = 'assignments')

    
    


