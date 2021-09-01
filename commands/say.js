const cc = require("../bot.js").cc;
const tools = require("../tools/tools.js")
module.exports = {
    name: "say",
    ping: false,
    execute: async (channel, user, input, perm) => {
        try {
            input = input.splice(2)
            let msg = input.toString().replaceAll(',', ' ')

            if (channel === "forsen") {
                channel = "botbear1110"
            }

            if (perm < 2000 && msg.match(/^[$|/|.|?|!|-]|\bkb\b/g)) { // ignores $, kb, /, ., ?, !, - bot prefixes (. and / are twitch reserved prefixes)  
                return;
            }
            if (perm < 1500 && channel !== "nymn") {
                return;
            }
            const masspinged = await tools.massping(msg.toLowerCase())

            if (masspinged != "null") {
                return "[MASS PING]"
            }

            return msg;
        } catch (err) {
            console.log(err);
            return ` Error FeelsBadMan `;
        }
    }
}