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

export function clickWord(edges) {
  return {
    type: "CLICK_WORD",
    edges: edges
  }
}
