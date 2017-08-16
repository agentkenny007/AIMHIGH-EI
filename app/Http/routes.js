'use strict'

const Route = use('Route')

Route.on('/').render('welcome')

Route.post("/register", "UserController.create")
Route.post("/add-school", "UserController.add").middleware('auth')
Route.post("/show-school", "UserController.login")
Route.get("/school-toolkit", "UserController.show").middleware('auth')

Route.post("/show-admin", "UserController.loginAdmin")
Route.get("/schools", "UserController.schools")
// Route.get("/schools", "UserController.schools").middleware('auth')
