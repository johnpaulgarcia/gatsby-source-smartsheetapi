const axios = require("axios");
const createNodeHelpers = require("gatsby-node-helpers").default;

const get = endpoint => axios.get(`https://api.smartsheet.com/2.0/${endpoint}`, {
    headers: {
        'Authorization': 'Bearer hrd26x6opt9manpkxj16gd02ey'
    }
});

const getSheetData = sheets => 
    Promise.all(
        sheets.map(async id => {
            const { data: sheet } = await get(`sheets/${id}`)
            return sheet
        })
    )

exports.sourceNodes = async ({ actions }) => {
    const { createNode } = actions
    const { createNodeFactory } = createNodeHelpers({
        typePrefix: 'Smartsheet'
    })

    const prepareSheets = createNodeFactory("Sheets");

    const allSheets = await getSheetData(['3940651537590148'])

    const processSheet = sheet => {
        return prepareSheets(sheet)
    }

    allSheets.forEach( sheet => createNode(processSheet(sheet)));
}

