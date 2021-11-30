# Chat-Zone

This is a full-stack chat application built with React, Node, Express, PostgreSQL and styled with Bootstrap 4.

<br>
<p>To check out the app click 
<a href="https://chat-zone-mw.herokuapp.com/" rel="nofollow">HERE</a>
</p>

<br>
<image src ="client/src/images/login.png" width="250" height="250" >
<image src ="client/src/images/register.png" width="245" height="250" >
<image src ="client/src/images/chat.png" width="250" height="250" >

</br>
</br>

## How to use this app

<ul>
<li>clone repository onto local machine</li>
<li>cd into the project folder</li>
<li>create a <code>.env</code> file by running <code>touch.env</code> in the root directory</li>
<li>create database and reference database.sql file</li> 
<li>copy and paste content from sample file <code>.env_sample</code> to <code>.env</code> file and replace/enter db credentials and token secret</li>
<li>install dependencies:
in the root, run <code>npm i</code>
 and cd into client and <code>run npm i</code></li>
<li>run the application:
cd back out to root <code>cd ..</code> and run: <code>npm run dev</code></li>
<li>view application in the browser:
Navigate to http://localhost:3000/</li>
</ul>

## Summary

This is the first full stack application I created with React, Node, Express and PSQL.

Users can create an account by registering. Once they have completed registration they will be redirected to Login and have access to the chat.

JWT is stored in local storage to save the users session. This allows users to re-enter without having to login again.

<br>
There is so much that I have learned when I was building this app but here is a list of the main concepts that I understand now:
<ul>
<li>Node as web server, serving up static files to the client</li>
<li>Express for handling API calls</li> 
<li>Password hashing using bcrypt</li>  
<li>User authentication with JWT</li>
<li>CRUD functionality and managing data with PSQL</li>
<li>Deployment to Heroku and hosting the database on ElphantSQL</li>
</ul>
</br>

 </br>

## Technologies/ Libraries Used:

 <ul>
    <li>React</li>
    <li>Node</li>
    <li>Express</li>
    <li>PSQL</li>
    <li>Axios</li>
    <li>Heroku</li>

 </ul>

 <div>
<br></br>
</div>

<div>
<image src ="client/src/images/react-logo.png" width="97" height="97" style="margin-left:0.5em">
<image src ="client/src/images/nodejs.png" width="96" height="96" style="margin-left:0.5em">
<image src ="client/src/images/psql.png" width="93" height="96" style="margin-left:0.5em">
<image src ="client/src/images/heroku-logo.png" width="95" height="96" style="margin-left:0.5em">

</div>
<br>

## Author

<ul>
<strong>Maher Wardak</strong> - <em>Full-Stack Software Developer</em> - <a href="https://maher-wardak.herokuapp.com/" rel="nofollow">Website</a> | <a href="https://www.linkedin.com/in/maherwardak/" rel="nofollow">LinkedIn</a></li>
</ul>
