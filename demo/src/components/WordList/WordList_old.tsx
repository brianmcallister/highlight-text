import classnames from 'classnames';
import React from 'react';

import './_word-list.scss';

interface Props {
  onChange: (words: string[]) => void;
}

const baseClass = 'word-list';

const WordList = ({ onChange }: Props) => {
  const inputEl = React.useRef<HTMLInputElement>(null);
  const [currentWord, setCurrentWord] = React.useState('');
  const [wordList, setWordList] = React.useState(new Set<string>());
  const saveWord = (event: React.FormEvent) => {
    event.preventDefault();

    if (!currentWord.length) {
      return;
    }

    const newWords = new Set([...Array.from(wordList), currentWord]);

    setWordList(newWords);
    onChange(Array.from(newWords));
    setCurrentWord('');

    if (inputEl.current) {
      // @ts-ignore
      inputEl.current.value = '';
      // @ts-ignore
      inputEl.current.focus();
    }
  };
  const reset = () => {
    setCurrentWord('');

    if (inputEl.current) {
      // @ts-ignore
      inputEl.current.value = '';
      // @ts-ignore
      inputEl.current.focus();
    }
  };
  const cls = classnames(baseClass, {
    [`${baseClass}--has-current-word`]: currentWord,
  });

  return (
    <div className={cls}>
      <div className={`${baseClass}__text-input`}>
        <form onSubmit={saveWord}>
          <label htmlFor="text-input-1">
            Try typing a word from over there&nbsp;&nbsp;
            <span role="img" aria-label="over there">
              👉
            </span>
            <input
              ref={inputEl}
              id="text-input-1"
              placeholder="Try 'dolor'&hellip;"
              onKeyUp={event => {
                // @ts-ignore
                const { value } = event.currentTarget;

                if (value) {
                  onChange(Array.from(new Set([...Array.from(wordList), value])));
                }

                setCurrentWord(value);
              }}
            />
          </label>

          <button type="button" onClick={reset} className={`${baseClass}__text-input-clear`}>
            &times;
          </button>
        </form>
      </div>

      <button
        className={`${baseClass}__save-button`}
        disabled={!currentWord.length}
        onClick={saveWord}
        type="button"
      >
        Save word
      </button>

      <div>
        {Array.from(wordList).map(value => (
          <div key={value}>
            {value}

            <button
              type="button"
              onClick={() => {
                wordList.delete(value);

                setWordList(new Set(wordList));
                onChange(Array.from(new Set([...Array.from(wordList), value])));
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordList;
