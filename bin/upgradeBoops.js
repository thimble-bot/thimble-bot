const Boops = require('../db/models/boops/Boop');
const config = require('../config').db;
const { format } = require('date-fns');
const fs = require('fs');
const path = require('path');

function processUser(boops, user) {
  boops = boops.filter(b => b.sender === user);

  const entries = {};

  for (let i = 0; i < boops.length; i++) {
    if (!(Object.keys(entries).includes(boops[i].receiver))) {
      entries[boops[i].receiver] = 1;
    } else {
      entries[boops[i].receiver]++;
    }
  }

  return {
    entries,
    count: boops.length
  };
}

function processGuild(boops, guild) {
  boops = boops.filter(b => b.guild === guild);

  boops = boops.sort((a, b) => a.sender < b.sender);

  const users = {};

  for (let i = 0; i < boops.length; i++) {
    const output = processUser(boops, boops[i].sender);
    users[boops[i].sender] = output.entries;

    i = i + output.count;
  }

  return {
    users,
    count: boops.length
  };
}

function writeData(entries) {
  let data = `USE ${config.database};\nTRUNCATE boops;\n\n`;
  const queries = [];

  const now = format(Date.now(), 'YYYY-MM-DD HH:mm:ss');

  Object.keys(entries).forEach(guild => {
    Object.keys(entries[guild]).forEach(sender => {
      Object.keys(entries[guild][sender]).forEach((receiver) => {
        const query = `INSERT INTO boops (createdAt, updatedAt, sender, receiver, guild, counts, type)
           VALUES ('${now}', '${now}', '${sender}', '${receiver}', '${guild}', ${entries[guild][sender][receiver]}, 'boop');`;
        queries.push(query);
      });
    });
  });

  data = data + queries.join('\n') + '\n';

  fs.writeFileSync(path.join(__dirname, '..', 'temp', 'boops_upgraded.sql'), data, { encoding: 'utf8' });
}

async function upgrade() {
  const results = {};

  let boops = await Boops.findAll()
    .then(records => {
      return records.map(r => {
        const { createdAt, updatedAt, sender, receiver, guild } = r;

        return {
          createdAt,
          updatedAt,
          sender,
          receiver,
          guild
        };
      });
    });

  boops = boops.sort((a, b) => a.guild < b.guild);

  for (let i = 0; i < boops.length; i++) {
    const output = processGuild(boops, boops[i].guild);
    results[boops[i].guild] = output.users;
    i = i + output.count;
  }

  writeData(results);

  console.log('Done!');
}

upgrade().then(process.exit);
