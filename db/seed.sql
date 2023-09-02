USE employees_db;

INSERT INTO department
    (name)
VALUES
    ("Sales"),
    ("Service"),
    ("HR"),
    ("Accounting");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales Manager", 100000, 1),
    ("Sales Associate", 65000, 1),
    ("Service Manager", 80000, 2),
    ("Sercive Manager Associate", 55000, 2),
    ("Emploment Manager", 45000, 3),
    ("Recruiter", 48000, 3),
    ("Bookkeeping", 45000, 4 ),
    ("Chief Financial Officer", 45000, 4 );

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("George" , "Smith", 3, null),
    ("Jhonathan", "Peralta", 4, 1),
    ("Carl", "Ashford", 8, null),
    ("Arthur", "Goldman", 7, null),
    ("Justin", "Craig" , 5, 3);