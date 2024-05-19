## Basic version of Paytm

Paytm like application that let’s users send money to each other given an initial dummy balance.

### Preview

![image](https://github.com/abhirajthakur/Paytm/assets/72484943/a9ccf9e7-fba4-4a79-9bb3-96ffbaa996c4)
![image](https://github.com/abhirajthakur/Paytm/assets/72484943/a4071426-774b-456b-9bbe-f3fdac3f873e)
![image](https://github.com/abhirajthakur/Paytm/assets/72484943/96fd6bfc-00bf-4ac5-a87a-cbcb1f95f757)
![image](https://github.com/abhirajthakur/Paytm/assets/72484943/6d3b5c00-6c06-4010-be1c-581c06b916dc)

You can visit the site by going to this link [https://payapp-mocha.vercel.app/signup](https://payapp-mocha.vercel.app/signup)

### Technologies Used:

##### Backend

- Express - HTTP Server
- mongoose - ODM to connect to MongoDB
- zod - Input validation

##### Frontend

- React - Frontend framework
- Recoil - State management library
- Tailwind - Styling framework

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/abhirajthakur/payapp
cd payapp
```

### 2. Navigate to the frontend directory in payapp

```bash
cd frontend
npm install
```

### 3. Navigate to the backend directory in payapp

```bash
cd backend
npm install
```

### 4. Configure MongoDB

Make sure MongoDB is installed and running. Update the MongoDB connection string in the backend/.env file.

`.env.example` file is provided in the `backend` folder for the reference

### 5. Start the application

Run the command given below in the frontend directory.

```bash
npm run dev
```

Open another terminal window with backend directory and run the command given below in the backend directory.

```bash
node index.js
```

The frontend server will be running on `http://localhost:5173`.  
The backend server will be running on `http://localhost:3000`.

Open your web browser and navigate to `http://localhost:5173/signup` to access the application.
