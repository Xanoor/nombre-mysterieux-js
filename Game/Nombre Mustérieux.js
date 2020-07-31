const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {


    let number = Math.floor(Math.random() * Math.floor(100))


    message.channel.send('Nombre Mystérieux - Cherche le nombre entre 0 et 100 en suivant les indications ! Credits: https://github.com/Xanoor/nombre-mysterieux-js').then(async m => {



        const filter = m => m.author.id !== client.user.id;
        const collector = await m.channel.createMessageCollector(filter, {
            time: 600000
        });

        collector.on("collect", async collected => {
            if (collected.content.toLowerCase() === "annuler") {
                return collector.stop(`✅ Nombre Mystérieux annulé !`);
            } else {
                let response = await collected.content.trim();
                response = parseInt(response);
                if (isNaN(response)) {
                    return message.channel.send("⚠ Ce n'est pas un nombre !").then(msg => {
                        msg.delete({
                            timeout: 2000
                        })
                    })
                }
                if (response == number) {
                    await collector.stop(
                        `${collected.author.toString()} bravo ! Le nombre était: **${number}**`
                    );
                }
                if (response > number) {
                    message.channel.send("Le nombre est plus petit !")
                }
                if (response < number) {
                    message.channel.send("Le nombre est plus grand !")
                }
            }
        })
        collector.on("end", async(collected, reason) => {
            if (reason && reason !== "time") {
                return message.channel.send(reason);
            } else {
                return message.channel.send(
                    `Personne a remporté le nombre mystérieux, le nombre était: **${number}**`
                );
            }
        });
    })
}

module.exports.cmd = {
    name: 'nbm'
}
