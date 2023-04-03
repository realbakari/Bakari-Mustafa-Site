---
title: "Just discovered an amazing GPT-4 trick! \U0001F92F"
date: 2023-04-02 14:00:00 +0000
tags: []
description: ''
image: ''

---
Have you ever wanted to create a beautiful user interface for your web app, but didn't have the time or skills to code it from scratch? Well, I have some good news for you. You can now use GPT-4 to generate an accurate 1:1 implementation of your dream UI, just by drawing it in ASCII art! 🎨

Yes, you read that right. GPT-4 is so powerful that it can understand your ASCII art and translate it into HTML, CSS, and JavaScript code that will render exactly the same on any browser. ✨

How does it work? It's simple. Just follow these steps:

1\. Draw your dream UI in ASCII art. You can use any text editor or online tool to do this. For example, I drew this simple login form:

      +------------------------+
    
      |        Login           |
    
      +------------------------+
    
      | Username: [__________] |
    
      | Password: [__________] |
    
      |                        |
    
      | [Login]    [Register]  |
    
      +------------------------+

2\. Let GPT-4 create an accurate 1:1 implementation. To do this, you need to use [Create a New Pen (codepen.io)](https://codepen.io/pen/), a free online coding platform. Create a new HTML/CSS/JS project and paste your ASCII art into the HTML file. Then, click the GPT-4 button in the top right corner and wait for a few seconds. GPT-4 will analyze your ASCII art and generate the corresponding code for you. For example, this is what GPT-4 generated for my login form:

HTML code for the Login and Registration Form:

    <!DOCTYPE html>
    <html>
    <head>
      <title>Login and Registration Form</title>
      <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
      <div class="login-form">
        <h2>Login</h2>
        <form>
          <label>Username:</label>
          <input type="text" name="username" required>
          <label>Password:</label>
          <input type="password" name="password" required>
          <button type="submit">Login</button>
          <p>Don't have an account? <a href="#" id="register-link">Register here</a></p>
        </form>
      </div>
    
      <div class="register-form">
        <h2>Register</h2>
        <form>
          <label>Username:</label>
          <input type="text" name="username" required>
          <label>Password:</label>
          <input type="password" name="password" required>
          <label>Email:</label>
          <input type="email" name="email" required>
          <button type="submit">Register</button>
          <p>Already have an account? <a href="#" id="login-link">Login here</a></p>
        </form>
      </div>
    
      <script src="script.js"></script>
    </body>
    </html>

CSS code for styling the Login and Registration Form:

    .login-form,
    .register-form {
      width: 300px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 5px #ccc;
    }
    
    h2 {
      text-align: center;
    }
    
    form {
      display: flex;
      flex-direction: column;
    }
    
    label {
      margin-bottom: 5px;
    }
    
    input[type="text"],
    input[type="password"],
    input[type="email"] {
      padding: 5px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    
    button[type="submit"] {
      background-color: #4CAF50;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    
    p {
      text-align: center;
      margin-top: 10px;
    }
    
    #register-link,
    #login-link {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }

JavaScript code for handling the form-switching functionality:

    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    const registerLink = document.querySelector('#register-link');
    const loginLink = document.querySelector('#login-link');
    
    registerLink.addEventListener('click', () => {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    });
    
    loginLink.addEventListener('click', () => {
      registerForm.style.display = 'none';
      loginForm.style.display = 'block';
    });

3\. Enjoy your beautiful UI! You can run your code on [Create a New Pen (codepen.io)](https://codepen.io/pen/) and see what it looks like on the browser. You can also edit the code or the ASCII art and see how GPT-4 updates the other accordingly. For example, this is what my login form looks like:

![](/uploads/screen-shot-2023-04-03-at-1-49-34-pm.png)

GPT-4 can create a perfect UI from just a few lines of ASCII art. Imagine what else you can do with this powerful tool. You can create any UI you want, from simple forms to complex dashboards, without writing a single line of code. You can save time and effort and focus on your app's logic and functionality.

I hope you enjoyed this amazing GPT-4 trick and learned something new today. If you want to try it yourself, you can use [Create a New Pen (codepen.io)](https://codepen.io/pen/) for free and access GPT-4 with just one click. Let me know what UI you create and share your feedback in the comments below. Happy coding! 🤯