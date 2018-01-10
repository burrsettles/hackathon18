const initialState = {
  sentences: [],
  sentenceInFocusIndex: null
};

function parseSentence (sentence) {
  console.log(sentence['tokens'])
  sentence = sentence['tokens'].map((word, index) => {
    var arcs = word.arcs ? word.arcs : []
    return {
      text: word.text,
      index: index,
      pos: word.pos,
      wordType: arcs.length > 0 ? 'MAIN' : null,
      edges: arcs}
  });
  return sentence
}

export default (state=initialState, action) => {
  switch (action.type) {
    case "LOAD_PAGE":
      if (action.wordJson) {
        var sentences = []
        action.wordJson['results'].forEach(sentence => {
          sentences.push(parseSentence(sentence))
        });
        return {
          sentences: sentences
        }
      }
      else {
          return initialState
      }
      break;
    case "CLICK_WORD":
      var sentences = state.sentences;
      sentences.forEach(sentence => {
        sentence.forEach(word => {
          if (word['wordType'] != 'MAIN') {
            word['wordType'] = null;
          }
        })
      })
      var sentence = sentences[action.sentenceIndex];
      sentence[action.wordIndex].edges.forEach(edge => {
        for (let i = edge['span'][0]; i < edge['span'][1]; i++) {
          sentence[i]['wordType'] = edge['type']
        }
      });
      return {
        sentences: sentences,
        sentenceInFocusIndex: action.sentenceIndex
      };
    case "FOCUS_SENTENCE":
      return {
        sentences: state.sentences,
        sentenceInFocusIndex: action.sentenceIndex
      }
    default: return initialState;
  }
}
