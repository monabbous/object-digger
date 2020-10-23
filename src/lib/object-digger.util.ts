export function digger(str, context) {
  return (str.match(/[\w\.]+/g) || [])
    .map(accessor =>
      accessor.split('.')
        .reduce((a, i) => typeof a === 'object' ? a[i] : a, context)
    );
}

export function diggerStringParser(diggerString, context, type: 'squared-brackets' | 'curly-brackets' | 'backticks' = 'squared-brackets') {
  let regex: RegExp = /\[\[\s*[\w.]+\s*]]/g;
  switch (type) {
    case 'backticks':
      regex = /``\s*[\w.]+\s*``/g;
      break;
    case 'curly-brackets':
      regex = /{{\s*[\w.]+\s*}}/g;
      break;
  }

  return diggerString.replace(regex, (r) => digger(r, context).shift());
}
