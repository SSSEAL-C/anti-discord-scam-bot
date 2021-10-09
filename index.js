// Full Code Credit goes to SSSEAL-C and the Discord Scams List from BuildBot
const { default: axios } = require("axios")
const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const { MessageEmbed } = require('discord.js');
const prefix ="ds!"
links = ""
axios.get('https://raw.githubusercontent.com/BuildBot42/discord-scam-links/main/list.txt')
    .then((res) => {
    main=JSON.stringify(res.data)
    links=main.split('\\n')
    })
    .catch((err) => {
        return console.error('ERR:', err)
    })
client.on("ready", () => {
    client.user.setStatus("online")
    client.user.setActivity(`ds!info | Protecting ${client.guilds.cache.size} users!`)
    console.log('Bot Ready!')
    console.log(links.length+" links loaded!")
})
client.on('messageCreate', message => {
    const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
    const command = args.shift().toLowerCase()

    if(command==="help"||command==="info"){

        const botinfo = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(":no_entry_sign: Anti Discord Scam Links")
            .setThumbnail('https://i.imgur.com/kHoTKoT.png')
            .addField(':busts_in_silhouette: Creators', "realsovietseal#0001", true)
            .addField(':keyboard: Github', "https://github.com/SSSEAL-C/anti-discord-scam-bot", true)
            .addField('Scam Link Source', "https://raw.githubusercontent.com/BuildBot42/discord-scam-links/main/list.txt", true)
            .setFooter('Made by SSSEAL-C')
            .setURL('https://github.com/SSSEAL-C/anti-discord-scam-bot')
            .setTimestamp()
        
        message.channel.send({ embeds: [botinfo] });

    }
    links.forEach(function(link){
        if(message.content.includes(link)) {
            message.delete()
            const botinfo = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(":no_entry_sign: Anti Discord Scam Links")
                .setThumbnail('https://i.imgur.com/kHoTKoT.png')
                .setDescription('The user <@'+message.author.id+'> (aka. '+message.author.username+"#"+message.author.discriminator+") ["+message.author.id+"] sent a **Discord Scam Link** and has either been hacked or is a malicious user!")
                .setFooter('Made by SSSEAL-C')
                .setTimestamp()
        
            message.channel.send({ embeds: [botinfo] });
        }
    })

})


client.login("discord token here")
