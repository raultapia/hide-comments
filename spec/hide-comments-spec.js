'use babel';

import HideComments from '../lib/hide-comments';

describe('HideComments', () => {
  it('can hide c/c++ comments', () => {
    text1 = '\nhi\nhow\n/*this is a comment*/\nare   //another comment\nyou\n';
    text2a = '\nhi\nhow\nare\nyou\n';
    text2b = '\nhi\nhow\n\nare\nyou\n';
    expect(HideComments.hide_comments(text1,'source.cpp',true)).toBe(text2a);
    expect(HideComments.hide_comments(text1,'source.cpp',false)).toBe(text2b);
  });
  it('can hide python comments', () => {
    text1 = '\nhi\nhow\n\'\'\'this is a comment\'\'\'\nare   #another comment\nyou\n';
    text2a = '\nhi\nhow\nare\nyou\n';
    text2b = '\nhi\nhow\n\nare\nyou\n';
    expect(HideComments.hide_comments(text1,'source.python',true)).toBe(text2a);
    expect(HideComments.hide_comments(text1,'source.python',false)).toBe(text2b);
  });
  it('can stay quiet', () => {
    text1 = '\nhi\nhow\nare\nyou\n';
    text2 = '\nhi\nhow\nare\nyou\n';
    expect(HideComments.hide_comments(text1,'source.cpp',true)).toBe(text2);
    expect(HideComments.hide_comments(text1,'source.python',true)).toBe(text2);
  });
});
