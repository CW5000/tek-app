# tek-app
I created this to support my ambitions to become a better-rounded SDET.

running node index.js from the aforementioned file's directory starts the service.
running java -Jar karate-0.9.3.jar <test name>.feature (or whatever) executes the API test suite.
Nightwatch is a horrible piece of junk. I tried to go there with UI test for this, but ended up going with cypress.io. It is so much easier.
if you have a copy of jmeter, you can run \tek-app\srv\tests\bystateabbrev.jmx for a quick server-side performance validation.
In the interests of saving time, I created small sample front-end app outside the scope of a full-blown node project. To run it, you'll navigate to the directory hosting the file 'vue-sample.html' and run http-server (install this as a global node package, if you haven't already done so). This will run the aforementioned app from 'http://localhost:8081/vue-sample.html'. If I'd had more time to devote to learning how to build a proper vue project, I'd have gone about this more properly. 
Once the sample app is up and running in the browser, you'll be able to kick the tires. I'm not a front-end developer, but this part was fun. You'll also be able to run the automated UI tests.
I mentioned earlier I tried automating this using Nightwatch.js. It did not go well. Aside from critical and severe security vulnerabilities due to apparently no one being interested in updating dependencies, the tool itself was very difficult to work with. I eventually abandoned it and tried my luck at Cypress.io. This tool is really, really easy to work with. To run the tests, navigate to the project directory and run 'npm run cypress:open'. Tests will open in a separate, browser-based test runner and everything will be awesome.