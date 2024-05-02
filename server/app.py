from flask import request, session, Flask, jsonify
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

      assignments = request.get_json().get('assignments')
      teammates = request.get_json().get('teammates')
      for assignment in assignments:
        teammate = Teammate.query.filter(
          Teammate.name == teammates[
            assignments.index(assignment)]).first() #obtain the teammate corresponding to the assignment index
        new_assignment = Assignment(
          role = assignment,
          teammate = teammate,
          project = new_project
        ) 
        db.session.add(new_assignment)
        db.session.commit()
      return new_project.to_dict(), 201
    
      # the following should probably be used if we want to create a new teammate
      #   teammate = Teammate(
      #     name = request.get_json().get('teammate'),
      #   )
      #   db.session.add(teammate)
      #   db.session.commit()
    except:
      return {'error':'invalid post'}, 422
    
class ShowProject(Resource):
  
  def get(self, id):
    try:
      project = Project.query.filter(Project.id == id).first()
      return project.to_dict(), 200
    except ValueError as err:
      return {'error message':f'{err}'}
  
  def patch(self, id):
    
    project = Project.query.filter(Project.id == id).first()

    if not project:
      return {'error':'project not found'},404
    
    data_to_update = request.get_json()
    # breakpoint()
    for attr in data_to_update:
      # breakpoint()
      
      if attr == 'teammates':
        # attr = data_to_update[attr]
        # breakpoint()
        # for i,teammate in enumerate(attr):
        #   project.teammates[i] = Teammate.query.filter(
        #     Teammate.name == teammate).first()
        #   breakpoint()
        teammates_proxy = project.teammates
        for i, teammate_name in enumerate(data_to_update[attr]):
          teammate = Teammate.query.filter(
            Teammate.name == teammate_name).first()
          project.teammates[i]= teammate
        # teammates = []
        # for teammate_name in data_to_update[attr]:
        #   teammate = Teammate.query.filter(
        #     Teammate.name == teammate_name).first()
        #   if teammate:
        #     teammates.append(teammate)
        # setattr(project, attr, teammates)

      elif attr == 'assignments':
        assignment_data = request.get_json()[attr]
        for i, assignment_role in enumerate(assignment_data):
          project.assignments[i].role = assignment_role
          # breakpoint()
        
      else:
        setattr(project, attr, data_to_update[attr])
      
      # breakpoint()
    db.session.commit()
    # breakpoint()
    return project.to_dict(), 200
    
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
    # assignment = request.get_json().get('role')
    # new_teammate.assignments = assignment 
    return new_teammate.to_dict(), 201
  
class ShowTeammate(Resource):

  def get(self, id):
    teammate = Teammate.query.filter(Teammate.id == id).first()
    return teammate.to_dict(), 200
  
  def delete(self, id):
    db.session.delete(Teammate.query.filter(Teammate.id == id).first())
    db.session.commit()
    return {'message': 'No content'}, 204
  
  def patch(self, id):
    teammate = Teammate.query.filter(Teammate.id == id).first()
    teammate.name = request.get_json().get('name')
    db.session.commit()
    return teammate.to_dict(), 200

class AssignmentIndex(Resource):
  
  def get(self):
    assignments = Assignment.query.all()
    return [assignment.to_dict() for assignment in assignments], 200

  def post(self):
    new_assignment= Assignment(role = request.get_json().get('role'))
    db.session.add(new_assignment)
    db.session.commit()
    project = request.get_json().get('project')
    teammate = request.get_json().get('teammate')
    new_assignment.project = Project.query.filter(Project.name==project)
    new_assignment.teammate = Teammate.query.filter(Teammate.name == teammate)

    return new_assignment.to_dict(), 201

  
api.add_resource(ProjectIndex, '/projects')
api.add_resource(ShowProject, '/projects/<int:id>', endpoint = "ShowProject")
api.add_resource(TeammatesIndex, '/teammates')
api.add_resource(ShowTeammate, '/teammates/<int:id>')
api.add_resource(AssignmentIndex, '/assignments')




  

if __name__ == "__main__":
  app.run(port=5555, debug=True)
