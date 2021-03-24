export function shuffle<T>(_list: T[]) {
  let list = [..._list];
  let currentIdx = list.length;
  while (currentIdx > 0) {
    const randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx -= 1;
    [list[randomIdx], list[currentIdx]] = [list[currentIdx], list[randomIdx]];
  }
  return list;
}
