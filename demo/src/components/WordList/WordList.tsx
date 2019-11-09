import classnames from 'classnames';
import React from 'react';

import './_word-list.scss';

interface Props {
  allowSave?: boolean;
  label?: string;
  onChange: (words: string[]) => void;
  placeholder?: string;
}

const baseClass = 'word-list';

const unique = (base: string[], value?: string) => {
  return [...new Set(base.concat(value || []))].filter(Boolean);
};

const remove = (arr: string[], value?: string) => {
  if (!value) {
    return arr;
  }

  const set = new Set(arr);

  set.delete(value);

  return [...new Set(set)];
};

const WordList = ({ allowSave = true, placeholder, label, onChange }: Props) => {
  const inputEl = React.useRef<HTMLInputElement>(null);
  const [words, setWords] = React.useState<string[]>([]);
  const [currentWord, setCurrentWord] = React.useState<string>('');
  const reset = () => {
    setCurrentWord('');

    if (inputEl.current) {
      inputEl.current.value = '';
      inputEl.current.focus();
    }
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!allowSave) {
      return;
    }

    if (inputEl.current) {
      const { value } = inputEl.current;

      setWords(unique(words, value));
      setCurrentWord('');

      inputEl.current.value = '';
    }
  };
  const cls = classnames(baseClass, {
    [`${baseClass}--has-input`]: currentWord.length,
  });

  React.useEffect(() => {
    onChange(unique(words, currentWord));
  }, [words, currentWord]);

  return (
    <div className={cls}>
      <form onSubmit={onSubmit}>
        {label && <label htmlFor="input-1">{label}</label>}

        <div className={`${baseClass}__input-wrap`}>
          <input
            className={`${baseClass}__input`}
            id="input-1"
            ref={inputEl}
            placeholder={placeholder}
            onKeyUp={event => setCurrentWord(event.currentTarget.value)}
            type="text"
          />

          <button onClick={reset} className={`button ${baseClass}__clear-text`} type="button">
            &times;
          </button>
        </div>

        {allowSave && (
          <button className="button" type="submit">
            Save word
          </button>
        )}
      </form>

      <div className={`${baseClass}__tags`}>
        {words.map(word => (
          <div key={word} className={`${baseClass}__tag`}>
            {word}

            <button
              className="button"
              type="button"
              onClick={() => {
                setWords(remove(words, word));
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
