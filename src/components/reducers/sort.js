const sortReducer = (sort = 'cheap', action) => {
    switch (action.type) {
      case 'CHEAP':
        return 'cheap';
      case 'FAST':
        return 'fast';
      case 'OPTIMAL':
        return 'optimal';
      default:
        return sort;
    }
  };
  
  export default sortReducer;