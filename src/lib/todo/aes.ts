import AES from 'aes-js';

interface EncryptedTodo {
  id: string;
  str: string;
}

const encrypt = (str: string, id: string, createdAt: number) => {
  const ts = createdAt.toString().padEnd(16, '0');
  const key = ts.split('').slice(0, 16).map(c => c.charCodeAt(0));

  str = JSON.stringify({ str, id });

  const byteArray = AES.utils.utf8.toBytes(str);

  // eslint-disable-next-line new-cap
  const counter = new AES.ModeOfOperation.ctr(key, new AES.Counter(4));
  const encrypted = counter.encrypt(byteArray);

  return AES.utils.hex.fromBytes(encrypted);
};

const decrypt = (str: string, id: string, createdAt: number): string | null => {
  const ts = createdAt.toString().padEnd(16, '0');
  const key = ts.split('').slice(0, 16).map(c => c.charCodeAt(0));

  const byteArray = AES.utils.hex.toBytes(str);

  // eslint-disable-next-line new-cap
  const counter = new AES.ModeOfOperation.ctr(key, new AES.Counter(4));
  const decrypted = counter.decrypt(byteArray);

  const output = AES.utils.utf8.fromBytes(decrypted);

  try {
    const json: EncryptedTodo = JSON.parse(output);

    if (json.id !== id) {
      return null;
    }

    return json.str;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export {
  encrypt,
  decrypt
};
