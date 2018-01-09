const initialState = {
  words: []
};

export default (state=initialState, action) => {
  switch (action.type) {
    case "LOAD_PAGE":
      if (action.wordJson) {
          var words = action.wordJson['tokens'].map((word, index) => {
            return {
              text: word,
              index: index,
              edges: []}
          });

          action.wordJson['dependencies'].forEach(dependency => {
            var rootWord = words[dependency['toToken']];
            rootWord['wordType'] = 'ROOT';
            rootWord['edges'].push({
              'toToken': dependency['toToken'],
              'fromToken': dependency['fromToken'],
              'edgeType': dependency['type']
            });
          });

          return {
            words: words
          }
        }
      else {
          return initialState
      }
      break;
    case "CLICK_WORD":
      var words = state.words.map(word => {
        if (word['wordType'] != 'ROOT') {
          word['wordType'] = null;
        }
        return word
      });
      action.edges.forEach(edge => {
        words[edge['fromToken']]['wordType'] = edge['edgeType']
      });
      return {
        words: words
      };
    default: return initialState;
  }
}
