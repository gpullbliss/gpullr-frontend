# gPullR frontend
The purpose of gPullR is to provide a handy tool for visualization and organization of pull requests and the process of code review. This project provides the frontend and its underlying view logic. It provides two different views for pull requests that are open or currently in review. The frontend consumes a RESTful API for information exchange with the backend.

This is the frontend for the pull request tool. It is written with JavaScript using AngularJS. 

![components](/docs/components.png)

## Getting started
### Technology stack
The following technologies needs to be installed before you can start running the application:

  * [npm](https://www.npmjs.com/)
  * [bower](http://bower.io/)

### How to run it locally
After you cloned the application `git clone https://github.com/devbliss/gpullr-frontend.git && cd gpullr-frontend` the application is ready.

To setup the application initially and download all dependencies, type
```
npm install (on some machines, this requires admin privileges)
bower install
```

Now you may start the auto-refreshing development process with the following command:

`grunt serve`


It will run jshint checks and then open the app in your default browser when ready.
You have to choose a User to login from the dropdown, otherwise you can't assign any pullrequests to you,
or filter pullrequest belonging to your project specific needs or interests.

Ensure to have the [gPullR backend][gpullr-backend] running locally, when using the default configuration of the Gruntfile.js.
Optional you can use the already deployed live-backend by adapting the `host` of the `proxies` in the `grunt.initConfig` of the Gruntfile.js´as follows:

    proxies: [{
          context: '/api',
          host: 'gpullr.devbliss.com',
          port: 8888,
          rewrite: {
              '^/api': ''
          }
    }]

### How to add features

TODO

### Deployment

Deploying gPullR frontend is achieved by a jenkins job, which executes `grunt build` and copies all relevant stuff from the `dist` directory to the server.

The Server which hosts the whole application is provisioned with puppet, hosted by [bingo-puppet](https://github.com/devbliss/bingo-puppet/tree/master/modules/gpullr) on a machine provided by [Bingo](http://staging.bingo.devbliss.com/instances).

Nginx is used to deliver the gPullR frontend and you can also find the nginx configuration within the [puppet files](https://github.com/devbliss/bingo-puppet/blob/master/modules/gpullr/files/gpullr_nginx_conf.erb).


## Using the application
### Configuring the wallboard view

To display all open pull requests on a wallboard monitor, use the wallboard view located under [http://gpullr.devbliss.com/wallboard](http://gpullr.devbliss.com/wallboard).
You don't have to be logged in for that feature.
 
It is also possible to see only pull requests for a list of repositories. List the repository names after the repos parameter delimited by `;` like this:
`http://gpullr.devbliss.com/wallboard?repos=repo1;repo2;repo3`

To show only the repositories standards and docbliss use e.g.: [http://gpullr.devbliss.com/wallboard?repos=standards;docbliss](http://gpullr.devbliss.com/wallboard?repos=standards;docbliss).

[gpullr-backend]: https://github.com/devbliss/gpullr-backend/        "gPullR backend"
