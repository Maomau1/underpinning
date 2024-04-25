from config import app, db
from models import Project

if __name__ == "__main__":
  with app.app_context():
    
    print ("Deleting all records...")
    Project.query.delete()
    
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

    projects = [p1,p2]

    db.session.add_all(projects)

    db.session.commit()

    print("seeding complete")

    # remove pass and write your seed data


