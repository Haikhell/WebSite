module.exports.getPhotoPath = async function getPhotoPath(lenth, id) {
  let masPath = [];
  for (let index = 1; index <= lenth; index++) {
    let str = `/photo/${id}_${index}.png`;
    masPath.push(str);
  }
  return masPath;
};
