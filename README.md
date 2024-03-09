## Basic version of Paytm

Paytm like application that let’s users send money to each other given an initial dummy balance.

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
git clone https://github.com/abhirajthakur/Paytm
cd Paytm
```

### 2. Navigate to the frontend directory in Paytm

```bash
cd frontend
npm install
```

### 3. Navigate to the backend directory in Paytm

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
