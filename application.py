from flask import Flask, render_template, jsonify, request

application = Flask(__name__)


@application.route('/')
def index():
    return render_template('frontend.html')


@application.route('/api/post_text', methods=['POST'])
def post_text():
    body = request.get_json(force=True)

    language = body.get('language')
    text = body.get('text')
    return jsonify(
        {
            'results': [[
                {'text': language, 'arcs': []},
                {'text': text, 'arcs': []}
            ]]
        }
    )


@application.route('/api/load_text', methods=['GET'])
def load_text():
    return jsonify(
        {'results':
            [{"tokens": [{"text": "You "}, {"text": "know ", "arcs": [{"span": [0, 1], "type": "SUBJ"},
                                                                  {"span": [2, 8], "type": "COMP"},
                                                                  {"span": [5, 6],
                                                                   "type": "COMP_MAIN"}]},
                     {"text": "what "}, {"text": "I"}, {"text": "'m "}, {"text": "trying "},
                     {"text": "to "}, {"text": "say"}, {"text": "? "}]}, {
             "tokens": [{"text": "This "}, {"text": "is "}, {"text": "giving ", "arcs": []},
                        {"text": "me "}, {"text": "a "}, {"text": "headache"}, {"text": ". "}]}, {
             "tokens": [{"text": "That "}, {"text": "you "}, {"text": "are "},
                        {"text": "struggling ", "arcs": []}, {"text": "troubles "}, {"text": "me"},
                        {"text": ". "}]}, {
             "tokens": [{"text": "Luis "}, {"text": "is ", "arcs": []}, {"text": "the "},
                        {"text": "CEO"}, {"text": ". "}]}, {
             "tokens": [{"text": "He "}, {"text": "looks ", "arcs": []}, {"text": "sick"},
                        {"text": ". "}]}, {
             "tokens": [{"text": "He "}, {"text": "is ", "arcs": []}, {"text": "in "},
                        {"text": "the "}, {"text": "bathroom"}, {"text": ". "}]}, {
             "tokens": [{"text": "Happiness "}, {"text": "is "}, {"text": "having ", "arcs": []},
                        {"text": "low "}, {"text": "expectations"}, {"text": ". "}]}, {
             "tokens": [{"text": "Joe "}, {"text": "and "}, {"text": "Mary "},
                        {"text": "are ", "arcs": []}, {"text": "people"}, {"text": ". "}]}, {
             "tokens": [{"text": "Cindy "}, {"text": "used ", "arcs": []}, {"text": "email "},
                        {"text": "to "}, {"text": "tell "}, {"text": "Edward "}, {"text": "to "},
                        {"text": "give "}, {"text": "Burr "}, {"text": "the "}, {"text": "gift"},
                        {"text": ". "}]}, {
             "tokens": [{"text": "The "}, {"text": "article "}, {"text": "made ", "arcs": []},
                        {"text": "me "}, {"text": "angry"}, {"text": ". "}]}, {
             "tokens": [{"text": "We"}, {"text": "'re "}, {"text": "sending ", "arcs": []},
                        {"text": "Ed "}, {"text": "to "}, {"text": "Disneyland"}, {"text": "."}]}]
        }

    )


if __name__ == '__main__':
    application.run(port=5000, debug=True)
