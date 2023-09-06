import { ref } from 'vue';

export const uiScrollUtils = (itemsInitial: any[], scrollAreaRef: any) => {
  const itemsIn = ref(itemsInitial);
  const position = ref(300);
  const onScroll = (val: any) => {
    //@ts-ignore
    if (scrollAreaRef.value.getScrollPercentage().top === 1) {
      for (let i = 0; i < itemsIn.value.length; i++) {
        itemsIn.value[i].active = false;
      }
      itemsIn.value[itemsIn.value.length - 1].active = true;
    } else {
      const verticalPosition: number = val.verticalPosition;
      let index = 0;
      for (let i = 0; i < itemsIn.value.length; i++) {
        const item = itemsIn.value[i];
        if (item.topOffset !== 0) {
          if (item.topOffset <= verticalPosition) {
            index = i;
          } else {
            break;
          }
        }
      }
      console.log('index', index);
      for (let i = 0; i < itemsIn.value.length; i++) {
        itemsIn.value[i].active = i === index;
      }
    }
  }

  const scrollToElementIn = (el: any) => {
    const ele = document.getElementById(el);
    // @ts-ignore
    const offset = ele.offsetTop - ele.scrollHeight + 58;
    // @ts-ignore
    scrollAreaRef.value.setScrollPosition('vertical', offset, 500);
    position.value = Math.floor(Math.random() * 1001) * 20;
  };

  return {
    itemsIn,
    onScroll,
    scrollToElementIn
  }
};
