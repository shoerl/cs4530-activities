# Transcript Server (Implemented) - Heroku Deployment

The goal of this activity is to deploy the transcript API server to the Heroku "Platform as a Service" platform. This project includes a fully-implemented version of the transcript API, ready to be deployed to Heroku.

Heroku will detect that this is an NPM project (based on the presence of `package.json`), and will automatically install its dependencies and then run the command `npm start` to run the application. Heroku will then make this application available publicly at the web address of your choice.

## Create a Heroku Account
The first step is to create a Heroku account (if you do not already have one).
Go to [Heroku.com](https://www.heroku.com) and create an account, or sign in if you already have one.

## Create a new Heroku Project
After signing in, create a new app. Choose a name for your app that is somewhat descriptive - it will become part of the URL that you'll use to access the service. Click "Create app" (no need to go through "Add to pipeline...").

## Deploy to Heroku
There are several ways to deploy an application to Heroku. The one that we will follow for this activity is using the Heroku CLI tools. Using this approach, we will create a new git repository for the project, and push that repository to Heroku. A single git repository might have multiple "remote" sites that track it - in practice, you would likely be pushing your code to a place like GitHub in addition to Heroku. For this activity, we'll only be pushing it to Heroku. 

1. Download and install the [Heroku CLI tools](https://devcenter.heroku.com/articles/heroku-command-line). 
2. In a terminal (in the same directory as this README), run the command `heroku login` to login. This will open a web browser and ask you to log in using your Heroku credentials 
3. Create a git repository in this directory, by running `git init`
4. Use the Heroku CLI tools to add the Heroku git remote to the new git repository that you just created, by running the command `heroku git:remote -a appname`, where `appname` is the name that you used when you created the new app on the Heroku website. If you've forgotten, you can also run the command `heroku list` to list all of the applications in your Heroku account
5. Configure the Heroku project by running the command `heroku config:set USE_NPM_INSTALL=true NPM_CONFIG_PRODUCTION=false`. The default behavior of Heroku is to install only the "production" dependencies for NPM projects, and not the "devDependencies". For this project's build scripts, it is necessary to have the devDependencies installed - these settings will tell Heroku to use `npm install` instead of `npm ci`, and to avoid deleting the devDependencies.
6. Create a git commit, adding all of the files in this directory, and then push to heroku:
```
git add .
git commit -a -m "Initial commit"
git push heroku main
```

It may take a few minutes for the app to be deployed, and you should see output on the console as it is making progress. The file [expectedBuildOutput.txt](expectedBuildOutput.txt) contains the expected output.


## Inspect deployed application
Once your app is deployed, it is now publicly available at the address that you chose when creating the app on Heroku. To open it, click the "Open app" button in Heroku, or directly enter the address in your browser. For example, for our app named `transcript-demo`, it is available at  [https://transcript-demo.herokuapp.com](https://transcript-demo.herokuapp.com).

You might notice that the first time that you access the site, it takes a few seconds for it to load (and then repeated requests load much faster). This is because Heroku's free-tier product doesn't run your app continuously, but only starts it once a request is received (and then spins it down after a time of inactivity).

If you see an "Application error" in the browser, examine the logs by running the command `heroku logs`. If you see an error such as "concurently not found", it is likely the result of skipping step 5 above. Repeat step 5, make a minor change to some file to force Heroku to see that there was a "change", make a new commit, and push it again - this should solve it.

You can view the API documentation by appending `/docs` to the URL, such as: [https://transcript-demo.herokuapp.com/docs](https://transcript-demo.herokuapp.com/docs)

To view the log files for your running server, run the command `heroku logs --tail` in this directory.
## Prepare for November: Activate Heroku Student Pack
You may have noticed repeated warnings from Heroku that their free tier is ending in November. Heroku is now providing free credits for students, but you must register for them:
   1. If you have not already, [register for the GitHub student pack](https://education.github.com/pack)
   2. [Signup for Heroku's student/github pack](https://www.heroku.com/github-students/signup)

