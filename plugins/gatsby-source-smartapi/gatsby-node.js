const axios = require("axios");
const createNodeHelpers = require("gatsby-node-helpers").default;

const get = endpoint => axios.get(`https://api.smartsheet.com/2.0/${endpoint}`, {
    headers: {
        'Authorization': 'Bearer hrd26x6opt9manpkxj16gd02ey'
    }
});

exports.sourceNodes = async ({ actions }, configOptions) => {
    const { sheetId } = configOptions
    const { createNode } = actions
    const { createNodeFactory } = createNodeHelpers({
        typePrefix: 'Smartsheet'
    })

    const prepareSheets = createNodeFactory("Sheets");

    const { data: allSheets } = await get(`sheets/${sheetId}`)
    createNode(prepareSheets(allSheets))
}

