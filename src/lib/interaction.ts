import { Message, Guild } from 'discord.js';
import findIndex from 'lodash.findindex';

import {
  InteractionOptout,
  InteractionOptoutType,
  InteractionOptoutSnapshot
} from '../models/InteractionOptout';

import {
  Interaction,
  IInteraction,
  InteractionType,
  InteractionSnapshot
} from '../models/Interaction';

interface LeaderboardEntry {
  id: string;
  count: number;
}

interface InteractionLeaderboard {
  receivers: string[];
  senders: string[];
}

const toggleInteractable = async (user: string, guild: string, type: InteractionOptoutType): Promise<boolean> => {
  const currentState = await InteractionOptout.findOne({ user, guild, type });

  if (currentState) {
    await InteractionOptout.destroy(currentState.id);
    return true;
  }

  const newState = new InteractionOptout({ user, guild, type });
  await newState.create();

  return false;
};

const getOptouts = async (user: string, guild: string): Promise<InteractionOptoutSnapshot[]> => {
  return InteractionOptout.findAll({ user, guild });
};

const interact = async (opts: IInteraction): Promise<number> => {
  const currentSnapshot = await Interaction.findOne(opts);

  if (!currentSnapshot) {
    const newInteraction = new Interaction(opts);
    await newInteraction.create();
    return 1;
  }

  const data = currentSnapshot.data();
  const counts = data.counts ? data.counts + 1 : 1;

  await Interaction.update(currentSnapshot.id, {
    ...data,
    counts
  });

  return counts;
};

const getGuildInteractions = (guild: string, type: InteractionType): Promise<InteractionSnapshot[]> => {
  return Interaction.findAll({ guild, type });
};

const countMemberInteractions = async (guild: string, receiver: string, type: InteractionType): Promise<number> => {
  const interactions = await Interaction.findAll({ guild, receiver, type });
  let counter = 0;

  for (const interaction of interactions) {
    const data = interaction.data();
    counter += data.counts as number;
  }

  return counter;
};

const getInteractionsForMember = async (guild: string, receiver: string, type: InteractionType): Promise<InteractionSnapshot[]> => {
  return Interaction.findAll({
    guild,
    receiver,
    type
  }, '-counts', 10);
};

const getMemberInteractions = async (guild: string, sender: string, type: InteractionType): Promise<InteractionSnapshot[]> => {
  return Interaction.findAll({
    guild,
    sender,
    type
  }, '-counts', 10);
};

const mapLeaderboardMembers = (guild: Guild, arr: LeaderboardEntry[]): string[] => {
  return arr.map((member, idx) => {
    const memberData = guild.members.cache.find(m => m.id === member.id);

    if (memberData) {
      return `${idx + 1}. ${memberData.user.username} (${member.count})`;
    } else {
      return `${idx + 1}. ??? (${member.count})`;
    }
  });
};

const generateLeaderboard = (
  message: Message,
  interactions: InteractionSnapshot[],
  ignore?: { ignoreSenders?: boolean, ignoreReceivers?: boolean }
): InteractionLeaderboard => {
  const receivers: LeaderboardEntry[] = [];
  const senders: LeaderboardEntry[] = [];

  interactions.forEach(interaction => {
    const data = interaction.data();

    const receiverIdx = ignore?.ignoreReceivers
      ? -1
      : findIndex(receivers, e => e.id === data.receiver);

    const senderIdx = ignore?.ignoreSenders
      ? -1
      : findIndex(senders, e => e.id === data.sender);

    if (!ignore?.ignoreReceivers) {
      if (receiverIdx === -1) {
        receivers.push({ id: data.receiver, count: data.counts || 0 });
      } else {
        receivers[receiverIdx].count += data.counts || 0;
      }
    }

    if (!ignore?.ignoreSenders) {
      if (senderIdx === -1) {
        senders.push({ id: data.sender, count: data.counts || 0 });
      } else {
        senders[senderIdx].count += data.counts || 0;
      }
    }
  });

  receivers.sort((a, b) => b.count - a.count);
  senders.sort((a, b) => b.count - a.count);

  const guild = message.guild as Guild;

  return {
    receivers: ignore?.ignoreReceivers ? [] : mapLeaderboardMembers(guild, receivers.slice(0, 10)),
    senders: ignore?.ignoreSenders ? [] : mapLeaderboardMembers(guild, senders.slice(0, 10))
  };
};

export {
  toggleInteractable,
  getOptouts,
  interact,
  getGuildInteractions,
  countMemberInteractions,
  getInteractionsForMember,
  getMemberInteractions,
  generateLeaderboard
};
