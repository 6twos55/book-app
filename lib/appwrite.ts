import { Client, Account, Avatars, Databases } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('686d40290009184e8ed3');

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export { client, account, avatars, databases };