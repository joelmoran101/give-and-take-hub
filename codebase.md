# vitest.config.ts

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
  },

});
```

# vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000
    },
    build: {
        outDir: "dist"
    }
  
});
```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",                          
    "lib": ["dom", "dom.iterable", "esnext"], 
    "allowJs": true,                          
    "skipLibCheck": true,                     
    "esModuleInterop": true,                  
    "allowSyntheticDefaultImports": true,     
    "strict": true,                           
    "forceConsistentCasingInFileNames": true, 
    "module": "esnext",                       
    "moduleResolution": "node",               
    "resolveJsonModule": true,                
    "isolatedModules": true,                  
    "noEmit": true,                           
    "jsx": "react-jsx"                        
  },
  "include": ["src"]                        /* Skip type checking all .d.ts files. */
}


```

# package.json

```json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@reduxjs/toolkit": "^2.2.7",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "axios": "^1.7.3",
    "bcrypt": "^5.1.1",
    "bootstrap": "^5.3.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-rate-limit": "^7.4.0",
    "formik": "^2.4.6",
    "helmet": "^4.4.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.5.3",
    "newrelic": "^12.0.0",
    "nodemailer": "^6.9.14",
    "react": "^18.3.1",
    "react-bootstrap": "^2.10.4",
    "react-dom": "^18.3.1",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.26.0",
    "styled-components": "^6.1.12",
    "swagger-ui-express": "^5.0.1",
    "yamljs": "^0.3.0",
    "yup": "^1.4.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/jest": "^29.5.12",
    "@vitejs/plugin-react": "^4.3.1",
    "jsdom": "^24.1.1",
    "sass": "^1.77.8",
    "typescript": "^5.5.4",
    "vite": "^5.4.0",
    "vitest": "^2.0.5"
  },
  "scripts": {
    "start": "vite --open",
    "build": "vite build",
    "test": "vitest",
    "preview": "vite preview"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

```

# index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />

    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>

    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>

```

# index 2.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />

    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>

    <script type="module" src="/src/index.jsx"></script>
  </body>
</html>

```

# README.md

```md
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

```

# backend/server.js

```js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const swaggerDocs = require('./utilities/swagger')
// additional features to minimize risks of cyber attacks
// import express-rate-limit
const rateLimit = require('express-rate-limit')
// import helmet
const helmet = require('helmet')

const app = express();

// SECURITY
    // make use of express-rate-limit
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10 // limit each IP to 10 requests per window
    });    
  app.use(limiter);
  
      // make use of helmet
  app.use(helmet())

app.use(express.json());
app.use(cors())

// Connect to MongoDB

try {
  mongoose.connect(process.env.MONGO_DB)
  console.log('Connected to MongoDB');
} catch (err) {
  console.error('Error connecting to MongoDB:', err);
}

// Define a model
const User = mongoose.model('User', {
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  phone: String,
});

// Define a route
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});
app.post('/api/register', async (req, res) => {
    const { firstname, lastname, username, email, phone } = req.body;

    console.log(req.body)

    try {

        const foundUser = await User.findOne({$or:[{username}, {email}]})

        if(foundUser){
            return res.status(400).send('user already exist')
        }
        const newUser = new User({ username, firstname, lastname, email, phone })
        await newUser.save();
        res.status(201).send('user created successfully')

    }catch(err){
        console.log(err)
        res.status(500).send('something went wrong')
    }

})

