"""Writes CBSE (NCERT) chapter overlaps into each topic of content/<subject>/subject.json.

    python -I -X utf8 scripts/cbse_map.py

Each link opens a YouTube search for the matching Prashant Kirad lesson, so the
newest upload for the chapter is always found.
"""
import json, urllib.parse

def yt(cls, chapter):
    q = f'Prashant Kirad class {cls} {chapter} one shot'
    return 'https://www.youtube.com/results?search_query=' + urllib.parse.quote_plus(q)

P11 = {1: 'Units and Measurements', 2: 'Motion in a Straight Line', 3: 'Motion in a Plane', 4: 'Laws of Motion', 5: 'Work, Energy and Power',
       6: 'System of Particles and Rotational Motion', 7: 'Gravitation', 10: 'Thermal Properties of Matter', 11: 'Thermodynamics',
       12: 'Kinetic Theory', 13: 'Oscillations', 14: 'Waves'}
P12 = {1: 'Electric Charges and Fields', 2: 'Electrostatic Potential and Capacitance', 3: 'Current Electricity', 4: 'Moving Charges and Magnetism',
       6: 'Electromagnetic Induction', 7: 'Alternating Current', 10: 'Wave Optics', 11: 'Dual Nature of Radiation and Matter', 12: 'Atoms', 13: 'Nuclei'}
C11 = {1: 'Some Basic Concepts of Chemistry', 2: 'Structure of Atom', 3: 'Classification of Elements and Periodicity in Properties',
       4: 'Chemical Bonding and Molecular Structure', 5: 'Thermodynamics', 6: 'Equilibrium', 7: 'Redox Reactions',
       8: 'Organic Chemistry: Some Basic Principles and Techniques', 9: 'Hydrocarbons'}
C12 = {1: 'Solutions', 2: 'Electrochemistry', 3: 'Chemical Kinetics', 4: 'The d- and f-Block Elements', 5: 'Coordination Compounds',
       6: 'Haloalkanes and Haloarenes', 7: 'Alcohols, Phenols and Ethers', 8: 'Aldehydes, Ketones and Carboxylic Acids'}
M11 = {2: 'Relations and Functions', 3: 'Trigonometric Functions', 4: 'Complex Numbers and Quadratic Equations', 5: 'Linear Inequalities',
       6: 'Permutations and Combinations', 7: 'Binomial Theorem', 8: 'Sequences and Series', 9: 'Straight Lines',
       11: 'Introduction to Three Dimensional Geometry', 12: 'Limits and Derivatives', 13: 'Statistics', 14: 'Probability'}
M12 = {1: 'Relations and Functions', 2: 'Inverse Trigonometric Functions', 3: 'Matrices', 4: 'Determinants', 5: 'Continuity and Differentiability',
       6: 'Application of Derivatives', 7: 'Integrals', 8: 'Application of Integrals', 9: 'Differential Equations', 10: 'Vector Algebra',
       11: 'Three Dimensional Geometry', 13: 'Probability'}

def L(book, cls, n, note=None):
    d = {'class': cls, 'chapter': f'Ch {n} {book[n]}', 'video': yt(cls, book[n])}
    if note:
        d['note'] = note
    return d

