import * as api from 'api';

export function loadPage() {
  return function (dispatch) {
    api
      .loadText()
      .then(response => {
        dispatch(
          {
            type: "LOAD_PAGE",
            wordJson: response.data
          }
        )
      })
  }
}

export function clickWord(wordIndex, sentenceIndex) {
  return {
    type: "CLICK_WORD",
    wordIndex: wordIndex,
    sentenceIndex: sentenceIndex
  }
}
