express-sample
================================================================================

Just a simple sample server using express and maybe some other goodies.

Currently the code is instrumented with New Relic.  To set this up, you'll
need to have a New Relic account, and then get a license key for an app
from New Relic.  Once you have this, copy the file
`node_modules/newrelic/lib/config.default.js` to `newrelic.js` in the root
directory, and add your license key.  You probably also want to add an
`app_name` so you can more easily find this server in the New Relic dashboard.

Currently the code uses redis to update a requests counter.  It's expected
you have a redis server running on the same host as the server, at the default
port.
