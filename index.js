var twit = require('twit');

require('dotenv').config();

const Bot = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000, // o retorno da requisição é até 1 minuto.
});

function BotInit() {
    // Retweet as hashtags mais recentes
    var query = {
        q: "educação antirracista",
        result_type: "recent",
    };

    Bot.get("search/tweets", query, BotGotLatestTweet); // envia para a API o get da var query.

    function BotGotLatestTweet(error, data, response) {
        if (error) {
            console.log("Bot não conseguiu os últimos tweets");
        } else {
            var id = {
                id: data.statuses[0].id_str,
            };
        }
        Bot.post("statuses/retweet/:id", id, BotRetweet);

        function BotRetweet(error, response) {
            if (error) {
                console.log("Não retweetou" + error);
            } else {
                console.log("Bot retweetou" + id.id);
            }
        }
    }
}
setInterval(BotInit, 1 * 60 * 1000);
BotInit();