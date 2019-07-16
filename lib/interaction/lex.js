const lex = {
  boop: {
    name: 'boop',
    thirdPerson: 'boops',
    past: 'booped {{receiver}}',
    pastBot: 'booped you',
    boopBot: 'Don\'t boop me, silly! :flushed:',
    boopSelf: 'Naww, don\'t boop yourself!',
    boopCountBot: 'I cannot be booped, remember? :stuck_out_tongue:',
    countStart: 'has been booped a total of',
    countEnd: 'times'
  },
  hug: {
    name: 'hug',
    thirdPerson: 'hugs',
    past: 'hugged {{receiver}}',
    pastBot: 'hugged you',
    boopBot: '\\*hugs back tightly* ;w;',
    boopSelf: 'Naww, don\'t hug yourself!',
    boopCountBot: 'I shall receive all the hugs!! :smiling_imp:',
    countStart: 'has been hugged a total of',
    countEnd: 'times'
  },
  highfive: {
    name: 'highfive',
    thirdPerson: 'highfives',
    past: 'gave {{receiver}} a highfive',
    pastBot: 'gave you a highfive',
    boopBot: '\\*highfive!!!!!!!* :sunglasses:',
    boopSelf: 'Wait... how does that even work...?',
    boopCountBot: 'I am too cool to keep track of the highfives I\'m getting :stuck_out_tongue:',
    countStart: 'has received a total of',
    countEnd: 'highfives'
  }
};

const parse = (str, map) => {
  Object.keys(map).forEach(item => {
    str = str.replace(`{{${item}}}`, map[item]);
  });

  return str;
};

module.exports = {
  lex,
  parse
};
