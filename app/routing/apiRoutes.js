

const friends = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });


    app.post("/api/friends", function (req, res) {

        const user = req.body;

        for (let i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }

        const index = 0;
        const minDifference = 50;

        for (let i = 0; i < friends.length; i++) {
            const totalDifference = 0;
            for (let j = 0; j < friends[i].scores.length; j++) {
                let difference = Math.abs(user.scores[j] - friends[i].scores[j]);
                totalDifference += difference;
            }

            if (totalDifference < minDifference) {
                index = i;
                minDifference = totalDifference;
            }
        }

        friends.push(user);

        res.json(friends[index]);
    });
}