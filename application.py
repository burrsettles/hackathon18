from flask import Flask, render_template, jsonify, request
from parse import text2chunks

application = Flask(__name__)


@application.route('/')
def index():
    return render_template('frontend.html')


@application.route('/api/post_text', methods=['POST'])
def post_text():
    body = request.get_json(force=True)

    language = body.get('language')
    text = body.get('text')
    return jsonify(text2chunks(text, language))
    # return jsonify(
    #     {
    #         'results': [[
    #             {'text': language, 'arcs': []},
    #             {'text': text, 'arcs': []}
    #         ]]
    #     }
    # )


@application.route('/api/load_text', methods=['GET'])
def load_text():
    return jsonify(
        {
            'results': [
                [
                    {
                        'text': 'Edward',
                        'arcs': []
                    },
                    {
                        'text': 'gave',
                        'arcs': [
                            {
                                'type': "SUBJ",
                                'span': [0, 1]
                            },
                            {
                                'type': "OBJ",
                                'span': [3, 6]
                            },
                        ]
                    },
                    {
                        'text': 'a',
                        'arcs': []
                    },
                    {
                        'text': 'gift',
                        'arcs': []
                    },
                    {
                        'text': 'to',
                        'arcs': []
                    },
                    {
                        'text': 'Burr',
                        'arcs': []
                    },
                    {
                        'text': '.',
                        'arcs': []
                    },
                ],
                [
                    {
                        'text': 'This',
                        'arcs': []
                    },
                    {
                        'text': 'movie',
                        'arcs': []
                    },
                    {
                        'text': 'sucked',
                        'arcs': [
                            {
                                'type': "SUBJ",
                                'span': [1, 2]
                            },
                        ]
                    }
                ],
            ]
        }
    )


if __name__ == '__main__':
    application.run(port=5000, debug=True)
