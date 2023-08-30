export const getElementOffset = (el: any): number => {
  try {
    const ele = document.getElementById(el);
    // -100 for scroll UX behavior
    // @ts-ignore
    return ele.offsetTop - ele.scrollHeight - 100;
  } catch (e) {
    return 0;
  }
};
