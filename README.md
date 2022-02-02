# Medical Consultation System

This project is part of my Software Engineering course's final project in my 3rd year. This is a website that enables patients to have a consultation with doctors remotely. The patient can choose a doctor to have a consultation by name and specialization and get the medical record that involves advisement or treatment from the doctor that has consulted with because some of the cases can be treated without going to the hospital. In the time of the Covid 19 situation, the hospital has become one of the most dangerous places. This website will be suitable for "New Normal" because it prevents oneself from having close contact with others.

## Created by

    Kittipol Neamprasertpon
    Chayaphon Bunyakan
    Pirada Amornprapawat

## Functionality

1. There are 3 user type, patient, doctor and staff. All registered user can login to the system and unregistered user can register as patient.
2. The patient can select and search for the doctor that they want to consult with and be able to search by type of doctor specialization and by name.
3. After the patient has selected the doctor to consult. They can request a video consultation to that doctor.
4. During the consultation, the doctor can view their patient’s recent medical records and use them for diagnosis. Medical record is a document that explains all details about the patient's history.
5. After the consultation, patient will get the medical record that involve advisement or treatment from the doctor that have consult with.
6. The doctor can view, edit and delete past medical records for only the patient that they have consulted with.
7. All registered user can view and edit their profile.
8. Staff role is to manage the doctor in the system.

## Technology

1. React and TailwindCSS are use to build the client Frontend of the website.
2. Node.js and Express are use for the backend server and RESTful API
3. Socket.io is use to implement an Online/Offline feature for doctor. Doctor that have login to the system and doesn't have a consultation at the moment will be consider as Online (available for patient). Doctor that have sign out, close the brower tab or in a current consultation will be consider as offline (not available for patient). These features are implement by socket.io room that use to manage the room for consultation.
   Their are 2 main socket.io room :

   1. General doctor room (Doctors that are in this room mean that the doctor is Online and available for patient)
   2. Individual doctor room (Room for consultation)

4. WebRTC and PeerJS are use to create a video consultation feature. WebRTC is for video and media transfer and PeerJS is use for Peer-to-Peer connection.
5. MongoDB is use for the NoSQL Database and use with Mongoose library.

## To run this project

1. First you need to add config.env file that store the environment variables to use with the backend in the backend directory.

```
NODE_ENV=development
PORT=5000
MONGO_URI= <Your MongoDB Url>
API_URL = /api/v1
secret = <Your secret code for JWT>
```

2. Install dependencies for the Backend and Run the backend REST API by typing the following command.

```
$ cd backend
$ npm install
$ npm start
```

3. Install dependencies for the Frontend and Run the React frontend by typing the following command.

```
$ cd ..
$ cd frontend
$ npm install
$ npm start
```

## API Documentation

#### API url : https://harmore.herokuapp.com

#### Patient Route (Need JWT token)

| Endpoint            | HTTP Method | CRUD Method | Result               | Authorization                         |
| ------------------- | ----------- | ----------- | -------------------- | ------------------------------------- |
| /api/v1/patient     | GET         | READ        | Get all patients     | Doctor, Staff                         |
| /api/v1/patient/:id | GET         | READ        | Get a single patient | Doctor, Staff, Patient(with match id) |
| /api/v1/patient     | POST        | CREATE      | Add a patient        | Staff                                 |
| /api/v1/patient/:id | PUT         | UPDATE      | Update a patient     | Patient(with match id)                |
| /api/v1/patient/:id | DELETE      | DELETE      | Delete a patient     | Staff                                 |

#### Doctor Route (Need JWT token)

| Endpoint           | HTTP Method | CRUD Method | Result              | Authorization                         |
| ------------------ | ----------- | ----------- | ------------------- | ------------------------------------- |
| /api/v1/doctor     | GET         | READ        | Get all doctor      | Paitent, Staff                        |
| /api/v1/doctor/:id | GET         | READ        | Get a single doctor | Patient, Staff, Doctor(with match id) |
| /api/v1/doctor     | POST        | CREATE      | Add a doctor        | Staff                                 |
| /api/v1/doctor/:id | PUT         | UPDATE      | Update a doctor     | Doctor(with match id)                 |
| /api/v1/doctor/:id | DELETE      | DELETE      | Delete a doctor     | Staff                                 |

