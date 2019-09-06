exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
  query MyQuery {
      smartsheetSheets {
        rows {
          cells {
            columnId
            displayValue
          }
          id
        }
      }
    }
  `)

  const {
    data: {
      smartsheetSheets: { rows: persons }
    }
  } = result

  createPage({
    path: `/persons`,
    component: require.resolve("./src/templates/persons.js"),
    context: {
      persons: persons
    }
  })

  persons.forEach(person => {
    createPage({
      path: `/person/${person.id}/`,
      component: require.resolve("./src/templates/person.js"),
      context: {
        cells: person.cells
      }
    })
  })
}