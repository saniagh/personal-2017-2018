#Bloo's Shop

![Bloo's Shop](https://i.imgur.com/pDebTe6.png)


<h3>1.What is Bloo's Shop?</h3>


<p>Bloo's Shop is a Single Page Application that serves the purpose of an online-based shop.</p>
<p>Bloo's Shop offers both the user and the administrator an user friendly interface, easily usable even by those not tech savy.</p>


<h3>2.What kind of public does this application appeal to?</h3>

<p>Being an online-based shop, Bloo's Shop allows people of any age to buy goods. At the moment, the theme of the shop is books as per the requirements of different contests it is used for.</p>

<b>If some aspects may seem strange, it is because the shop was designed to be a women clothing shop.</b>
<p>It was adapted for an educational purpose.</p>

<p>We sell books so demographics can vary, I'd say mostly yound adults would be our customers or students.</p>


<h3>3.Availability:</h3>

<p>Bloo's Shop can be easily installed on any machine.</p>
<p>I run it on an Ubuntu 16.04 LTS with Node 9.10.1 and npm 5.6.0 .</p>
<p>The application can be accessed from any browser that has localStorage support and can use JavaScript.</p>
<p>Some very old versions of IE might not work ( below 9 )</p>


<h3>4.Features:</h3>

<p>When talking about general features, Bloo's Shop does anything a regular shop does. To make it also viable for larger companies, it comes with a WooCommerce-like control panel for both products added and orders made by users.</p>
<p>We've created an upload function for photos (which we use in our application), we send mails to notify users of successful registration and when their order is updated, </p>
<p>Here are some of the more minor features:</p>
<ul>
<li>we have a remember me feature that if you do not check when logging in, you will be logged out after 24 hours ( JWT authentication )</li>
<li>all of the pictures on the Home page can be controlled from the Control Panel, both the picture and the link it leads to.</li>
<li>all of the options in the navigation menu & footer bar are customisable from the settings in Control Panel</li>
<li>the server runs on multiple Express instances so that the workload does not overwhelm the main server</li>
<li>Ddos and flood protections are enabled, as well as compression for ajax request bodies</li>
<li>users that sign up will be automatically logged in upon successful registration ( without the remember me )</li>
<li>XSS and SQL injection are not possible as every request that inserts a new collection in our database is checked by our middlewares</li>
<li>requests on routes that are only for administrators are protected by the JWT</li>
<li>the shop allows search of products by tags or category</li>
<li>we have different settings for the mobile version and the desktop version when it comes to the Home page pictures.</li>
</ul>

<h3>5.Security and backend:</h3>

<p>User accounts are protected by JWT passwords with the secret key being stored in a folder in the root folder called db-config/index.json.</p>
<p>Any attempt at modifying the JWT and using the modified JWT will fail as we check it at each page load. Incorrect or expired tokens will be deleted from the localStorage and the user is forced to relog.</p>
<p>The server is protected against DDos attacks and attempts at data flooding the database. Any request to add more than 10 orders per hour will fail.</p>
<p>The server runs on more Express instances, allowing the master to pass the load to the slaves in case there are too many requests at once.</p>
<p>All user input is verified and validated by our middlewares.</p>
<p>Users that are not administrators cannot access the control panel. It is protected by a field in the JWT called isAdmin. The JWT is sent as a header with bearer Authentication ${token} and is verified on the server.</p>

<h3>6.Design:</h3>

<p>The design for this application is mostly inspired by online shops for women clothing.</p>
<p>Most of the material used is from Ant Design, a library with React Components.</p>
<p>All other css is written by hand. Components like the main nav menu for Desktop and the Shopping Cart are created by myself, as well as all of the pages the application has.</p>
<p>The application also uses Redux for easy communication between some un-connected components, and also for managing the shopping cart.</p>
<b>One important thing about Redux in this application is that it needs to be rehydrated in case the user reloads the page and he has added some items to his/her shopping cart, otherwise it would all be gone.</b>
<p>The application has a responsive design for both the regular user side, the shop, and the administration, the control panel.</p>

<h3>7.Frameworks, languages and other tools used:</h3>

<ul>
<li>HTML & HTML5</li>
<li>CSS ( SCSS )</li>
<li>JavaScript ( ES6, with some ES5 on the server-side )</li>
<li>React</li>
<li>NodeJS with Express</li>
<li>Redux Thunk</li>
<li>npm for packaging</li>
<li>webpack 3.8.1 for bundling</li>
<li>Babel for React and some of the experimental features ( like Object-Spread Operator )</li>
<li>axios for AJAX requests with Promise API included</li>
</ul>

<h3>8.How to test locally:</h3>

<h4>I.Requirements:</h4>
<ul>
<li>NodeJS v9.10.1</li>
<li>npm 5.6.0</li>
<li>webpack 3.8.1</li>
<li>MongoDB 3.4.10, git version: 078f28920cb24de0dd479b5ea6c66c644f6326e9</li>
<li>OPTIONAL: I've developed it on Ubuntu 16.04 LTS so I recommend testing it on the same env.</li>
</ul>

<h4>II. Installation:</h4>


<h5>For EmpowerSoft I have included the file you need to create with the template below.</h5>

<p>In the root folder create a folder called db-config and in it a file called index.json with the following content:</p>

```javascript
{
  "dbUri": "mongodb://localhost/application_db",
  "jwtSecret": "YOUR_SECRET_KEY"
}
```

<p><b>The git version of this project will not be distributed with all the uploads. Please manually create a folder called uploads in /public/ . If you are not using this from the git repository, ignore this step.</b></p>

<p>Import the mongo database dump from the folder /application-db with the following command: </p>

```shell
mongorestore -d application_db application_db/
```

<p>Next do the following in the root folder:</p>

```shell
npm install
```

<p>To run development server: </p>

```shell
npm start
```

<p>To run production server:</p>

```shell
npm run cluster-server
```

<p>If you wish to rebuild the project with your own version of Node for development:</p>

```shell
npm run bundle
```

<p>If you wish to rebuild the project with your own version of Node for production:</p>

```shell
npm run bundle-p
```

<b>Sometimes the <i>bcrypt</i> module does not install correctly. To reinstall it just run:</b>

```shell
npm install bcrypt --save
```
<p>
<b>For testing in development, I recommend removing the ddos and flood protection ( line 7 and 8 from /index.js and createGroupLimiter middleware from line 37 in /res/handlers/orders.js )</b>
</p>

<h3>9.Creator:</h3>
<h4>Valentin Marian Constanda</h4>