#### Staff Route (Need JWT token)

| Endpoint          | HTTP Method | CRUD Method | Result             | Authorization |
| ----------------- | ----------- | ----------- | ------------------ | ------------- |
| /api/v1/staff     | GET         | READ        | Get all staffs     | Staff         |
| /api/v1/staff/:id | GET         | READ        | Get a single staff | Staff         |
| /api/v1/staff     | POST        | CREATE      | Add a staff        | Staff         |
| /api/v1/staff/:id | PUT         | UPDATE      | Update a staff     | staff         |
| /api/v1/staff/:id | DELETE      | DELETE      | Delete a staff     | Staff         |

#### Medical Record Route (Need JWT token)

| Endpoint                  | HTTP Method | CRUD Method | Result                     | Authorization   |
| ------------------------- | ----------- | ----------- | -------------------------- | --------------- |
| /api/v1/medicalRecord     | GET         | READ        | Get all medicalRecords     | Patient, Doctor |
| /api/v1/medicalRecord/:id | GET         | READ        | Get a single medicalRecord | Patient, Doctor |
| /api/v1/medicalRecord     | POST        | CREATE      | Add a medicalRecord        | Doctor          |
| /api/v1/medicalRecord/:id | PUT         | UPDATE      | Update a medicalRecord     | Doctor          |
| /api/v1/medicalRecord/:id | DELETE      | DELETE      | Delete a medicalRecord     | Doctor          |

#### Specialization Route (Need JWT token)

| Endpoint                   | HTTP Method | CRUD Method | Result                      | Authorization          |
| -------------------------- | ----------- | ----------- | --------------------------- | ---------------------- |
| /api/v1/specialization     | GET         | READ        | Get all specializations     | Patient, Doctor, Staff |
| /api/v1/specialization/:id | GET         | READ        | Get a single specialization | Patient, Staff         |
| /api/v1/specialization     | POST        | CREATE      | Add a specialization        | Staff                  |
| /api/v1/specialization/:id | PUT         | UPDATE      | Update a specialization     | Staff                  |
| /api/v1/specialization/:id | DELETE      | DELETE      | Delete a specialization     | Staff                  |

#### Authentication Route (Don't need JWT token)

| Endpoint                 | HTTP Method | CRUD Method | Result                    | Authorization    |
| ------------------------ | ----------- | ----------- | ------------------------- | ---------------- |
| /api/v1/patient/login    | POST        | CREATE      | Create JWT Token          | Registed Patient |
| /api/v1/patient/register | POST        | CREATE      | Create an patient account | All users        |
| /api/v1/doctor/login     | POST        | CREATE      | Create JWT Token          | Doctor           |
| /api/v1/staff/login      | POST        | CREATE      | Create JWT Token          | Staff            |

#### Filtering

| Example                                            | Result                                                   |
| -------------------------------------------------- | -------------------------------------------------------- |
| /api/v1/medicalRecord?doctor=123456&patient=789102 | Get medical record that match the doctorID and patientID |
| /api/v1/doctor/123456,213123                       | Get the information of the two doctors                   |

#### Sorting

| Example                         | Result                                   |
| ------------------------------- | ---------------------------------------- |
| /api/v1/medicalRecord?sort=date | Medical Record sort by date              |
| /api/v1/patient?sort=-name      | Patient sort by name in descending order |

#### Field Limiting

| Example                           | Result                 |
| --------------------------------- | ---------------------- |
| /api/v1/patient?fields=name,email | Show only patient name |

#### Pagination

| Example                       | Result                                                   |
| ----------------------------- | -------------------------------------------------------- |
| /api/v1/doctor?page=2&limit=5 | Get the information in page 2 and have 5 doctor per page |
