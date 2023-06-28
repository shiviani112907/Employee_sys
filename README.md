# Employee_sys
This application has following features with three views

Admin view
Add/remove/update/view employees
Add/update/view performance reviews
Assign employees to participate in another employee's performance review
Employee view
List of performance review requiring feedback 
An employee can register, only admin can make an employee an admin
sign in for admin and user.
also has super user for initialting the application once
Make 1 login for admin and employee
How to setup on local machine
To use this repository your machine should have node, npm, monogodb and git. to check version exicute these.
node --version
npm --version
git --version
Now clone this repository
git clone https://github.com/wizzenalum/employee-review-system.git
Change directory to Ecomerce-API
cd employee-review-system
Install dependencies
npm install --save
Start mongo db this command may differ... system to system.
sudo systemctl start mongod
That's... it run the application
npm start
To test all the routes you can utilize rest-client.
i assume your system has vs-code and rest-client preinstalled
this api already contain one file called route-testing which has all the routes that it support.
you just have to click on send request only.
remember to change the id for different delte and update.
File structure
here you are looking at directory structure with root level files only.

employee-review-system
├── assets
│   ├── images
│   ├── scripts
│   ├── scss
│   └── styles
├── node-modules
├── configs
├── controllers
├── index.js
├── models
├── package-lock.json
├── package.json
├── readme.md
├── routers
└── views
    ├── authentication
    └── partials

