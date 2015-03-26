# gPullR-frontend
This is the frontend for the pull request tool. It is written with JavaScript using AngularJS. 
It uses the devbliss-grunt-plugin for most of the settings and task definitions.

## Prerequisites
You need node / npm to be installed in your development computer.
Using `npm` you install `bower` and `grunt-cli`: `npm install -g grunt-cli bower`

## Running the project in dev mode
After cloning the project to a local folder, switch to gpullr-frontend directory and call 

`npm install` (on some machines, this requires admin privileges) and then

`bower install`

Now you may start the auto-refreshing development process with the following command:

`grunt serve`

It will run jshint checks and then open the app in your default browser when ready.
You have to choose a User to login from the dropdown, otherwise you can't assign any pullrequests to you,
or filter pullrequest belonging to your project specific needs or interests.

Ensure to have the [gpullr-backend](https://github.com/devbliss/gpullr-backend) running locally, when using the default configuration of the Gruntfile.js.
Optional you can use the already deployed live-backend by adapting the `host` of the `proxies` in the `grunt.initConfig` of the Gruntfile.js´as follows:

    proxies: [{
          context: '/api',
          host: 'gpullr.devbliss.com',
          port: 8888,
          rewrite: {
              '^/api': ''
          }
    }]

## Configuring the wallboard view

To display all open pull requests on a wallboard monitor, use the wallboard view located under [http://gpullr.devbliss.com/wallboard](http://gpullr.devbliss.com/wallboard).
You don't have to be logged in for that feature.
 
It is also possible to see only pull requests for a list of repositories. List the repository names after the repos parameter delimited by `;` like this:
`http://gpullr.devbliss.com/wallboard?repos=repo1;repo2;repo3`

To show only the repositories standards and docbliss use e.g.: [http://gpullr.devbliss.com/wallboard?repos=standards;docbliss](http://gpullr.devbliss.com/wallboard?repos=standards;docbliss).

## Deployment

Deploying gpullr-frontend is achieved by a jenkins job, which executes `grunt build` and copies all relevant stuff from the `dist` directory to the server.

The Server which hosts the whole application is provisioned with puppet, hosted by [bingo-puppet](https://github.com/devbliss/bingo-puppet/tree/master/modules/gpullr) on a machine provided by [Bingo](http://staging.bingo.devbliss.com/instances).

Nginx is used to deliver the gpullr-frontend and you can also find the nginx configuration within the [puppet files](https://github.com/devbliss/bingo-puppet/blob/master/modules/gpullr/files/gpullr_nginx_conf.erb).


