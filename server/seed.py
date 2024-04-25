from config import app, db
from models import Project, Teammate, Assignment

if __name__ == "__main__":
  with app.app_context():
    
    print ("Deleting all records...")
    Project.query.delete()
    Teammate.query.delete()
    Assignment.query.delete()
    
    # Projects
    p1 = Project(
      name = '270 park',
      description = 'install 400 micropiles in the basement of a new york city basement.',
      location = "New York, NY",
    )
    p2 = Project(
      name = "Pulaski Skyway",
      location = "New Jersey, NJ",
      description = "install 200 micropiles to support the existing bridge while the bearings are being replace. 100 load test are to be completed."
    )

    db.session.add_all([p1, p2])

    # Teammates
    t1 = Teammate(
      name = "Maurice"
    )
    t2 = Teammate(
      name = 'Ana'
    )
    t3 = Teammate(
      name = 'Mickey'
    )
    
    db.session.add_all([t1, t2, t3])

    # Assignments
    a1 = Assignment(
      role = 'lead estimator',
      teammate = t3,
      project = p2,
    )
    a2 = Assignment(
      role = 'project engineer',
      teammate = t1,
      project = p2 
    )
    a3 = Assignment(
      role = 'field engineer',
      teammate = t2,
      project = p2 
    )
    a4 = Assignment(
      role = 'field engineer',
      teammate = t2,
      project = p1,
    )
    a5 = Assignment(
      role = 'project engineer',
      teammate = t1,
      project = p1 
    )
    a6 = Assignment(
      role = 'field engineer',
      teammate = t1,
      project = p1 
    )
    db.session.add_all([a1,a2,a3,a4,a5,a6])
    db.session.commit()

    print("seeding complete")

    # remove pass and write your seed data


