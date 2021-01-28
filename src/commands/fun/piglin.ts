import { Command } from '../../command';
import { Message, MessageEmbed } from 'discord.js';

interface Loot {
  name: string;
  image: string;
  quantity: [ min: number, max: number ];
  chance: number;
};

const generateLoot = (loot: Loot): Loot[] => {
  return new Array(loot.chance).fill(loot);
};

const PIGLIN_LOOT_TABLE: Loot[] = [
  ...generateLoot({
    name: 'Soul Speed Enchanted Book',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/55/Enchanted_Book.gif',
    quantity: [ 1, 1 ],
    chance: 5
  }),

  ...generateLoot({
    name: 'Soul Speed Enchanted Iron Boots',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e8/Iron_Boots_%28item%29_JE2_BE2.png',
    quantity: [ 1, 1 ],
    chance: 8
  }),

  ...generateLoot({
    name: 'Splash Potion of Fire Resistance',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/a/ad/Splash_Potion_of_Fire_Resistance_JE1_BE1.png',
    quantity: [ 1, 1 ],
    chance: 8
  }),

  ...generateLoot({
    name: 'Potion of Fire Resistance',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/71/Potion_of_Fire_Resistance_JE2_BE2.png',
    quantity: [ 1, 1 ],
    chance: 8
  }),

  ...generateLoot({
    name: 'Water Bottle',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/78/Water_Bottle_JE1_BE1.png',
    quantity: [ 1, 1 ],
    chance: 10
  }),

  ...generateLoot({
    name: 'Iron Nugget',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ea/Iron_Nugget_JE1_BE1.png',
    quantity: [ 10, 36 ],
    chance: 10
  }),

  ...generateLoot({
    name: 'Ender Pearl',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/f/f6/Ender_Pearl_JE3_BE2.png',
    quantity: [ 2, 4 ],
    chance: 10
  }),

  ...generateLoot({
    name: 'String',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c0/String_JE1_BE1.png',
    quantity: [ 3, 9 ],
    chance: 20
  }),

  ...generateLoot({
    name: 'Nether Quartz',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/64/Nether_Quartz_JE2_BE2.png',
    quantity: [ 5, 12 ],
    chance: 20
  }),

  ...generateLoot({
    name: 'Obsidian',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/9/99/Obsidian_JE3_BE2.png',
    quantity: [ 1, 1 ],
    chance: 40
  }),

  ...generateLoot({
    name: 'Crying Obsidian',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/7f/Crying_Obsidian_JE1_BE1.png',
    quantity: [ 1, 3 ],
    chance: 40
  }),

  ...generateLoot({
    name: 'Fire Charge',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3b/Fire_Charge_JE2_BE2.png',
    quantity: [ 1, 1 ],
    chance: 40
  }),

  ...generateLoot({
    name: 'Leather',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/6d/Leather_JE2_BE2.png',
    quantity: [ 2, 4 ],
    chance: 40
  }),

  ...generateLoot({
    name: 'Soul Sand',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/6d/Soul_Sand_JE2_BE2.png',
    quantity: [ 2, 8 ],
    chance: 40
  }),

  ...generateLoot({
    name: 'Nether Brick',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/4/49/Nether_Brick_JE2_BE2.png',
    quantity: [ 2, 8 ],
    chance: 40
  }),

  ...generateLoot({
    name: 'Spectral Arrow',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/54/Spectral_Arrow_%28item%29_JE2.png',
    quantity: [ 6, 12 ],
    chance: 40
  }),

  ...generateLoot({
    name: 'Gravel',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/9/9d/Gravel_JE5_BE4.png',
    quantity: [ 8, 16 ],
    chance: 40
  }),

  ...generateLoot({
    name: 'Blackstone',
    image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/d/d8/Blackstone_JE1_BE1.png',
    quantity: [ 8, 16 ],
    chance: 40
  })
];

class PiglinCommand extends Command {
  constructor() {
    super('piglin', {
      aliases: [ 'piglin', 'barter' ],
      description: {
        detail: 'Barter with a Piglin!',
        examples: [
          '`piglin` - will trade with a piglin'
        ]
      }
    });
  }

  private generateEmbed(loot: Loot, quantity: number): MessageEmbed {
    const pChance = (loot.chance / PIGLIN_LOOT_TABLE.length * 100).toFixed(3);

    const embed = new MessageEmbed();
    embed.setTitle('Piglin Bartering');
    embed.setDescription(`Traded a gold ingot and got **${quantity}x ${loot.name}**.`);
    embed.setThumbnail(loot.image);
    embed.setFooter(`${loot.chance} in ${PIGLIN_LOOT_TABLE.length} (${pChance}%) chance.`);

    return embed;
  }

  exec(message: Message) {
    const drop = PIGLIN_LOOT_TABLE[Math.floor(Math.random() * PIGLIN_LOOT_TABLE.length)];
    const quantity = Math.floor(Math.random() * (drop.quantity[1] - drop.quantity[0]) + drop.quantity[0]);
    const embed = this.generateEmbed(drop, quantity);
    return this.say(message, embed);
  }
}

export default PiglinCommand;
