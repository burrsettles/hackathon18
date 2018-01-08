from flask import Flask, render_template, jsonify

application = Flask(__name__)


@application.route('/')
def index():
    return render_template('frontend.html')

@application.route('/api/load_text')
def load_text():
    return jsonify(
        {
            'text': 'Cindy told Edward to give a gift to Burr.'
        }
    )

if __name__ == '__main__':
    application.run(port=5000)

