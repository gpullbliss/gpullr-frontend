# gPullR frontend
The purpose of gPullR is to provide a handy tool for visualization and organization of pull requests and the process of code review. This project provides the frontend and its underlying view logic. It provides two different views for pull requests that are open or currently in review. The frontend consumes a RESTful interface for information exchange with the [gPullR backend](https://github.com/devbliss/gpullr-backend/blob/master/README.md).

![components](/docs/components.png)

-  [Getting started] (#getting-started)
  -  [Technology stack] (#technology-stack)
  -  [How to run it locally] (#how-to-run-it-locally)
  -  [Deployment] (#deployment)
  -  [Server provisioning] (#server-provisioning)
-  [Using the application] (#using-the-application)
  -  [GitHub OAuth login] (#github-oauth-login)
  -  [Configuring the wallboard view] (#configuring-the-wallboard-view)
-  [Technologies] (#technologies)

## Getting started
### Technology stack
The following technologies needs to be installed before you can start running the application:

  * [npm](https://www.npmjs.com/)
  * [bower](http://bower.io/)

### How to run it locally
After you cloned the application `git clone https://github.com/devbliss/gpullr-frontend.git && cd gpullr-frontend` you need to download and install all dependencies.

To setup the application initially, download an install all dependencies, type
```
npm install (on some machines, this requires admin privileges)
bower install
```

Start the [gPullR backend](https://github.com/devbliss/gpullr-backend/blob/master/README.md#how-to-run-it-locally), locally. It's not possible to make use of deployed [live backend](http://gpullr.devbliss.com) with your local started frontend, because the GitHub OAuth login won't work.

Now you may start the auto-refreshing development process with the following command:
`grunt serve`
Your default browser will load `http://localhost:8889/' and open the application when ready.

To build the application, type
`grunt build`

To test the application, type
`grunt test`

### Deployment
Deploying gPullR frontend is achieved by a [jenkins job](http://jenkins.devbliss.com/view/gPullR/job/gPullR-frontend-build/), which executes `grunt build` and copies all relevant stuff from the `dist` directory to the [live system](http://gpullr.devbliss.com/).

### Server provisioning
The Server which hosts the whole application is provisioned with puppet, hosted by [bingo-puppet](https://github.com/devbliss/bingo-puppet/tree/master/modules/gpullr) on a machine provided by [Bingo](http://staging.bingo.devbliss.com/instances).

Nginx is used to deliver the gPullR frontend and you can also find the nginx configuration within the [puppet files](https://github.com/devbliss/bingo-puppet/blob/master/modules/gpullr/files/gpullr_nginx_conf.erb).

## Using the application
### GitHub OAuth login
The only possible way to log into the application is to use your GitHub account with OAuth. GitHub will ask you to accept the gPullR permission access. If you do so and your GitHub account pass [some extra checks done at the gPullR backend](https://github.com/devbliss/gpullr-backend/blob/master/README.md#using-the-application), you're logged in and ready to use the application.

### Configuring the wallboard view
To display all open pull requests on a wallboard monitor, use the wallboard view located under [http://gpullr.devbliss.com/wallboard](http://gpullr.devbliss.com/wallboard).
You don't have to be logged in for that feature.
 
It is also possible to see only pull requests for a list of repositories. List the repository names after the repos parameter delimited by `;` like this:
`http://gpullr.devbliss.com/wallboard?repos=repo1;repo2;repo3`

To show only the repositories standards and docbliss use e.g.: [http://gpullr.devbliss.com/wallboard?repos=standards;docbliss](http://gpullr.devbliss.com/wallboard?repos=standards;docbliss).

# Technologies
The project depends on the following key technologies:

* [AngularJs] (https://angularjs.org/)
* [npm] (https://www.npmjs.com/)
* [Bower] (http://bower.io/)
* [Grunt] (http://gruntjs.com/)
