# gPullR-frontend
This is the frontend for the Pullrequest-Tool. It is written with JavaScript using AngularJS. 
It uses the devbliss-grunt-plugin for most of the settings and task definitions.

## Prerequisites
You need node / npm to be installed in your development computer.
Using `npm` you install `bower` and `grunt-cli`: `npm install -g grunt-cli bower`

## Running the project in devmode
After cloning the project to a local folder, call 

`npm install` (on some machines, this requires admin privileges) and then

`bower install`

Now you may start the auto-refreshing development process with the following command:

`grunt serve`

It will run jshint checks and then open the app in your default browser when ready.

