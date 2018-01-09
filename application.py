from flask import Flask, render_template, jsonify

application = Flask(__name__)


@application.route('/')
def index():
    return render_template('frontend.html')


@application.route('/api/load_text')
def load_text():
    return jsonify(
        {
            'tokens': ['Edward', 'gave', 'a', 'gift', 'to', 'Burr', '.',
                       'The', 'movie', 'sucked', '.',
                       ''],
            'dependencies': [
                {
                    'type': "SUBJ",
                    'fromToken': 0,
                    'toToken': 1
                },
                {
                    'type': "OBJ",
                    'fromToken': 3,
                    'toToken': 1
                },
                {
                    'type': "OBJ",
                    'fromToken': 5,
                    'toToken': 1
                },
                {
                    'type': "SUBJ",
                    'fromToken': 8,
                    'toToken': 9
                }
            ],
        }
    )

if __name__ == '__main__':
    application.run(port=5000, debug=True)