app.post('/api/login', async (req, res) => {
  const { username_or_email } = req.body;

  try {
    const foundUser = await User.findOne({$or:[{username:username_or_email}, {email:username_or_email}]})
    console.log(foundUser)
    console.log(await loginCode)

    if(!foundUser){
      return res.status(401).send('Invalid credentials');
    }
    // uuid to create a random code
    // code should be sent to user's email; copy paste back to the login page

    const isValidLoginCode = await bcrypt.compare(loginCode, foundUser.loginCode);
    if (!isValidLoginCode) {
      return res.status(401).send('Invalid username or loginCode');
    }
    // If the username and password are valid, generate a JWT token
    const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log('Server is running on port '+process.env.PORT);
  swaggerDocs(app, process.env.PORT)
});
```

# src/setupTests.ts

```ts
import '@testing-library/jest-dom';
```

# src/index.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/main.routes';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
          </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

# src/index.scss

```scss
@import 'bootstrap/scss/bootstrap';

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

```

# src/App.tsx

```tsx
import React from 'react';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <Outlet />
  </div>
  );
}

export default App;
```

# src/App.css

```css
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

```

# backend/utilities/swagger.yaml

```yaml
openapi: "3.0.0"
info:
  version: "1.0.0"
  title: "Give and Take Hub"
  description: "An application platform where users can anonymously offer or request items or services for free. Give and Take Hub"

servers:
  - url: "http://localhost:4000/api"

components:
  securitySchemes:
    bearerAuth:
      type: "http"
      scheme: "bearer"
      bearerFormat: "JWT"

  schemas:
    User:
      type: "object"
      properties:
        _id:
          type: "string"
          example: "66be0a935965dd869c358577"
        firstname:
          type: "string"
          example: "John"
        lastname:
          type: "string"
          example: "Doe"
        username:
          type: "string"
          example: "johndoe"
        email:
          type: "string"
          example: "johndoe@my.com"
        phone:
          type: "string"
          example: "1234567890"
      required:
        - "username"
        - "email"

    Item:
      type: "object"
      properties:
        _id:
          type: "string"
          example: "66be0a935965dd869c358577"
        name:
          type: "string"
          example: "Item 1"
        description:
          type: "string"
          example: "This is item 1"
        images:
          type: "array"
          items:
            type: "string"
            example: "https://example.com/item1.jpg"

security:
  - bearerAuth: []  

paths:
  /login:
    post:
      summary: "Login with username or email"
      description: "Login with username or email but with one-time login code."
      tags: ["Authentication"]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: "object"
              properties:
                username:
                  type: "string"
                  example: "johndoe"
                email:
                  type: "string"
                  example: "johndoe@my.com"
              required:
                - "username"
                - "email"
      responses:
        200:
          description: "Login successful"
          content:
            application/json:
              schema:
                type: "object"
                properties:
                  token:
                    type: "string"
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmUwYTkzNTY1ZGQ4NjljMzU4NTc3MiIsImlhdCI6MTY3MjIwNzU5Nn0.8h9tqQZvqO2s7t5nG4sZSv7gY0Sf8f1QZ"

        401:
          description: "Invalid credentials"
        400:
          description: "Missing username or email"
        500:
          description: "Internal server error"
  
  /register:
    post:
      summary: "Register a new user"
      description: "Register a new user."
      tags: ["Authentication"]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: "object"
              properties:
                firstname:
                  type: "string"
                  example: "John"
                lastname:
                  type: "string"
                  example: "Doe"
                username:
                  type: "string"
                  example: "johndoe"
                email:
                  type: "string"
                  example: "johndoe@my.com"
                phone:
                  type: "string"
                  example: "1234567890"
              required:
                - "username"  
                - "email"
      responses:
        200:
          description: "Registration successful"
          content:
            application/json:
              schema:
                type: "object"
                properties:
                  firstname:
                    type: "string"
                    example: "John"
                  lastname:
                    type: "string"
                    example: "Doe"
                  username: 
                    type: "string"  
                    example: "johndoe"
                  email:
                    type: "string"
                    example: "johndoe@my.com"
                  phone:
                    type: "string"
                    example: "1234567890"
                required:
                  - "username"
                  - "email"
        400:
          description: "Missing username or email"      
        500:
          description: "Internal server error"
  
```

# backend/utilities/swagger.js

```js
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');
const path = require('path');

const swaggerDocument = yaml.load(path.join(__dirname, 'swagger.yaml'));

