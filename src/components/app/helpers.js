export const rand = max => Math.floor(Math.random() * max);

export const position = id => ({ x: (id % 4) + 1, y: Math.floor(id / 4) + 1 });

export const getValue = (x, y) => x + (y - 1) * 4;

export const shuffle = (nums) => {
  const array = [...nums];
  for (let i = 0; i < array.length - 1; i += 1) {
    const num = rand(array.length);
    const pos = rand(array.length);
    [array[i].value, array[num].value] = [array[num].value, array[i].value];
    [array[i].x, array[pos].x] = [array[pos].x, array[i].x];
    [array[i].y, array[pos].y] = [array[pos].y, array[i].y];
  }
  return array;
};

export const generate = (size = 4) => {
  const res = [];
  for (let i = 0; i < (size ** 2) - 1; i += 1) {
    res.push({ ...position(i), value: i + 1 });
  }
  return res;
};
