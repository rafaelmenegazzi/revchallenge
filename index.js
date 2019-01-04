// index.js
const _ 		= require('lodash')
const path 		= require('path')
const express 	= require('express')
const exphbs 	= require('express-handlebars')
const bodyParser = require('body-parser');
const mongoConnect 	= require('./mongo-connection.js')
const mongo 		= require('./mongo.js')

const app = express()
const port = 3000
mongoConnect.connect()

//server setup
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())

//home page
app.get('/', (request, response) => {
  response.render('home')
})

//campaign add page
app.get('/campaign/add/', function (request, response) {
  response.render('campaign-add')
})

//campaign add post
app.post('/campaign/add-post', async function (request, response) {
  const campaign = request.body
  console.log(request.body)
  if(_.isEmpty(campaign)){
  	response.send('Invalid campaign data : ' + JSON.stringify(campaign))
  }
  else{
  	const resp = await mongo.saveCampaign(campaign)
  	response.send('Campaign created! ' + resp._id + ' : ' + resp.name)
  }
})

//fetch route
app.get('/fetch', async function (request, response) {
  const fetch = request.query
  if(_.isEmpty(fetch)){
  	response.send('Invalid request')
  }
  else{
  	const resp = await mongo.fetchCampaign(fetch)
  	response.json(resp)
  }
})

//lauch
app.listen(port, () => console.log('Example app listening on port ' + port + '!'))
