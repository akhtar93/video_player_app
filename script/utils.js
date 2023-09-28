/* 
let selectedId = 1;
obnj = {
  1: {...},
  2: {....}
}
obnj[selectedId]



oobj = [
  {...},
  {...}
]

oobj.find()
oobj.filter
oobj.forEach

*/


1
function createPlaylistVideoMap() {
  const originalData = playlistData;
  const resultObject = {};
  originalData.forEach((data, index) => {
    if (!resultObject[data.id]) {
      resultObject[data.id] = {}
    }
    resultObject[data.id] = {
      ...videoPlaySectionData[index],
      thumbnail: data.thumbnail
    };
  });
  return resultObject;
}
var videoPlayerMap = createPlaylistVideoMap();

function getDataById(id) {
  return videoPlayerMap[id];
}
function getPlayListdata() {
  return playlistData;
}
function getVideoIdFromTarget(targetId) {
  if (!targetId) {
    return false;
  }
  const targetIdArray = targetId.split('_');
  return targetIdArray[1];
}
function getActionItems() {
  return [
    { 
      id: 'like-action',
      title: 'Click to like this video',
      class: 'far fa-heart'
    },
    {
      id: 'comment-action',
      title: 'Add comments',
      class: 'far fa-comment-alt'
    },
    {
      id: 'save-action',
      title: 'Save this video',
      class: 'far fa-bookmark'
    },
  ];
}