import { helper } from '@ember/component/helper';

export function classnames([classHashPositional], classHashNamed) {
  // if the positional argument is passed, use that; otherwise, use the named properties
  const hash = classHashPositional || classHashNamed;

  return Object.keys(hash)
    .reduce(function (acc, cls) {
      if (hash[cls]) {
        return `${acc}${cls} `;
      }
      return acc;
    }, '')
    .trim();
}

export default helper(classnames);
