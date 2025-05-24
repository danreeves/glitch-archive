
const sparkles = {
  name: 'sparkles',
  src: 'https://cdn.glitch.com/2539c9eb-689e-4765-addb-baf19c7b5bf2%2Fsparkles.png?1496841442400',
};
const eye = {
  name: 'eye',
  src: 'https://cdn.glitch.com/2539c9eb-689e-4765-addb-baf19c7b5bf2%2Feye.png?1496842050045',
};
const mouth = {
  name: 'mouth',
  src: 'https://cdn.glitch.com/2539c9eb-689e-4765-addb-baf19c7b5bf2%2Fmouth.png?1496842076965',
};
const tongue = {
  name: 'tongue',
  src: 'https://cdn.glitch.com/2539c9eb-689e-4765-addb-baf19c7b5bf2%2Ftongue.png?1496841781303',
};
const fire = {
  name: 'fire',
  src: 'https://cdn.glitch.com/2539c9eb-689e-4765-addb-baf19c7b5bf2%2Ffire.png?1496842103467',
};
const heart = {
  name: 'heart',
  src: 'https://cdn.glitch.com/2539c9eb-689e-4765-addb-baf19c7b5bf2%2Fheart.png?1497091520812',
};

const srcs = [
  sparkles,
  eye,
  mouth,
  tongue,
  fire,
  heart,
];

export default function getImages () {
  return srcs.reduce((acc, img) => {
    acc[img.name] = document.createElement('img');
    acc[img.name].src = img.src;
    return acc;
  }, {});
}