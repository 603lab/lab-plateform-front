import mojs from 'mo-js';

// 点赞动画
/**
 * @arguments {0}  父级DOM
 * @arguments {1}  子级DOM
 * @arguments {2}  当前操作对象
 * @arguments {3}  当前是否点赞决定动画类型 true 简约型(已点赞,需要取消点赞) false 饱满型(点赞)
 */

export function likeAnimation(parentClass, selfClass, index, type) {
  const LikeWrapper = document.getElementsByClassName(parentClass)[index];
  const LikeIcon = document.getElementsByClassName(selfClass)[index];
  const opacityCurve16 = mojs.easing.path('M0,0 L25.333,0 L75.333,100 L100,0');
  const translationCurve16 = mojs.easing.path(
    'M0,100h25.3c0,0,6.5-37.3,15-56c12.3-27,35-44,35-44v150c0,0-1.1-12.2,9.7-33.3c9.7-19,15-22.9,15-22.9'
  );
  const squashCurve16 = mojs.easing.path(
    'M0,100.004963 C0,100.004963 25,147.596355 25,100.004961 C25,70.7741867 32.2461944,85.3230873 58.484375,94.8579105 C68.9280825,98.6531013 83.2611815,99.9999999 100,100'
  );
  const Burst = new mojs.Burst({
    parent: LikeWrapper,
    duration: 1700,
    delay: 350,
    shape: 'circle',
    fill: '#722ed1',
    x: '40%',
    y: '50%',
    opacity: 0.3,
    childOptions: { radius: { 'rand(15,5)': 0 } },
    radius: { 0: 150 },
    degree: 50,
    angle: -25,
    count: 6,
    isRunLess: true,
    easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
  });
  // burst animation (line1)
  const Burst2 = new mojs.Burst({
    parent: LikeWrapper,
    duration: 600,
    delay: 200,
    shape: 'circle',
    fill: '#C0C1C3',
    x: '15%',
    y: '100%',
    childOptions: {
      radius: { 60: 0 },
      type: 'line',
      stroke: '#722ed1',
      strokeWidth: 2,
      strokeLinecap: 'round',
    },
    radius: { 50: 180 },
    angle: 180,
    count: 1,
    opacity: 0.4,
    isRunLess: true,
    easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
  });
  // burst animation (line2)
  const Burst3 = new mojs.Burst({
    parent: LikeWrapper,
    duration: 600,
    delay: 200,
    shape: 'circle',
    fill: '#722ed1',
    x: '50%',
    y: '100%',
    childOptions: {
      radius: { 60: 0 },
      type: 'line',
      stroke: '#722ed1',
      strokeWidth: 2,
      strokeLinecap: 'round',
    },
    radius: { 50: 220 },
    angle: 180,
    count: 1,
    opacity: 0.4,
    isRunLess: true,
    easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
  });
  const Tween = new mojs.Tween({
    duration: 500,
    onUpdate: progress => {
      const translateProgress = translationCurve16(progress);
      const squashProgress = squashCurve16(progress);
      const scaleX = 1 - 2 * squashProgress;
      const scaleY = 1 + 2 * squashProgress;
      const t = `translate3d(0, ${-180 * translateProgress}px,0) scale3d(${scaleX},${scaleY},1)`;
      const opacityProgress = opacityCurve16(progress);
      LikeIcon.style.transform = t;
      LikeIcon.style.WebkitTransform = t;
      LikeIcon.style.opacity = opacityProgress;
    },
  });
  type
    ? new mojs.Timeline().add(Tween).play()
    : new mojs.Timeline().add(Burst, Burst2, Burst3, Tween).play();
}
