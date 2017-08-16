'use strict'

const Schema = use('Schema')

class AddSchoolAdminColumnTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.boolean('admin')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('admin')
    })
  }

}

module.exports = AddSchoolAdminColumnTableSchema
