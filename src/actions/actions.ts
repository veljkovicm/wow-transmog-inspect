import axios from 'axios';
import config from '../config/config.json';

export const getToken = async (): Promise<string> => {
  const accessToken =  await axios.get(`https://eu.battle.net/oauth/token`, {
    auth: {
      username: config.publicKey,
      password: config.privateKey,
    },
    params: {
      grant_type: 'client_credentials',
    },
  });

  return accessToken.data.access_token;
};


export const getAvatar = async (region: string, realm: string, character: string): Promise<string> => {
  const token: string = await getToken();

  const charMedia = await axios.get(
    `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${character}/character-media`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        namespace: `profile-${region}`,
        locale: 'en_GB',
      }
    }
  );

  return charMedia.data.assets[0].value;
}



export const getCharData = async (region: string, realm: string, character: string) => {
  let guild, guildId, title;

  const token = await getToken();
  console.log(token)
  const charData = await axios.get(
    `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${character}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        namespace: `profile-${region}`,
        locale: 'en_GB',
      }
    }
  );

  // const avatarUrl = await getAvatar(region, realm, character);


  console.log(charData);
  // if(charData.data.guild) {
  //   guild = charData.data.guild.name;
  //   guildId = charData.data.guild.id;
  // }

  // if(charData.data.active_title) {
  //   title = charData.data.active_title.name;
  // }

  // return {
  //   charClass: charData.data.character_class.name,
  //   guildId: guildId,
  //   level: charData.data.level,
  //   // avatar: avatarUrl,
  //   activeSpec: charData.data.active_spec.name,
  //   name: charData.data.name,
  //   realm: charData.data.realm.name,
  //   guild,
  //   title,
  // }
}


