# TO INSTALL spaCy and language dependencies to run this:
#
# python -m pip install -U virtualenv
# virtualenv .env
# source .env/bin/activate
# pip install -U spacy
# python -m spacy download en
# python -m spacy download es
# python -m spacy download fr

from __future__ import unicode_literals, print_function

import sys
import spacy

MODELS = {
    'en': 'en_core_web_sm',
    'es': 'es_core_news_sm',
    'fr': 'fr_core_news_sm'
}


def main_verb(sent, language):
    pass


def subject(sent, language, main_verb_i):
    pass


def objects(sent, language, main_verb_i):
    pass


def auxiliaries(sent, language, main_verb_i):
    pass


def negations(sent, language, main_verb_i):
    pass


def compliments(sent, language, main_verb_i):
    pass


if __name__ == '__main__':

    language = sys.argv[1]
    model = MODELS[language]

    nlp = spacy.load(model)
    print("Loaded model '%s'" % model)

    text = unicode(raw_input(">> "))
    while (True):
        doc = nlp(text)
        for sent in doc.sents:
            offset = sent[0].i

            tokens = []
            # debug the parse
            for word in sent:
                token = (word.i-offset, word.text_with_ws, word.pos_, word.head.i-offset, word.dep_)
                tokens.append(token)
                print(token)

            # create output JSON blob
            # main_verb_i = main_verb(sent, language)
            # subject_span = subject(sent, language, main_verb_i)
            # object_spans = objects(sent, language, main_verb_i)
            # aux_spans = auxiliaries(sent, language, main_verb_i)
            # neg_spans = negations(sent, language, main_verb_i)
            # comp_spans, comp_main = compliments(sent, language, main_verb_i)
            # instance = []

            # delimiter candy.
            print('')

        text = unicode(raw_input(">> "))