MAP = {
    'physics': {
        'A.1': [L(P11, 11, 2), L(P11, 11, 3, 'projectiles')], 'A.2': [L(P11, 11, 4), L(P11, 11, 3, 'circular motion')],
        'A.3': [L(P11, 11, 5)], 'A.4': [L(P11, 11, 6)], 'B.1': [L(P11, 11, 10)], 'B.2': [L(P11, 11, 10, 'radiation')],
        'B.3': [L(P11, 11, 12)], 'B.4': [L(P11, 11, 11)], 'B.5': [L(P12, 12, 3)], 'C.1': [L(P11, 11, 13)], 'C.2': [L(P11, 11, 14)],
        'C.3': [L(P12, 12, 10)], 'C.4': [L(P11, 11, 14, 'standing waves')], 'D.1': [L(P11, 11, 7)],
        'D.2': [L(P12, 12, 1), L(P12, 12, 2), L(P12, 12, 4, 'magnetic fields')], 'D.3': [L(P12, 12, 4)],
        'D.4': [L(P12, 12, 6), L(P12, 12, 7, 'generators and transformers')], 'E.1': [L(P12, 12, 12)], 'E.2': [L(P12, 12, 11)],
        'E.3': [L(P12, 12, 13)], 'E.4': [L(P12, 12, 13, 'fission')], 'Tool 1': [L(P11, 11, 1)], 'Tool 3': [L(P11, 11, 1, 'errors and significant figures')],
    },
    'chemistry': {
        'S1.1': [L(C11, 11, 1)], 'S1.2': [L(C11, 11, 2)], 'S1.3': [L(C11, 11, 2)], 'S1.4': [L(C11, 11, 1)],
        'S2.1': [L(C11, 11, 4)], 'S2.2': [L(C11, 11, 4)], 'S2.3': [L(C11, 11, 4)],
        'S3.1': [L(C11, 11, 3), L(C12, 12, 4, 'transition elements (HL)'), L(C12, 12, 5, 'complex ions (HL)')],
        'S3.2': [L(C11, 11, 8), L(C11, 11, 9)], 'R1.1': [L(C11, 11, 5)], 'R1.2': [L(C11, 11, 5)], 'R1.4': [L(C11, 11, 5, 'entropy and Gibbs energy')],
        'R2.1': [L(C11, 11, 1), L(C12, 12, 1, 'concentration')], 'R2.2': [L(C12, 12, 3)], 'R2.3': [L(C11, 11, 6)],
        'R3.1': [L(C11, 11, 6, 'ionic equilibrium')], 'R3.2': [L(C11, 11, 7), L(C12, 12, 2)], 'R3.3': [L(C11, 11, 9)],
        'R3.4': [L(C12, 12, 6), L(C11, 11, 9, 'addition reactions'), L(C12, 12, 5, 'ligands (HL)')],
    },
    'math-aa': {
        '1.2': [L(M11, 11, 8)], '1.3': [L(M11, 11, 8)], '1.8': [L(M11, 11, 8)], '1.9': [L(M11, 11, 7)],
        '1.10': [L(M11, 11, 6), L(M11, 11, 7, 'extended binomial theorem')], '1.11': [L(M12, 12, 7, 'partial fractions')],
        '1.12': [L(M11, 11, 4)], '1.13': [L(M11, 11, 4)], '1.14': [L(M11, 11, 4)], '1.16': [L(M12, 12, 3), L(M12, 12, 4)],
        '2.1': [L(M11, 11, 9)], '2.2': [L(M11, 11, 2)], '2.3': [L(M11, 11, 2)], '2.4': [L(M11, 11, 2)], '2.5': [L(M12, 12, 1)],
        '2.6': [L(M11, 11, 4, 'quadratic equations')], '2.7': [L(M11, 11, 4, 'quadratic equations')], '2.15': [L(M11, 11, 5)],
        '3.1': [L(M11, 11, 11)], '3.4': [L(M11, 11, 3)], '3.5': [L(M11, 11, 3)], '3.6': [L(M11, 11, 3)], '3.7': [L(M11, 11, 3)],
        '3.8': [L(M11, 11, 3)], '3.9': [L(M12, 12, 2)], '3.10': [L(M11, 11, 3)], '3.11': [L(M11, 11, 3)],
        '3.12': [L(M12, 12, 10)], '3.13': [L(M12, 12, 10)], '3.16': [L(M12, 12, 10)], '3.14': [L(M12, 12, 11)], '3.15': [L(M12, 12, 11)],
        '3.17': [L(M12, 12, 11)], '3.18': [L(M12, 12, 11)],
        '4.1': [L(M11, 11, 13)], '4.2': [L(M11, 11, 13)], '4.3': [L(M11, 11, 13)], '4.5': [L(M11, 11, 14)], '4.6': [L(M11, 11, 14)],
        '4.7': [L(M12, 12, 13, 'random variables')], '4.8': [L(M12, 12, 13)], '4.11': [L(M12, 12, 13)], '4.13': [L(M12, 12, 13, "Bayes' theorem")],
        '5.1': [L(M11, 11, 12)], '5.2': [L(M12, 12, 6)], '5.3': [L(M11, 11, 12)], '5.4': [L(M12, 12, 6)], '5.5': [L(M12, 12, 7)],
        '5.6': [L(M12, 12, 5)], '5.7': [L(M12, 12, 5, 'second derivatives')], '5.8': [L(M12, 12, 6)], '5.10': [L(M12, 12, 7)],
        '5.11': [L(M12, 12, 8)], '5.12': [L(M12, 12, 5)], '5.14': [L(M12, 12, 5, 'implicit differentiation'), L(M12, 12, 6, 'rates of change')],
        '5.15': [L(M12, 12, 5)], '5.16': [L(M12, 12, 7)], '5.17': [L(M12, 12, 8)], '5.18': [L(M12, 12, 9)],
    },
}

for subject, by_code in MAP.items():
    p = f'content/{subject}/subject.json'
    d = json.load(open(p, encoding='utf-8'))
    n = 0
    for u in d['units']:
        u.pop('cbse', None)
        for t in u['topics']:
            links = by_code.get(t['code'])
            if links:
                t['cbse'] = links
                n += 1
            else:
                t.pop('cbse', None)
    with open(p, 'w', encoding='utf-8', newline='\n') as fh:
        json.dump(d, fh, ensure_ascii=False, indent=2)
        fh.write('\n')
    print(subject, n, 'topics linked')