function swaggerDocs(app, port) {
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    console.log(`Version 1 Docs available at http://localhost:${port}/docs`);
}
module.exports = swaggerDocs
```

# backend/config/db.js

```js
import mongoose from 'mongoose';


async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

module.exports = { connectToDB}
```

# src/store/store.js

```js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../state/userSlice';



export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});


```

# src/state/userSlice.js

```js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
    email: '',
    phone: '',
    giver: false,
    searcher: false,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    // Add more reducers for other fields
  },
});

export const { setUsername, setPassword } = userSlice.actions;
export default userSlice.reducer;
```

# src/pages/Register.tsx

```tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import './Register.css';
import axios from 'axios';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';

type FormValues = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
};  

const RegisterSchema = Yup.object().shape({
  firstname: Yup.string(),
  lastname: Yup.string(),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
});

const Register = () => {
const initialValues = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  phone: ''

}
const navigate = useNavigate();

  const handleSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    axios.post('http://localhost:4000/api/register', values).then((response) => {
      console.log(response.data);
      resetForm(); // Reset the form after submission
      navigate('/login');

    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="register-container">
      <h1>Registration Form</h1>
      <Formik

        initialValues={initialValues}

        validationSchema={RegisterSchema}

        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <Field type="text" id="firstname" name="firstname" />
            <ErrorMessage name="firstname" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <Field type="text" id="lastname" name="lastname" />
            <ErrorMessage name="lastname" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <Field type="text" id="phone" name="phone" />
            <ErrorMessage name="phone" component="div" />
          </div>

          <div className="button-container">
            <button type="submit" className="register-button">Register</button>
            <Link to="/" className="back-button">Go back...</Link>
          </div>

        </Form>
      </Formik>
    </div>
  );
};

export default Register;

```

# src/pages/Register.css

```css
.register-container {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7); /* Make the form slightly transparent */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.register-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../assets/images/bird.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1; /* Place the pseudo-element behind the container */
  }

body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: white;
  }

.form-group {
  margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    padding-left: 10px;
  }
  
  .error-message {
    color: red;
    margin-top: 5px;
  }
  
  .back-button {
    text-decoration: none;
    padding: 10px 20px;
    margin: 0 10px;
    background: lightgreen;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }


```

# src/pages/Profile.tsx

```tsx
import React from 'react'

function Profile() {
  return (
    <div>
      
    </div>
  )
}

export default Profile

```

# src/pages/Login.tsx

```tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup'; 
import './Login.css'; // Import the CSS file for styling the impo
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

type FormValues = {
  username_or_email: string;
};

const LoginSchema = Yup.object().shape({
  username_or_email: Yup.string().required('username_or_email is required'),
});

const Login = () => {
  const initialValues = {
    username_or_email: '',
    loginCode: '', // new input field for one-time login code
  }

  const navigate = useNavigate();
  const handleSubmit = (values: FormValues, { setSubmitting, resetForm }:FormikHelpers<FormValues>) => {
    // Make a request to the backend to verify the credentials
    // You can use fetch or any other HTTP client library
    axios.post('http://localhost:4000/api/login-with-code', {
      username_or_email: values.username_or_email,
      loginCode: values.loginCode,
    })
    
    .then((response) => {
      console.log(response.data);
      resetForm(); // Reset the form after submission
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setSubmitting(false);
        navigate('/home');
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="username_or_email">Username or Email</label>
            <Field type="text" id="username_or_email" name="username_or_email" />
            <ErrorMessage name="username_or_email" component="div" className="error-message" />
          </div>
          <button type="submit" className="get_code_button">Get One-Time Login Code</button>
          <div className="form-group">
            <label htmlFor="loginCode"></label>
            <Field type="text" id="loginCode" name="loginCode" placeholder="One-Time Login Code"/>
            <ErrorMessage name="loginCode" component="div" className="error-message" />
          </div>
          
          <Link to="/register">No account yet? Register here...</Link>
          <button type="submit" className="login-button">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
```

# src/pages/Login.test.tsx

```tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  it('renders login form with one-time login code input', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText('One-time login code')).toBeInTheDocument();
  });

  it('submits form with one-time login code', () => {
    const onSubmit = jest.fn();
    render(<Login onSubmit={onSubmit} />);
    const codeInput = screen.getByLabelText('One-time login code');
    const submitButton = screen.getByRole('button', { type: 'submit' });
    fireEvent.change(codeInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ code: '123456' });
  });
});
```

# src/pages/Login.css

```css
.login-container {
    position: relative;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.7); /* Make the form slightly transparent */
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .login-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-image: url('../assets/images/bird.jpg'); */
    background-size: cover;
    background-position: center;
    z-index: -1; /* Place the pseudo-element behind the container */
  }

