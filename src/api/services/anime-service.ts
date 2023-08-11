import anime from 'animejs/lib/anime';

export const animeIcons = () => {
  anime({
    targets: '.onchain-icon',
    translateX: 0, // Move along the X axis
    rotate: {
      value: 360,  // Rotate 360 degrees
      duration: 10000,
      easing: "linear",
    },
    loop: true,   // Loop the anim
  })
  anime({
    targets: '.offchain-icon',
    translateX: -30,
    direction: 'alternate',
    easing: 'cubicBezier(.5, .05, .1, .3)',
    delay:800,
    duration: 3000,
    loop: true,
  });
}
