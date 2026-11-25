import { describe, expect, it } from 'vitest';
import { blocksOf, sectionOf, stripChecks } from './printText';

describe('sectionOf / blocksOf', () => {
  const md = ['## Intro', 'x', '```keyidea', 'Idea **one**.', '```', '## Summary', '', '- a', '- b', '', '```keyidea', 'Two', '```', '## Next', 'y'].join('\n');
  it('returns the section up to the next ## heading', () => {
    expect(sectionOf(md, 'Summary')).toBe(['- a', '- b', '', '```keyidea', 'Two', '```'].join('\n'));
    expect(sectionOf(md, 'Missing')).toBe('');
  });
  it('collects the blocks of one kind', () => {
    expect(blocksOf(md, 'keyidea')).toEqual(['Idea **one**.', 'Two']);
  });
});

describe('stripChecks', () => {
  it('removes question blocks and the heading they leave empty', () => {
    const md = ['## Speed', 'Text.', '', '## Try it yourself', '', '```question', 'q-1', '```', '', '```question', 'q-2', '```', '', '## Summary', '- a'].join('\n');
    expect(stripChecks(md)).toBe(['## Speed', 'Text.', '', '## Summary', '- a'].join('\n'));
  });

  it('keeps a heading that still has content or subsections', () => {
    const md = ['## Method', '', '### Step 1', 'Do it.', '', '```question', 'q', '```', 'After.'].join('\n');
    expect(stripChecks(md)).toBe(['## Method', '', '### Step 1', 'Do it.', '', 'After.'].join('\n'));
  });

  it('drops an empty trailing heading', () => {
    expect(stripChecks(['Intro.', '## Practice', '```question', 'q', '```'].join('\n'))).toBe('Intro.');
  });

  it('ignores headings and question fences inside other code blocks', () => {
    const md = ['````example', '## not a heading', '```question', 'x', '```', '````'].join('\n');
    expect(stripChecks(md)).toBe(md);
  });
});
