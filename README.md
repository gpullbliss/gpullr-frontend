# gPullR-frontend
This is the frontend for the pull request tool. It is written with JavaScript using AngularJS. 
It uses the devbliss-grunt-plugin for most of the settings and task definitions.

## Prerequisites
You need node / npm to be installed in your development computer.
Using `npm` you install `bower` and `grunt-cli`: `npm install -g grunt-cli bower`

## Running the project in dev mode
After cloning the project to a local folder, call 

`npm install` (on some machines, this requires admin privileges) and then

`bower install`

Now you may start the auto-refreshing development process with the following command:

`grunt serve`

It will run jshint checks and then open the app in your default browser when ready.

## Configuring the wallboard view

To display all open pull requests on a wallboard monitor, use the wallboard view located under [http://gpullr.devbliss.com/wallboard](http://gpullr.devbliss.com/wallboard).
 
It is also possible to see only pull requests for a list of repositories. List the repository names after the repos parameter delimited by `;` like this:
`http://gpullr.devbliss.com/wallboard?repos=repo1;repo2;repo3`

To show only the repositories standards and docbliss use: [http://gpullr.devbliss.com/wallboard?repos=standards;docbliss](http://gpullr.devbliss.com/wallboard?repos=standards;docbliss).
