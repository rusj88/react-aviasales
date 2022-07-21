const checkboxesInitial = {
  none: true,
  one: false,
  two: false,
  three: false,
};

const checkboxReducer = (checkboxes = checkboxesInitial, action) => {
  switch (action.type) {
    case 'NONE':
      return {
        ...checkboxes,
        none: !checkboxes.none,
      };
    case 'ONE':
      return {
        ...checkboxes,
        one: !checkboxes.one,
      };
    case 'TWO':
      return {
        ...checkboxes,
        two: !checkboxes.two,
      };
    case 'THREE':
      return {
        ...checkboxes,
        three: !checkboxes.three,
      };
    case 'ALL':
      if (checkboxes.none && checkboxes.one && checkboxes.two && checkboxes.three) {
        return {
          none: false,
          one: false,
          two: false,
          three: false,
        };
      }
      return {
        none: true,
        one: true,
        two: true,
        three: true,
      };

    default:
      return checkboxes;
  }
};

export default checkboxReducer;