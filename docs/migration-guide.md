# Migration from Thimble Bot v0.1.x

You may have noticed that Thimble Bot now uses Firestore to store its data. This
design decision was made to ensure scalability and data security in the bot. The
old version of the bot used MySQL as a database. If you've used a previous
version and you'd like to migrate, you will have to perform the following steps
to carry over your MySQL data to Firebase.

## 1. Create JSON data dumps

For interactions:

```sql
SELECT JSON_ARRAYAGG(JSON_OBJECT(
  'id', id,
  'sender', sender,
  'receiver', receiver,
  'guild', guild,
  'counts', counts,
  'type', type
)) FROM boops INTO OUTFILE '/var/lib/mysql-files/interactions.json';
```

For interaction optouts:

```sql
SELECT JSON_ARRAYAGG(JSON_OBJECT(
  'id', id,
  'guild', guild, 'user', userId,
  'type', type
)) FROM boop_optouts INTO OUTFILE '/var/lib/mysql-files/interaction_optouts.json';
```

For todos:

```sql
SELECT JSON_ARRAYAGG(JSON_OBJECT(
  'id', id,
  'userId', userId,
  'guildId', guildId,
  'todo', todo,
  'completed', status
)) FROM todos INTO OUTFILE '/var/lib/mysql-files/todos.json';
```

## 2. Copy the dumps into a directory called `old`

Perform these steps in Thimble Bot's directory.

```sh
mkdir -p old
sudo cp -r /var/lib/mysql-files/*.json old
sudo chown -R $USER:$USER old
```

## 3. Run the migration script and pray it works

```sh
npm run build
npm run migrate
```

**AND PLEASE FOR THE LOVE OF EVERYTHING HOLY ONLY RUN THE SCRIPT ONCE.**
