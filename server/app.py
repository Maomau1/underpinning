from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import Project, Teammate, Assignment


class ProjectIndex(Resource):

  def get(self):
    projects = [ project.to_dict() for project in Project.query.all()]
    return projects, 200
  
  def post(self):
    try:
      new_project = Project(
        name = request.get_json().get('name'),
        description = request.get_json().get('description'),
        location = request.get_json().get('location')
      )
      # add assignment input
      db.session.add(new_project)
      db.session.commit()

      teammate = Teammate.query.filter(
        Teammate.name == request.get_json().get('teammate')).first()
      # the following should probably be used if we want to create a new teammate
      # teammate = Teammate(
      #   name = request.get_json().get('teammate'),
      # )
      # db.session.add(teammate)
      # db.session.commit()

      new_assignment = Assignment(
        role = request.get_json().get('role'),
        teammate = teammate,
        project = new_project
      ) 
      db.session.add(new_assignment)
      db.session.commit()
      return new_project.to_dict(), 201

    except:
      return {'error':'invalid entry'}, 422
    
class ShowProject(Resource):
  
  def get(self, id):
    project = Project.query.filter(Project.id == id).first()
    return project.to_dict(), 200
  
  def patch(self, id):
    try:
      project = Project.query.filter(Project.id == id).first()
      for attr in request.get_json():
        setattr(project, attr, request.get_json()[f'{attr}'])
      db.session.add(project)
      db.session.commit()
      return project.to_dict(), 201
    except:
      return {'error':'invalid entry'}, 422

  def delete(self, id):
    project = Project.query.filter(Project.id == id).first()
    db.session.delete(project)
    db.session.commit()
    return {'message':'deletion successful'}, 204
  
class TeammatesIndex(Resource):
  
  def get(self):
    teammates = Teammate.query.all()
    return [teammate.to_dict() for teammate in teammates],200
  
  def post(self):
    new_teammate = Teammate(
      name = request.get_json().get('name'),
    )
    db.session.add(new_teammate)
    db.session.commit()
    assignment = request.get_json().get('role')
    new_teammate.assignments = assignment 
    return new_teammate.to_dict(), 201
  
class ShowTeammate(Resource):

  def get(self, id):
    teammate = Teammate.query.filter(Teammate.id == id).first()
    return teammate.to_dict(), 200
  
  # def patch(self, id):

  
api.add_resource(ProjectIndex, '/projects')
api.add_resource(ShowProject, '/projects/<int:id>')
api.add_resource(TeammatesIndex, '/teammates')
api.add_resource(ShowTeammate, '/teammates/<int:id>')




  





if __name__ == "__main__":
  app.run(port=5555, debug=True)
