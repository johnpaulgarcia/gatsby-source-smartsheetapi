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
    `);
  
    const {
      data: {
        smartsheetSheets: { rows: persons }
      }
    } = result;
    // console.log(smartsheetSheets)
  
    // Create a page that lists all Pokémon.
    createPage({
      path: `/persons`,
      component: require.resolve("./src/templates/persons.js"),
      context: {
        persons: persons
      }
    });
  
    // Create a page for each Pokémon.
    persons.forEach(person => {
      createPage({
        path: `/person/${person.id}/`,
        component: require.resolve("./src/templates/person.js"),
        context: {
          cells: person.cells
        }
      });
  
      // Create a page for each ability of the current Pokémon.
    //   pokemon.node.abilities.forEach(ability => {
    //     createPage({
    //       path: `/pokemon/${pokemon.node.name}/ability/${ability.name}/`,
    //       component: require.resolve("./src/templates/ability.js"),
    //       context: {
    //         pokemonId: pokemon.node.id,
    //         abilityId: ability.id
    //       }
    //     });
    //   });
    });
  };