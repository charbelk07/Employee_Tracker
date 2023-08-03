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
    ("Sales Managaer", 100000, 1),
    ("Sales Associate", 65000, 1),
    ("Service Manager", 80000, 2),
    ("Sercive Manager Associate", 55000, 2),
    ("Emploment Manager", 45000, 3),
    ("Recruiter", 48000, 3),
    ("Bookkeeping 45000", 4 ),
    ("Chief Financial Officer 45000", 4 );

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES
    ("George" , "Smith", 3),
    ("Jhonathan", "Peralta", 4),
    ("Carl", "Ashford", 8),
    ("Arthur", "Goldman", 7),
    ("Justin", "Craig" , 5);