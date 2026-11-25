import { describe, expect, it } from 'vitest';
import { dedupe, normalisePrompt, parseTopicTags, resolveTopic, type TopicTags } from './pastPapers';

const TOPICS = new Set(['physics/a1-kinematics', 'physics/a2-forces-momentum', 'chemistry/r2-2-rates']);
const exists = (k: string) => TOPICS.has(k);

describe('parseTopicTags', () => {
  it('keeps well-formed entries and ignores the rest', () => {
    expect(
      parseTopicTags({
        'physics/q1': { topic: 'a1-kinematics', confidence: 'high' },
        'physics/q2': { topic: 'a2-forces-momentum', confidence: 'low' },
        'physics/q3': { confidence: 'high' },
        'physics/q4': 'a1-kinematics',
      }),
    ).toEqual({ 'physics/q1': { topic: 'a1-kinematics', confidence: 'high' } });
  });
  it('treats a missing or malformed file as no tags', () => {
    expect(parseTopicTags(null)).toEqual({});
    expect(parseTopicTags([1, 2])).toEqual({});
    expect(parseTopicTags('x')).toEqual({});
  });
});

describe('resolveTopic', () => {
  const tags: TopicTags = {
    'physics/hi': { topic: 'a2-forces-momentum', confidence: 'high' },
    'physics/med': { topic: 'a1-kinematics', confidence: 'medium' },
    'physics/bad': { topic: 'no-such-topic', confidence: 'high' },
    'physics/tagged': { topic: 'a1-kinematics', confidence: 'high' },
  };
  it("keeps the question's own valid topic, ignoring any tag", () => {
    expect(resolveTopic('physics', 'tagged', 'a2-forces-momentum', false, tags, exists)).toEqual({
      topicKey: 'physics/a2-forces-momentum',
      needsReview: false,
      autoTagged: false,
    });
    expect(resolveTopic('physics', 'x', 'a1-kinematics', true, tags, exists).needsReview).toBe(true);
  });
  it('applies a high-confidence tag as reviewed', () => {
    expect(resolveTopic('physics', 'hi', null, true, tags, exists)).toEqual({
      topicKey: 'physics/a2-forces-momentum',
      needsReview: false,
      autoTagged: true,
    });
  });
  it('applies a medium-confidence tag but keeps it flagged for review', () => {
    expect(resolveTopic('physics', 'med', 'retired-topic', false, tags, exists)).toEqual({
      topicKey: 'physics/a1-kinematics',
      needsReview: true,
      autoTagged: true,
    });
  });
  it('leaves the question unplaced without a usable tag', () => {
    const none = { topicKey: null, needsReview: true, autoTagged: false };
    expect(resolveTopic('physics', 'bad', null, false, tags, exists)).toEqual(none);
    expect(resolveTopic('physics', 'other', null, false, tags, exists)).toEqual(none);
    expect(resolveTopic('chemistry', 'hi', null, false, tags, exists)).toEqual(none); // tags are per subject
  });
});

describe('dedupe', () => {
  type Q = Parameters<typeof dedupe>[0][number] & { id: string };
  const q = (id: string, p: Partial<Q> = {}): Q => ({
    id,
    subjectId: 'physics',
    session: 'May 2024 TZ1',
    prompt: 'A ball is thrown **upwards**.',
    markscheme: '4.9 m',
    topicKey: 'physics/a1-kinematics',
    ...p,
  });

  it('normalises case, punctuation, markup and spacing', () => {
    expect(normalisePrompt('  A ball is\n thrown **upwards**. ')).toBe('a ball is thrown upwards');
    expect(normalisePrompt(undefined)).toBe('');
  });

  it('drops exact duplicates, keeping the first in its place', () => {
    const r = dedupe([q('a'), q('b', { prompt: 'Other' }), q('c', { prompt: 'a ball IS thrown upwards' })]);
    expect(r.questions.map((x) => x.id)).toEqual(['a', 'b']);
    expect(r.duplicates).toBe(1);
  });

  it('keeps copies from another session, subject or with a different markscheme', () => {
    const r = dedupe([
      q('a'),
      q('b', { session: 'May 2025 TZ1' }),
      q('c', { subjectId: 'chemistry' }),
      q('d', { markscheme: '9.8 m' }),
      q('e', { session: undefined }),
    ]);
    expect(r.questions.map((x) => x.id)).toEqual(['a', 'b', 'c', 'd', 'e']);
    expect(r.duplicates).toBe(0);
  });

  it('prefers the copy visible at both levels, then the one with a topic', () => {
    const r = dedupe([q('hl', { level: 'HL' }), q('x', { prompt: 'Other' }), q('sl', { level: 'SL' })]);
    expect(r.questions.map((x) => x.id)).toEqual(['sl', 'x']);
    const t = dedupe([q('untagged', { topicKey: null }), q('tagged')]);
    expect(t.questions.map((x) => x.id)).toEqual(['tagged']);
  });

  it('never merges questions whose prompt is empty after normalisation', () => {
    expect(dedupe([q('a', { prompt: '…' }), q('b', { prompt: '…' })]).questions).toHaveLength(2);
  });
});
