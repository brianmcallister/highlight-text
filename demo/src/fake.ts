/**
 * Just enough fake data for the chat example.
 */

const FIRST_NAMES = [
  'Ada', 'Amara', 'Ben', 'Carlos', 'Dana', 'Elena', 'Femi', 'Grace', 'Hiro', 'Ines', 'Jonah',
  'Kai', 'Leila', 'Marco', 'Nadia', 'Omar', 'Priya', 'Quinn', 'Rosa', 'Sam', 'Tomás', 'Uma',
  'Victor', 'Wren', 'Yusuf', 'Zoe',
];

const LAST_NAMES = [
  'Abbott', 'Becker', 'Chen', 'Diaz', 'Eriksen', 'Fischer', 'Garcia', 'Haddad', 'Ito', 'Jensen',
  'Kowalski', 'Lopez', 'Moreau', 'Novak', 'Okafor', 'Patel', 'Rossi', 'Sato', 'Tanaka', 'Usman',
  'Varga', 'Walsh', 'Young', 'Zhang',
];

const WORDS = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
  'labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris ' +
  'nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse ' +
  'cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui ' +
  'officia deserunt mollit anim id est laborum'
).split(' ');

/** A random integer from `min` up to, but not including, `max`. */
export const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

/** A random item from `list`. */
export const pick = <T>(list: readonly T[]): T => list[rand(0, list.length)]!;

export const firstName = () => pick(FIRST_NAMES);

export const lastName = () => pick(LAST_NAMES);

/** A sentence of about `wordCount` words, capitalized and ending with a period. */
export const sentence = (wordCount: number) => {
  const words = Array.from({ length: Math.max(wordCount + rand(0, 4), 2) }, () => pick(WORDS));
  const text = words.join(' ');

  return `${text[0]!.toUpperCase()}${text.slice(1)}.`;
};

/** A price, like '412.07'. */
export const amount = () => (Math.random() * 1000).toFixed(2);