body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    /* background-color: white; */
    background-image: url('../assets/images/bird.jpg');
    background-size: cover;
    background-position: center;
}

.form-group {
  margin-bottom: 15px;
  padding: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.get_code_button {
  background-color: darkorchid;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.login-button {
    background-color: lightgreen;
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

.error-message {
  color: red;
  margin-top: 5px;
}
```

# src/pages/Hub.tsx

```tsx
import React from 'react'

function Hub() {
  return (
    <div>
      
    </div>
  )
}

export default Hub

```

# src/pages/Home.tsx

```tsx
import React from 'react';
import Hero from '../components/hero/Hero';
import './Home.css';

function Home() {
  return (
    <>
      <header className="Header">
        <div className="main-container">
          <div className="wrapper-logo" style={{ color: "black" }}>
            <img className="logo" src="/src/assets/images/free-logo.svg" alt="logo" />
            <div>Give and Take</div>
          </div>

          <nav>
            <ul>
              <li><a href="src/pages/Home.tsx">Home</a></li>
              <li><a href="src/pages/Hub.tsx">Give & Take Hub</a></li>
              <li><a href="src/pages/About.tsx">About</a></li>
              <li><a href="src/pages/Register.tsx">Join</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className='d-flex flex-column justify-content-center text-center align-items-center'>
        <h1 className="home-heading display-1">Welcome</h1>
        <h1 className="home-heading display-3">to the</h1>
        <h1 className="home-heading display-1">Give and Take Hub</h1>
        <Hero />
      </div>
    </>
  );
}

export default Home;
```

# src/pages/Home.test.tsx

```tsx
import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect } from 'vitest'
 import Home from './Home'
import { MemoryRouter } from 'react-router-dom'

 describe('Home page header', () => {
  it('should render the header with the correct logo and navigation', () => {
    const { getByText, getByRole } = render(<MemoryRouter >
      (<Home />);
    </MemoryRouter>);
    
    // Test the logo
    expect(getByText('Give and Take')).toBeInTheDocument();
    
    // Test the navigation links
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Give & Take Hub')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Join')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
    
    // Test the navigation links have the correct href attribute
    const homeLink = getByText('Home');
    expect(homeLink).toHaveAttribute('href', 'src/pages/Home.tsx');
    
    const hubLink = getByText('Give & Take Hub');
    expect(hubLink).toHaveAttribute('href', 'src/pages/Hub.tsx');
    
    const aboutLink = getByText('About');
    expect(aboutLink).toHaveAttribute('href', 'src/pages/About.tsx');
    
    const joinLink = getByText('Join');
    expect(joinLink).toHaveAttribute('href', 'src/pages/Register.tsx');
    
    const logoutLink = getByText('Logout');
    expect(logoutLink).toHaveAttribute('href', '#');
  });
});

//  describe('Home page', () => {
//     it('should render the hero section with a background image and a tagline', () => {
//       const { getByText, getByRole } = render(<Home />);
      
//       expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^welcome/i);
//       expect(screen.getByText(/to the/i)).toBeInTheDocument();
//       expect(screen.getByRole('img')).toBeInTheDocument();
//     });
//   })
```

# src/pages/Home.css

```css
.wrapper-logo {
    float: left;
  }
  
  nav {
    float: right;
  }
  
  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  nav li {
    display: inline-block;
    margin-left: 20px;
  }
  
  nav a {
    text-decoration: none;
    color: #337ab7;
  }
```

# src/pages/About.tsx

```tsx
import React from 'react'

function About() {
  return (
    <div>
      
    </div>
  )
}

export default About

```

# src/routes/main.routes.tsx

```tsx
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Hero from "../components/hero/Hero";
import Register from "../pages/Register";
import Login from "../pages/Login";
import GiveItem from "../components/GiveItem";
import SearchItems from "../components/SearchItems";

export const router=createBrowserRouter(createRoutesFromElements(

        <Route element={<App />} >
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<Hero />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/give" element={<GiveItem />} />
            <Route path="/search" element={<SearchItems />} />
        </Route>
   
))


```

# src/components/SearchItems.tsx

```tsx
import React from 'react';

function SearchItems() {
  return <h2>Search Items</h2>;
}

export default SearchItems;
```

# src/components/GiveItem.tsx

```tsx
import React from 'react';

function GiveItem() {
  return <h2>Give an Item</h2>;
}

export default GiveItem;
```

# src/authorization/AuthContext.ts

```ts
// src/context/AuthContext.

// import { createContext, useState } from 'react';

// interface AuthContext {
//   isLoggedIn: boolean;
//   login: () => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContext | null>(null);

// const AuthProvider: React.FC = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = () => {
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthProvider, AuthContext };
```

# src/assets/images/free-logo.svg

This is a file of the type: SVG Image

# src/assets/images/bird.jpg

This is a binary file of the type: Image

# src/components/hero/hero.test.tsx

```tsx
// src/components/hero/hero.test.tsx
import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import Hero from './Hero';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../pages/Home';

