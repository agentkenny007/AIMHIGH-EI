'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', table => {
      table.increments()
      table.string('name', 150).notNullable().unique()
      table.string('password', 60).notNullable()
      table.boolean('admin').defaultTo(false)
      table.string('passcode', 60)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
