# node-tinder
=> Create Repository
=> Initalize git
=> add gitIgnore
=> npm init
=> install express
=> create experss  server &  configure routes
=> Use of app.use() & app.get()
=> Test api using POSTMAN Like - GET , POST , DELETE 
=> Explore daynamic routing 
=> Play with handler & multiple handler
=> Install mongodb & Connect with monodb 
=> perform crud operation using monogodb
=> uninstall monogo db
=> install mongoose 
=> connect db with mongoose 
=> Create Schema & made model 
=> Configure Model into app.js to insert data in database

=> make post api ("/signup")
=> Wrap db save with try catch block to hanndle properly
=> make 2  get API (/user , /feed) 
=> I had explore find , findOne ,findById method

=> Add timestamps to the userSchema
=> Add API level validation on Patch request & Signup post api
=> DATA Sanitizing - Add API validation for each field
 => Install Vaildator & Explore validator functionalities likes email , password & photo URL


=> made an utils folder to validate signup form data
=> Installed Bcrypt npm for enciption password
=> Create PasswordHash using bcrypt.hash & save the user is encrypted password
=> Made Login API & test with email & password

=> Install cookieparser npm to read cookie 
=> Just send to dummy cookies data 
=> Save Cookie in Client or broswer
=> Install npm install jsonwebtoken
=> Creating jwt token
=> Add token into cookies
=> In Login API , after email & password validation set the cookie with login api (/login)
=> Send token with req of every api like get profile  
=> read the cookie inside you profile API& find the looged User
=>  create userAuth middleware for authentication & set expires time in jwt & cookies

=> Create userSchema Method to getJWT() & validatePassword()

=> finalize some api list . we will use in App
=> Create routes for all api & grouping 
=> create routes  Like (authRouter,profileRoute ,requestsRouter )
=> Move all api from app.js to routes according to route
=> Import All express Router in app.js , we difine in routes folder like   (authRouter,profileRoute ,requestsRouter )

=> Create POST /logout api
=> Create PATCH /profile/edit api
=> Implement validation in api , user logined or not , allowed updated filed for edit api & update to exting data


=> Create Update Password API (/profile/password)
=> -- Comapare  req.body.password & res.user.password(LoggedInUser.password) using  bcrypt.compare(password , LoggedInUser.password)
=>  After update new password in Database
        
=> Create Connection Request Schema 
 => Create /request/send/:status/:toUserId Api for interested & ignored request
 => Create /request/review/:status/:requestedId  Api for  accepeted  or rejected request & validate res.body & connection 


 => Create user/requests/recived api
 => combine relation between ConnectionRequestModel & UserModel using ref Like (ref:  ref: "User") & populate data according 

=> Create /user/connections API 


=> Create /feed api of user & exlore condition like (nid,ne)

=> Creating Pagination for feed page

/feed?page=1&limit=10 =>1-10  

/feed?page=2&limit=10 =>11-20

/feed?page=3&limit=10 =>21-30

/feed?page=4&limit=10 =>31-40


/Deploy in AWS 
1- Open window Shell
2- Connect with AWS
3- make clone of backend project 
4- after that goes inside backend project in shell
5-npm i 
6- npm run start => but it will run forsome time after sometime it will break 
7- install pm2 globally  for 24*7 to run 
   npm install pm2 -g
   pm2 start app.js
➡️ Starts your Node.js app with PM2 and keeps it running in background.
pm2 list
➡️ Shows all apps managed by PM2 (name, status, memory, CPU, etc.).
pm2 restart app_name_or_id
➡️ Restarts a specific app by name or ID.

pm2 stop app_name_or_id
Stops the app (but doesn’t delete from PM2 memory).

pm2 delete app_name_or_id
Stops and removes the app from PM2 process list.

pm2 startup
enerates a command — copy-paste it.
It helps PM2 auto-run apps on EC2 restart.

pm2 save
pm2 monit
pm2 logs
pm2 logs app_name
pm2 show app_name
pm2 reload app_name


pm2 kill
➡️ Stops all apps and shuts down PM2 daemon.


Nginx Configration :

Step 1. sudo nano /etc/nginx/sites-available/default

Step 2. server_name 15.207.89.13;

Step 3. Step 2: Edit inside server {} block
location /api/ {
    proxy_pass http://localhost:7777/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

Step 4: Save the file
Press: Ctrl + O → press Enter (to save)

Then: Ctrl + X (to exit nano)
 
 Step 4: Restart NGINX to apply changes
 sudo systemctl restart nginx


   