describe('Hero component', () => {
  afterAll(() => {
    cleanup();
})
  it('renders hero component correctly', () => {    
    render(
    <MemoryRouter >
      (<Hero />);
    </MemoryRouter>
    );
    expect(screen.getByText(/a sharing platform/i)).toBeInTheDocument();
    });
  });

  // it('should render hero component without the buttons after the user successfully loggedin', () => {
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <Hero.isLoggedIn />
  //     </BrowserRouter>
  //   );

  //   expect(getByText('This is the hero component')).toBeInTheDocument();
  // });

  // it('renders hero component with correct link', () => {
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <Hero />
  //     </BrowserRouter>
  //   );

  //   const link = getByText('Learn More');
  //   expect(link).toHaveAttribute('href', '/learn-more');
  // });

  // it('calls onClick function when button is clicked', () => {
  //   const onClick = vi.fn();
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <Hero onClick={onClick} />
  //     </BrowserRouter>
  //   );

  //   const button = getByText('Click me');
  //   fireEvent.click(button);
  //   expect(onClick).toHaveBeenCalledTimes(1);
  // });



// src/components/hero/hero.test.js
// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import Hero from './Hero';
// // import App from '../../App';
// import { MemoryRouter } from 'react-router-dom';


// describe('Hero component', () => {
//   it('renders hero component correctly', () => {
//   render(<MemoryRouter>
//       (<Hero />);
//       const heroEl = screen.getByText(/A Sharking Platform/i);
//       expect(heroEl).toBeInTheDocument();
//     </MemoryRouter>)
//   });

//   it('renders hero component with correct text', () => {
//     const { getByText } = render(
//       <BrowserRouter>
//         <Hero />
//       </BrowserRouter>
//     );

//     expect(getByText('This is the hero component')).toBeInTheDocument();
//   });

//   it('renders hero component with correct link', () => {
//     const { getByText } = render(
//       <BrowserRouter>
//         <Hero />
//       </BrowserRouter>
//     );

//     const link = getByText('Learn More');
//     expect(link).toHaveAttribute('href', '/learn-more');
//   });

