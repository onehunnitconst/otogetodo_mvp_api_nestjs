[...document.querySelectorAll('.song--item')].map((song) => {
  const title = song.querySelector('.song--item__tit').innerText;
  const artist = song.querySelector('.song--item__artistName').innerText;
  const genre = song.querySelector('.song--item__genre img').alt;
  const cover = song.querySelector('.song--item__thumb img').src;
  const dxchartEl = song.querySelector('.song--item__lv.dx');
  const stchartEl = song.querySelector('.song--item__lv.st');

  const difficulty = ['BASIC', 'ADVANCED', 'EXPERT', 'MASTER', 'Re:MASTER'];

  const dxchart = dxchartEl
    ? [...dxchartEl.querySelectorAll('.song--item__lv__num')]
    : [];
  const stchart = stchartEl
    ? [...stchartEl.querySelectorAll('.song--item__lv__num')]
    : [];

  return {
    title,
    artist,
    genre,
    cover,
    charts: [
      ...dxchart
        .map((e, i) => ({
          mode: 'dx',
          difficulty: difficulty[i],
          level: e.innerText,
        }))
        .filter((e) => e.level.length > 0),
      ...stchart
        .map((e, i) => ({
          mode: 'st',
          difficulty: difficulty[i],
          level: e.innerText,
        }))
        .filter((e) => e.level.length > 0),
    ],
  };
});
