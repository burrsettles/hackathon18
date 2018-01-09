const initialState = {
  sentences: []
};

function parseSentence (sentence) {
  sentence = sentence.map((word, index) => {
    return {
      text: word.text,
      index: index,
      pos: word.pos,
      wordType: word.arcs.length > 0 ? 'MAIN' : null,
      edges: word.arcs}
  });
  console.log(sentence)
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
      var sentences = state.sentences
      sentences.forEach(sentence => {
        sentence.forEach(word => {
          if (word['wordType'] != 'MAIN') {
            word['wordType'] = null;
          }
        })
      })
      var sentence = sentences[action.sentenceIndex]
      console.log(sentence)
      sentence[action.wordIndex].edges.forEach(edge => {
        for (var i = edge['span'][0]; i < edge['span'][1]; i++) {
          sentence[i]['wordType'] = edge['type']
        }
      });
      return {
        sentences: sentences
      };
    default: return initialState;
  }
}
