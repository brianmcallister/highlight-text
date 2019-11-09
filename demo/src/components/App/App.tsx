import faker from 'faker';
import React from 'react';

import HighlightText from '../HighlightText';
import WordList from '../WordList';
import LogoIcon from '../LogoIcon';

import './_app.scss';

interface Msg {
  msg: string;
  avatar: string;
  from: string;
  date: string;
}

const baseClass = 'app';
const TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor tortor at neque ornare blandit quis sed purus. Sed consequat felis ut risus mollis congue. Praesent elementum bibendum odio, a consequat felis lacinia ut. Integer suscipit neque arcu, at blandit lectus placerat ornare. Donec eu facilisis eros, eget hendrerit ex. Vestibulum vitae dictum metus. Morbi a risus vel est eleifend eleifend vel et nulla. Sed tempus nulla a odio rhoncus tincidunt.';
const HTML_TEXT =
  'Nam eu porta nulla. <a href="https://google.com">Google</a> Quisque turpis ligula, euismod a tempus viverra, elementum sit amet metus. Vestibulum quis eleifend enim. Duis efficitur dapibus pulvinar. Phasellus euismod malesuada nisi, quis ullamcorper felis vulputate <a href="https://apple.com">https://apple.com</a> id. Curabitur quis nisl eget ligula suscipit eleifend. In sit amet leo purus. Ut maximus, enim ut sollicitudin finibus, ipsum sapien dictum neque, non hendrerit justo ex et ex.';

const rand = (min: number = 0, max: number = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const TICKERS = [
  'AAPL',
  'AAPL',
  'AAPL',
  'FB',
  'FB',
  'FB',
  'GOOG',
  'GOOG',
  'GOOG',
  'MSFT',
  'SPY',
  'TSLA',
  'VIX',
  'VOO',
  'X',
];

const getMsg = () => {
  const pre = faker.lorem.sentence(rand(1, 5));
  const post = faker.lorem.sentence(rand(1, 3));
  const hasSymbol = Math.random() > 0.4;
  const side = Math.random() > 0.4 ? 'buy' : 'sell';
  const sym = hasSymbol
    ? ` I'd like to ${side} ${TICKERS[rand(0, TICKERS.length)]} @ $${faker.finance.amount()} `
    : ' ';

  return {
    // @ts-ignore
    date: new Date().toLocaleTimeString('en', { timeStyle: 'medium' }),
    msg: `${pre}${sym}${post}`.trim(),
    from: `${faker.name.firstName()} ${faker.name.lastName()}`,
    avatar: faker.internet.avatar(),
  };
};

const INITIAL_MESSAGES = Array.from(Array(15)).map(getMsg);

/**
 * App component.
 */
const App = () => {
  const chatEl = React.useRef<HTMLDivElement>(null);
  const [basicWords, setBasicWords] = React.useState<string[]>([]);
  const [htmlWords, setHtmlWords] = React.useState<string[]>([]);
  const [messages, setMessages] = React.useState<Msg[]>(INITIAL_MESSAGES);

  const div = document.createElement('div');

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.05) {
        return;
      }

      setMessages(messages.concat([getMsg()]).slice(-15));

      const { current } = chatEl;

      if (current) {
        setTimeout(() => {
          current.scrollTop = current.scrollHeight;
        }, 0);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className={baseClass}>
      <header className={`${baseClass}__header`}>
        <LogoIcon />
        <a className={`${baseClass}__header-link`} href="https://www.brianmcallister.com">
          Brian Wm. McAllister
        </a>

        <div className={`${baseClass}__header-links`}>
          <a href="https://github.com/brianmcallister/highlight-text">GitHub</a>
          <a href="https://npmjs.com/package/@brianmcallister/highlight-text">npm</a>
        </div>
      </header>

      <div className={`${baseClass}__content`}>
        <div className={`${baseClass}__lead-in`}>
          <code>highlight-text</code>
          &nbsp;makes highlighting words and characters in a string quick and easy. This library is
          primarily used for adding a visual indicator to any text in a web page, much like the
          default search feature in your browser. This is a great way to highlight search results
          collected from an input field within your application, or a range of possible use cases:
          User configured search terms in a chat application Administrator configured announcements
          Visual design elements By default, the library will accept a string and some sub strings
          to search for. It will return all of the found strings surrounded by &nbsp;
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark">{'<mark>'}</a>
          &nbsp; tags. This is configurable, in case you want to use any arbitrary string.
        </div>

        <div className={`${baseClass}__example`}>
          <div className={`${baseClass}__example-text`}>
            <p className={`${baseClass}__headline`}>Basic text highlighting</p>
            <p className={`${baseClass}__example-content`}>
              This is the simplist way to highlight text content. Add or remove as many words as you
              like from the list, and watch as the text content is immediately highlighted.
            </p>

            <WordList
              label="Try typing a word from over there"
              placeholder="Try 'dolor'&hellip;"
              onChange={newWords => {
                setBasicWords(newWords);
              }}
            />
          </div>

          <div className={`${baseClass}__example-result`}>
            <HighlightText text={TEXT} words={basicWords} />
          </div>
        </div>

        <div className={`${baseClass}__example`}>
          <div className={`${baseClass}__example-text`}>
            <p className={`${baseClass}__headline`}>HTML aware text highlighting</p>
            <p className={`${baseClass}__example-content`}>
              One of the original reasons for creating this library was to highlight words in chat
              messages. Often, chat messages include links or other bits of HTML. Try highlighting
              some words in the links to the right. The links are still clickable, because only the
              content inside the HTML tags is highlighted.
            </p>

            <WordList
              label="Now let's try highlighting link content"
              allowSave={false}
              placeholder="Try 'goog'&hellip;"
              onChange={newWords => {
                setHtmlWords(newWords);
              }}
            />
          </div>

          <div className={`${baseClass}__example-result`}>
            <HighlightText text={HTML_TEXT} words={htmlWords} />
          </div>
        </div>

        <div className={`${baseClass}__chat-example`}>
          <p className={`${baseClass}__chat-headline`}>Realtime chat example</p>

          <div className="browser">
            <header className="browser__header">
              <div className="browser__header-button" />
              <div className="browser__header-button" />
              <div className="browser__header-button" />
            </header>

            <div className="browser__content">
              <div className="browser__saved-terms">
                <p className="browser__saved-headline">Highlighted terms:</p>
                <p>AAPL</p>
                <p>GOOG</p>
                <p>FB</p>
              </div>

              <div className="browser__chat" ref={chatEl}>
                {messages.map(msg => {
                  return (
                    <div key={msg.msg} className="browser__msg">
                      <img className="browser__msg-avatar" alt={msg.from} src={msg.avatar} />

                      <div className="browser__msg-details">
                        <p>
                          <span className="browser__msg-from">{msg.from}</span>
                          <span className="browser__msg-date">{msg.date}</span>
                        </p>

                        <HighlightText text={msg.msg} words={['AAPL', 'FB', 'GOOG']} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
