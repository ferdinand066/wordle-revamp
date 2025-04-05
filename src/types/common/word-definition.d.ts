type WordPhonetic = {
  text: string;
  audio: string;
};

type WordDefinition = {
  definition?: string;
  example?: string;
};

type WordMeaning = {
  partOfSpeech?: string;
  definitions?: WordDefinition[];
};

type WordDefinitionProps = {
  word: string;
  phonetic?: string;
  phonetics?: WordPhonetic[];
  meanings?: WordMeaning[];
};
