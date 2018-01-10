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
    response = text2chunks(text, language)
    return jsonify(response)


@application.route('/api/load_text', methods=['GET'])
def load_text():
    return jsonify(
        {"results": [{"tokens": [{"text": "You "}, {"text": "know ",
                                                    "arcs": [{"span": [0, 1], "type": "SUBJ"},
                                                             {"span": [2, 8], "type": "COMP"},
                                                             {"span": [5, 6],
                                                              "type": "COMP_MAIN"}]},
                                 {"text": "what "}, {"text": "I"}, {"text": "'m "},
                                 {"text": "trying "}, {"text": "to "}, {"text": "say"},
                                 {"text": "?"}]}, {"tokens": [{"text": "This "}, {"text": "is "},
                                                              {"text": "giving ", "arcs": [
                                                                  {"span": [0, 1], "type": "SUBJ"},
                                                                  {"span": [3, 4], "type": "OBJ"},
                                                                  {"span": [5, 6], "type": "OBJ"},
                                                                  {"span": [1, 2], "type": "AUX"}]},
                                                              {"text": "me "}, {"text": "a "},
                                                              {"text": "headache"}, {"text": "."}]},
                     {"tokens": [{"text": "That "}, {"text": "you "}, {"text": "are "},
                                 {"text": "struggling ", "arcs": [{"span": [1, 2], "type": "SUBJ"},
                                                                  {"span": [4, 6], "type": "OBJ"},
                                                                  {"span": [2, 3], "type": "AUX"}]},
                                 {"text": "troubles "}, {"text": "me"}, {"text": "."}]}, {
                         "tokens": [{"text": "Luis "}, {"text": "is ",
                                                        "arcs": [{"span": [0, 1], "type": "SUBJ"},
                                                                 {"span": [3, 4], "type": "OBJ"}]},
                                    {"text": "the "}, {"text": "CEO"}, {"text": "."}]}, {
                         "tokens": [{"text": "He "}, {"text": "does "}, {"text": "not "},
                                    {"text": "look ", "arcs": [{"span": [0, 1], "type": "SUBJ"},
                                                               {"span": [1, 2], "type": "AUX"},
                                                               {"span": [2, 3], "type": "NEG"}]},
                                    {"text": "sick"}, {"text": "."}]}, {"tokens": [{"text": "He "},
                                                                                   {"text": "is ",
                                                                                    "arcs": [{
                                                                                                 "span": [
                                                                                                     0,
                                                                                                     1],
                                                                                                 "type": "SUBJ"}]},
                                                                                   {"text": "in "},
                                                                                   {"text": "the "},
                                                                                   {
                                                                                       "text": "bathroom"},
                                                                                   {"text": "."}]},
                     {"tokens": [{"text": "Happiness "}, {"text": "is "}, {"text": "having ",
                                                                           "arcs": [{"span": [0, 1],
                                                                                     "type": "SUBJ"},
                                                                                    {"span": [3, 5],
                                                                                     "type": "OBJ"},
                                                                                    {"span": [1, 2],
                                                                                     "type": "AUX"}]},
                                 {"text": "low "}, {"text": "expectations"}, {"text": "."}]}, {
                         "tokens": [{"text": "Joe "}, {"text": "and "}, {"text": "Mary "},
                                    {"text": "are ", "arcs": [{"span": [0, 3], "type": "SUBJ"},
                                                              {"span": [4, 5], "type": "OBJ"}]},
                                    {"text": "people"}, {"text": "."}]}, {
                         "tokens": [{"text": "Cindy "}, {"text": "used ",
                                                         "arcs": [{"span": [0, 1], "type": "SUBJ"},
                                                                  {"span": [2, 3], "type": "OBJ"},
                                                                  {"span": [4, 11], "type": "COMP"},
                                                                  {"span": [4, 5],
                                                                   "type": "COMP_MAIN"}]},
                                    {"text": "email "}, {"text": "to "}, {"text": "tell "},
                                    {"text": "Edward "}, {"text": "to "}, {"text": "give "},
                                    {"text": "Burr "}, {"text": "the "}, {"text": "gift"},
                                    {"text": "."}]}, {
                         "tokens": [{"text": "The "}, {"text": "article "}, {"text": "made ",
                                                                             "arcs": [
                                                                                 {"span": [1, 2],
                                                                                  "type": "SUBJ"},
                                                                                 {"span": [3, 5],
                                                                                  "type": "COMP"},
                                                                                 {"span": [4, 5],
                                                                                  "type": "COMP_MAIN"}]},
                                    {"text": "me "}, {"text": "angry"}, {"text": "."}]}, {
                         "tokens": [{"text": "We"}, {"text": "'re "}, {"text": "sending ", "arcs": [
                             {"span": [0, 1], "type": "SUBJ"}, {"span": [3, 4], "type": "OBJ"},
                             {"span": [1, 2], "type": "AUX"}]}, {"text": "Ed "}, {"text": "to "},
                                    {"text": "Disneyland"}, {"text": "."}]}]}

    )


if __name__ == '__main__':
    application.run(port=5000, debug=True)
