var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://bzone-server.local/api/v2"',
  FB_APP_ID: '"1637966656508513"',
  GOOGLE_MAP_KEY: '"AIzaSyC4Lr23cLmL1FNhKbVZepiG6MsXcwNPvVA"',
  DOMAIN: '"http://bzone.local/"',
  MIXPANEL_PROJECT_TOKEN: '"3520d09f4365e0cf75b2f1ecde1c5f46"'
})
