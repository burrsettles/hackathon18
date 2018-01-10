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
import json

import spacy

MODELS = {
    'en': 'en_core_web_sm',
    'es': 'es_core_news_sm',
    'fr': 'fr_core_news_sm'
}

def cleanup_span(span, sent):
    while sent[span[0]].dep_ in ('aux', 'det', 'punct', 'mark'):
        span[0] += 1
    while sent[span[1]-1].dep_ in ('aux', 'det', 'punct', 'mark'):
        span[1] -= 1
    return span


def main_verb(sent):
    for word in sent:
        if word.dep_ == 'ROOT' and word.pos_ in ['AUX', 'VERB']:
            return word.i
        elif word.dep_ == 'cop' and word.head.dep_ == 'ROOT':
            return word.i
    return None


def subject(sent, main_verb_i):
    for word in sent:
        if word.dep_ == 'nsubj' and word.head.dep_ == 'ROOT':
            # print('# SUBJ', word, word.i)
            return cleanup_span([word.left_edge.i, word.right_edge.i + 1], sent)
    return None


def objects(sent, main_verb_i):
    result = []
    for word in sent:
        if word.dep_ in ('dobj', 'dative', 'attr') and word.head.i == main_verb_i:
            # print('# OBJ', word, word.i)
            result.append(cleanup_span([word.left_edge.i, word.right_edge.i + 1], sent))
    if len(result) == 0:
        # copular cases for ES/FR
        for word in sent:
            if word.pos_ in ('NOUN', 'PRON', 'PROPN') and word.dep_ == 'ROOT':
                # print('# OBJ', word, word.i)
                result.append([word.i, word.i + 1])
    return result


def auxiliaries(sent, main_verb_i):
    result = []
    for word in sent:
        if word.dep_ == 'aux' and word.head.i == main_verb_i:
            # print('# AUX', word, word.i)
            result.append([word.left_edge.i, word.right_edge.i + 1])
    return result


def negations(sent, main_verb_i):
    result = []
    for word in sent:
        if word.dep_ == 'neg' and word.head.i == main_verb_i:
            # print('# NEG', word, word.i)
            result.append([word.left_edge.i, word.right_edge.i + 1])
        if word.dep_ == 'advmod' and word.text.lower() in ('no', 'ne', 'pas', 'rien', 'jamais'):
            # print('# NEG', word, word.i)
            result.append([word.i, word.i + 1])
    return result


def compliments(sent, main_verb_i):
    for word in sent:
        if word.dep_ in ('xcomp', 'ccomp') and word.head.i == main_verb_i:
            # print('# COMP', word, word.i)
            return cleanup_span([word.left_edge.i, word.right_edge.i + 1], sent), [word.i, word.i+1]
    return None, None


def text2chunks(text, language):
    nlp = spacy.load(MODELS[language])
    # print("Loaded model '%s'" % MODELS[language])

    doc = nlp(text)
    result = []
    for sent_ in doc.sents:
        # double-parse fix weirdo zero-index inconsistencies
        sent = nlp(sent_.text)

        # prepare the retun
        sent_result = {'tokens': []}
        for word in sent:
            # print(word.i, word.text_with_ws, word.pos_, word.head.i, word.dep_)
            sent_result['tokens'].append({'text': word.text_with_ws})

        # create output JSON blob
        main_verb_i = main_verb(sent)
        # print('# MAIN VERB', sent[main_verb_i], main_verb_i)
        argument_arcs = []
        subject_span = subject(sent, main_verb_i)
        if subject_span is not None:
            argument_arcs.append({'type': 'SUBJ', 'span': subject_span})
        for span in objects(sent, main_verb_i):
            argument_arcs.append({'type': 'OBJ', 'span': span})
        for span in auxiliaries(sent, main_verb_i):
            argument_arcs.append({'type': 'AUX', 'span': span})
        for span in negations(sent, main_verb_i):
            argument_arcs.append({'type': 'NEG', 'span': span})
        comp_span, comp_main = compliments(sent, main_verb_i)
        if comp_span is not None:
            argument_arcs.append({'type': 'COMP', 'span': comp_span})
            argument_arcs.append({'type': 'COMP_MAIN', 'span': comp_main})
        sent_result['tokens'][main_verb_i]['arcs'] = argument_arcs

        result.append(sent_result)

        # delimiter candy.
        # print('')

    return {'results': result}
    # print(json.dumps({'results': result}))


if __name__ == '__main__':

    language = sys.argv[1]

    text = unicode(raw_input(">> "))
    while (True):
        text2chunks(text, language)
        text = unicode(raw_input(">> "))