//   it('calls onClick function when button is clicked', () => {
//     const onClick = vi.fn();
//     const { getByText } = render(
//       <BrowserRouter>
//         <Hero onClick={onClick} />
//       </BrowserRouter>
//     );

//     const button = getByText('Click me');
//     fireEvent.click(button);
//     expect(onClick).toHaveBeenCalledTimes(1);
//   });
// });
```

# src/components/hero/Hero.tsx

```tsx
import './Hero.css'

// src/components/hero/Hero.tsx
import React, { useContext} from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  // No props expected
}

function Hero(props: HeroProps) {
  return (
    <div className="hero-container" aria-label='main hero'>
      <h1>A Sharing Platform </h1>
      <p className="hero-description">
        <strong>Core Concept:</strong> A platform where users can anonymously offer or request items or services for free.
        <br/>
        <strong> Unconditional giving or sharing is good not only for the recipient but also for the giver. It makes one feel connected.</strong> 
      </p>
      <div className="hero-buttons">
        <Link to="/register"><button className="register-button">Register</button></Link>
        <Link to="/login"><button className="login-button">Login</button></Link>
        <Link to="/"><button className="browse-button">Browse</button></Link>
      </div>
    </div>
  );
}

export default Hero;


//  Hero.jsx
// import React from 'react';
// import './Hero.css'; // Import your CSS file for styling
// import { Link } from 'react-router-dom';

// const Hero = () => {
//     return (
//         <div className="hero-container">
//             <h1>A Sharing Platform </h1>
//             <p className="hero-description">
//                 <strong>Core Concept:</strong> A platform where users can anonymously offer or request items or services for free.
//                 <br/>
//                 <strong> Unconditional giving or sharing is good not only for the recipient but also for the giver. It makes one feel connected.</strong> 
//             </p>
//             <div className="hero-buttons">
//                 <Link to="/register"><button className="register-button">Register</button></Link>
//                 <Link to="/login"><button className="login-button">Login</button></Link>
//             </div>
//         </div>
//     );
// }

// export default Hero;
```

# src/components/hero/Hero.css

```css
/* Heading styles */

.App {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('../../assets/images/bird.jpg');
  background-size: cover;
  background-position: center;
  
}

.App h1 {
  margin-top: 0;
  font-size: 3rem;
  color: #333;
}
/* Hero.css */

.hero-container {
    background: #f8f9fa;
    padding: 50px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.5);
}

.hero-container h1 {
    font-size: 2.5rem;
    color: #333;
}

.hero-description {
    font-size: 1.2rem;
    color: #555;
    margin-top: 20px;
}

.hero-buttons {
    margin-top: 30px;
}

.register-button {
    padding: 10px 20px;
    margin: 0 10px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
}

.login-button {
    padding: 10px 20px;
    margin: 0 10px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
}
.browse-button {
    padding: 10px 20px;
    margin: 0 10px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
}

.register-button:hover, .login-button:hover {
    background: #0056b3;
}
```

# src/components/articleCard/ArticleCard.scss

```scss
.article-card {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .classification-header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .article-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .article-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .article-description {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .read-more-button,
  .back-button,
  .search-button {
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .read-more-button {
    background-color: #4CAF50;
    color: #fff;
  }
  
  .back-button {
    background-color: #2196F3;
    color: #fff;
  }
  
  .search-button {
    background-color: #FFC107;
    color: #fff;
  }
```

# src/components/articleCard/ArticleCard.jsx

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <h2 className="classification-header">{article.classification}</h2>
      <img src={article.image} alt={article.title} className="article-image" />
      <h3 className="article-title">{article.title}</h3>
      <p className="article-description">{article.description}</p>
      <div className="button-container">
        <Link to={`/articles/${article.id}`}>
          <button className="read-more-button">Read More</button>
        </Link>
        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
        <button className="search-button">Search for Another Article</button>
      </div>
    </div>
  );
}

export default ArticleCard;
```

