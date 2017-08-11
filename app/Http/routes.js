'use strict'

const Route = use('Route')

Route.on('/').render('welcome')

Route.post("/add-school","SchoolController.create")
Route.post("/show-school","SchoolController.show")
