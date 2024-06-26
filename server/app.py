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
      
      if attr == 'teammates' or attr=='assignments':
        update_teammates=[]
        for i, teammate_name in enumerate(data_to_update.get('teammates')):
          if i<len(project.teammates):
            teammate = Teammate.query.filter(
              Teammate.name == teammate_name).first()
            update_teammates.append({"index":i, "teammate":teammate})
            # project.teammates[i]= teammate
            # breakpoint()
        
        assignment_data = request.get_json().get('assignments')
        for i, assignment_role in enumerate(assignment_data):
          if i<len(project.assignments):
            assignment = project.assignments[i]
          # if assignment:
            # breakpoint()
            assignment.role = assignment_role
            # breakpoint()
            assignment.teammate = update_teammates[i]['teammate']
            assignment.project = project
          else:
            # breakpoint()
            assignment = Assignment(
              role = assignment_role,
              project = project,
              teammate = Teammate.query.filter(
              Teammate.name == teammate_name).first()
            )
            db.session.add(assignment)
          
        
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
    try:
      
      project = request.get_json().get('project')
      teammate = request.get_json().get('teammate')
      # breakpoint()
      new_assignment_project = Project.query.filter(Project.name == project).first()
      new_assignment_teammate = Teammate.query.filter(Teammate.name == teammate).first()
      new_assignment= Assignment(
        role = request.get_json().get('role'),
        project = new_assignment_project,
        teammate = new_assignment_teammate
        )
      # breakpoint()  
      db.session.add(new_assignment)
      db.session.commit()
      
      return new_assignment.to_dict(), 201
    except AttributeError as err:
      return {'message':f'error:{err}'},422

  
api.add_resource(ProjectIndex, '/projects')
api.add_resource(ShowProject, '/projects/<int:id>', endpoint = "ShowProject")
api.add_resource(TeammatesIndex, '/teammates')
api.add_resource(ShowTeammate, '/teammates/<int:id>')
api.add_resource(AssignmentIndex, '/assignments')




  

if __name__ == "__main__":
  app.run(port=5555, debug=True)



     # attr = data_to_update[attr]
        # breakpoint()
        # for i,teammate in enumerate(attr):
        #   project.teammates[i] = Teammate.query.filter(
        #     Teammate.name == teammate).first()
        #   breakpoint()

  # teammates = []
        # for teammate_name in data_to_update[attr]:
        #   teammate = Teammate.query.filter(
        #     Teammate.name == teammate_name).first()
        #   if teammate:
        #     teammates.append(teammate)
        # setattr(project, attr, teammates)