import * as api from 'api';

export default function clickWord() {
  return function (dispatch) {
    api
      .loadText()
      .then(response => {
        dispatch(
          {
            type: "CLICK_WORD",
            bodyText: response.data['text']
          }
        )
      })
  }
}
