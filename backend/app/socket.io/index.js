const conn = require("../..")


const channel = async (io) => {
        io.on('connect', async () => {
                console.log("connecting")
        })

}

module.exports = { channel } 