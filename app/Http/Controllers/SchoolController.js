'use strict'

const School = use("App/Model/School")
const Hash = use("Hash")

class SchoolController {

  * index(request, response) {

  }

  * create(request, response) {
    const input = request.only("password" ,"name")
    const school = yield School.create(input)

    response.json(school)
  }

  * login(request, response) {
    const input = request.only('name', 'password')
    try {
      const school = yield School.findBy('name', input.name)
      if (!school) throw new Error("Wrong school name.")

      const verify = yield Hash.verify(input.password, school.password)
      if (!verify) throw new Error("Wrong password!")

      school.access_token = yield request.auth.generate(school)
      response.json(school)
    } catch (e) {
      response.status(401).json({ error: e.message })
    }
  }

  * loginAdmin(request, response) {
    const input = request.only('username', 'password')
    try {
      const admin = yield School.findBy('name', input.username)
      if (!admin) throw new Error("Invalid credentials.")

      const verify = yield Hash.verify(input.password, admin.password)
      if (!verify) throw new Error("Invalid credentials.")

      admin.admin_token = yield request.auth.generate(admin)
      response.json(admin)
    } catch (e) {
      response.status(403).json({ error: e.message })
    }
  }

  * show(request, response) {
    console.log("Logging into toolkit for user: ", request.authUser)
    return response.json(request.authUser) }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}

module.exports = SchoolController
