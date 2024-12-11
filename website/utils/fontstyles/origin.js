const FANCY = {
    // FANCY lowercase letters a-z
    a: '𝓪', b: '𝓫', c: '𝓬', d: '𝓭', e: '𝓮', f: '𝓯',
    g: '𝓰', h: '𝓱', i: '𝓲', j: '𝓳', k: '𝓴', l: '𝓵',
    m: '𝓶', n: '𝓷', o: '𝓸', p: '𝓹', q: '𝓺', r: '𝓻',
    s: '𝓼', t: '𝓽', u: '𝓾', v: '𝓿', w: '𝔀', x: '𝔁',
    y: '𝔂', z: '𝔃',
  
    // FANCY uppercase letters A-Z
    A: '𝓐', B: '𝓑', C: '𝓒', D: '𝓓', E: '𝓔', F: '𝓕',
    G: '𝓖', H: '𝓗', I: '𝓘', J: '𝓙', K: '𝓚', L: '𝓛',
    M: '𝓜', N: '𝓝', O: '𝓞', P: '𝓟', Q: '𝓠', R: '𝓡',
    S: '𝓢', T: '𝓣', U: '𝓤', V: '𝓥', W: '𝓦', X: '𝓧',
    Y: '𝓨', Z: '𝓩',
  
    // FANCY Numbers 0-9
    0: '𝟘', 1: '𝟙', 2: '𝟚', 3: '𝟛', 4: '𝟜', 5: '𝟝',
    6: '𝟞', 7: '𝟟', 8: '𝟠', 9: '𝟡',
  };
  
  const THIN = {
    // THIN lowercase a-z
    a: '𝖺', b: '𝖻', c: '𝖼', d: '𝖽', e: '𝖾', f: '𝖿',
    g: '𝗀', h: '𝗁', i: '𝗂', j: '𝗃', k: '𝗄', l: '𝗅',
    m: '𝗆', n: '𝗇', o: '𝗈', p: '𝗉', q: '𝗊', r: '𝗋',
    s: '𝗌', t: '𝗍', u: '𝗎', v: '𝗏', w: '𝗐', x: '𝗑',
    y: '𝗒', z: '𝗓',
  
    // THIN uppercase A-Z
    A: '𝖠', B: '𝖡', C: '𝖢', D: '𝖣', E: '𝖤', F: '𝖥',
    G: '𝖦', H: '𝖧', I: '𝖨', J: '𝖩', K: '𝖪', L: '𝖫',
    M: '𝖬', N: '𝖭', O: '𝖮', P: '𝖯', Q: '𝖰', R: '𝖱',
    S: '𝖲', T: '𝖳', U: '𝖴', V: '𝖵', W: '𝖶', X: '𝖷',
    Y: '𝖸', Z: '𝖹',
  
    // THIN Numbers 0-9
    0: '𝟢', 1: '𝟣', 2: '𝟤', 3: '𝟥', 4: '𝟦',
    5: '𝟧', 6: '𝟨', 7: '𝟩', 8: '𝟪', 9: '𝟫',
  }
  
  
  module.exports.revert = function (text) {
    try {
      const reverse = Object.entries(FANCY).reduce((newObject, [key, value]) => {
        newObject[value] = key; 
        return newObject;
      }, {});
  
      //console.log(reverse);
  
      // Replace each fonted character with the original one
      return text.split('').map(char => {
        // Replace the character if it exists in reverse mapping, otherwise return the original character
        return reverse[char] || char;
      }).join('');
    } catch (err) {
      //console.error("An error occurred while reverting the text origin:", err);
    }
};