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

  * show(request, response) {
    const input = request.only('name', 'password')
    try {
      const school = yield School.findBy('name', input.name)
      if (!school) throw new Error("Wrong school name.")

      const verify = yield Hash.verify(input.password, school.password)
      if (!verify) throw new Error("Wrong password!")

      console.log(request.auth)
      school._token = yield request.auth.generate(school)
      response.json(school)
    } catch (e) {
      response.status(401).json({ error: e.message })
    }
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}

module.exports = SchoolController
