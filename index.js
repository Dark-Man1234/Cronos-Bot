const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "/";

client.login(prossec.env.TOKEN)

client.on("ready", () => {
    console.log("A votre service My Lord");
    client.user.setActivity("servir son maître");
});

client.on('message' , message => {

    if(message.content === "/Qui êtes vous ?"){
        message.reply("Je ne suis qu'un Diable De Majordome au service de mon Maître");
        console.log('Le bot répond à la question');
    }

if(message.content === prefix + "help"){
   var help_embed = new Discord.RichEmbed()
   .setColor("#99FF00")
   .setTitle("Quelle sont vos besoin My Lord")
   .setThumbnail(message.author.avatarURL)
   .setDescription("Je ne suis qu'un Diable De Majordome, que puis-je faire pour vous servir ?")
   .addField("/help", "Affiche les service disponible de mon Maître")
   .addField("/Qui êtes vous ?", "Cronos répond")
   .addField("/statistiques", "Cronos vous envoie vos statistiques !")
   .addField("/info", "Cronos vous montre les informations du serveur !")
   .addField("/help-modération", "Une page de commande de modération vous est ouvert !")
   .setFooter("Menu d'aide - Services")
   message.channel.sendMessage(help_embed);
   console.log("Une personne m'a demander un service")
    }

    if(message.content === prefix + "help-modération"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setTitle("Quelle sont vos ordres My Lord")
        .setThumbnail(message.author.avatarURL)
        .setDescription("Je ne suis qu'un Diable De Majordome, qu'elle est votre ordre ?")
        .addField("/kick", "Kick un utilisateur")
        .addField("/ban", "Ban un utilisateur")
        .addField("/clear", "Supprime une quantité de messages demander")
        .addField("/mute", "Mute une personne")
        .addField("/warn [@utilisateur + raison]", "Averti l'utilisateur indiqué")
        .addField("/seewarns [@utilisateur]", "Dévoile les avertissements d'un utilisateur")
        .addField("/deletewarns [@utilisateur + numéro du warn]", "Révoque un avertissement d'un utilisateur")
        .setFooter("Menu modération - Modération")
   message.channel.sendMessage(help_embed);
   console.log("Un modérateur m'a demander un service")
    }

   if(message.content === prefix + "sondage"){
      if(message.author.id == "427445894737035264"){
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        var embed = new Discord.RichEmbed()
          .setDescription("Sondage")
          .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
          .setColor("0xB40404")
          .setTimestamp()
        message.guild.channels.find("name", "sondage").sendEmbed(embed)
        .then(function (message) {
          message.react("✔")
          message.react("❌")
        }).catch(function() {
        });
        }else{
        return message.reply("Vous n'avez pas la permission !")
        }}
    

    if(message.content === prefix + "info"){
        var info_embed = new Discord.RichEmbed()
        .setColor("#99FF00")
        .setTitle("Voici les informations sur moi et le serveur !")
        .addField(" :robot: Nom :", `${client.user.tag}`, true)
        .addField("Descriminateur du bot :hash:", `#${client.user.discriminator}`)
        .addField("ID :id: ", `${client.user.id}`)
        .addField("Nombre de membres", message.guild.members.size)
        .addField("Nombre de catégories et de salons", message.guild.channels.size)
        .setFooter("Info - Serveur")
        message.channel.sendMessage(info_embed)
        console.log("Une personne demande des informations sur le serveur !")
    }

    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner une personne !")
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Cette personne n'existe pas !")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'est pas la permission pour kick");
        }

        kick.kick().then(member =>{
            message.channel.send(`${member.user.username} est kick par ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner une personne !")
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Cette personne n'existe pas !")
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'est pas la permission pour ban");
        }

        ban.ban().then(member =>{
            message.channel.send(`${member.user.username} est ban par ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission !")

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Tu doit préciser un nombre de messages à supprimer !")
message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`${args[0]} messages ont été supprimés !`);
})
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send(`Vos devez mentionner une personne !`);
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé la personne ou elle n'existe pas !");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'est pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute par ${message.author.username}`);
        
        })
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send(`Vos devez mentionner une personne !`);
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé la personne ou elle n'existe pas !");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'est pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute par ${message.author.username}`);
        
        })
    }

    var fs = require('fs');

let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

if (message.content.startsWith(prefix + "warn")){

if (message.channel.type === "dm") return;

var mentionned = message.mentions.users.first();

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

if(message.mentions.users.size === 0) {

  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");

}else{

    const args = message.content.split(' ').slice(1);

    const mentioned = message.mentions.users.first();

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size != 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {

          if (args.slice(1).length != 0) {

            const date = new Date().toUTCString();

            if (warns[message.guild.id] === undefined)

              warns[message.guild.id] = {};

            if (warns[message.guild.id][mentioned.id] === undefined)

              warns[message.guild.id][mentioned.id] = {};

            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;

            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){

              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};

            } else {

              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),

                time: date,

                user: message.author.id};

            }

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

message.delete();

            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');

message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))

          } else {

            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

          }

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

        }

      } else {

        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }

}



  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {

if (message.channel.type === "dm") return;

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

    const mentioned = message.mentions.users.first();

    const args = message.content.split(' ').slice(1);

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size !== 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {

          try {

            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {

              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");

              return;

            }

          } catch (err) {

            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");

            return;

          }

          let arr = [];

          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");

          for (var warn in warns[message.guild.id][mentioned.id]) {

            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+

            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");

          }

          message.channel.send(arr.join('\n'));

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");

          console.log(args);

        }

      } else {

        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }





  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {

if (message.channel.type === "dm") return;

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

   const mentioned = message.mentions.users.first();

    const args = message.content.split(' ').slice(1);

    const arg2 = Number(args[1]);

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size != 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){

          if (!isNaN(arg2)) {

            if (warns[message.guild.id][mentioned.id] === undefined) {

              message.channel.send(mentioned.tag+" n'a aucun warn");

              return;

            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {

              message.channel.send("**:x: Ce warn n'existe pas**");

              return;

            }

            delete warns[message.guild.id][mentioned.id][arg2];

            var i = 1;

            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){

              var val=warns[message.guild.id][mentioned.id][key];

              delete warns[message.guild.id][mentioned.id][key];

              key = i;

              warns[message.guild.id][mentioned.id][key]=val;

              i++;

            });

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {

              delete warns[message.guild.id][mentioned.id];

            }

            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);

            return;

          } if (args[1] === "tout") {

            delete warns[message.guild.id][mentioned.id];

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);

            return;

          } else {

            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

          }

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

        }

      } else {

       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()){
        case "statistiques":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()

        .setColor("##CCFF00")
        .setTitle(`Statistiques de l'utilisateur : ${message.author.username}`)
        .addField(`ID de l'utilisateur :id:`, msgauthor, true)
        .addField("Date de création de l'utilisateur :", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Tu peux regarder tes messages privés ! Tu viens de recevoir tes statistiques !")
        message.author.send({embed: stats_embed});
        break;
    }

    client.user.setStatus("online");
});

