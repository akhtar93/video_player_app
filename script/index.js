(function () {
  let selectedVideoId = '1';
  const VIDEO_URL_PREFIX = "https://player.vimeo.com/video/";
  const APP_TITLE = 'The Video Player';
  document.addEventListener('DOMContentLoaded', onDomLoad);
  function onDomLoad() {
    const body = document.querySelector('body');
    body.append(createWrapper());
  }

  function createWrapper() {
    const main = document.createElement('main');
    const div = document.createElement('div');
    div.classList.add('main-container');
    const h1 = document.createElement('h1');
    h1.classList.add('main-heading');
    h1.innerText = APP_TITLE;
    const playerSection = createPlayerSection();
    div.append(h1, playerSection);
    main.append(div);
    return main;
  }
  function createPlayerSection() {
    const playerSectionDiv = document.createElement('div');
    playerSectionDiv.classList.add('player-section');
    const currentVideoPlay = createCurrentPlayingVideo();
    const playListSection = createPlaylistSection();
    playerSectionDiv.append(currentVideoPlay, playListSection);
    return playerSectionDiv;
  }
  function createCurrentPlayingVideo() {
    const playerWrapper = document.createElement('div');
    playerWrapper.classList.add('player-wrapper');
    const iframe = document.createElement('iframe');
    iframe.id = 'video-player';
    iframe.setAttribute('framerborder', 0);
    iframe.setAttribute('webkitallowfullscreen', true);
    iframe.setAttribute('allowfullscreen', true);
    iframe.setAttribute('src', `${VIDEO_URL_PREFIX}${getDataById(selectedVideoId).vimeoId}`);
    playerWrapper.append(iframe);
    const playerActions = createPlayerActions();
    const nameAndDescription = createNameAndDescription();
    playerWrapper.append(playerActions, nameAndDescription);
    return playerWrapper;
  }
  function createPlayerActions() {
    const videoData = getDataById(selectedVideoId);
    const playerActionWrapper = document.createElement('div');
    playerActionWrapper.classList.add('player-action-wrapper');
    playerActionWrapper.id = 'player-action-wrapper';
    const playerActions = document.createElement('div');
    playerActions.id = 'video-action';
    const viewCount = createViewSection(videoData);
    const videoActionItems = createActionItems(videoData);
    playerActions.append(viewCount, videoActionItems);
    playerActionWrapper.append(playerActions);
    return playerActionWrapper;
  }
  function createViewSection(videoData) {
    const viewsCountWrapper = document.createElement('p');
    viewsCountWrapper.id = 'view-count-wrapper';
    const text = document.createElement('span');
    text.id = 'views-count';
    text.innerText = videoData.views;
    viewsCountWrapper.append(text, 'Views');
    return viewsCountWrapper;
  }
  function createNameAndDescription() {
    const videoData = getDataById(selectedVideoId);
    const textWrapper = document.createElement('div');
    const title = document.createElement('h3');
    title.id = 'video-title';
    title.innerText = videoData.title;
    const desc = document.createElement('p');
    desc.id = 'video-description';
    desc.innerText = videoData.description;
    textWrapper.append(title, desc);
    return textWrapper;

  }
  function createActionItems() {
    const actionWrapper = document.createElement('div');
    actionWrapper.classList.add('action-items-wrapper');
    const actiondata = getActionItems();
    actiondata.forEach((action) => {
      const listItem = document.createElement('i');
      listItem.setAttribute('class', action.class);
      listItem.id = action.id;
      listItem.title = action.title;
      actionWrapper.append(listItem);
    });
    return actionWrapper;
  }
  function createPlaylistSection() {
    const playlistWrapper = document.createElement('div');
    playlistWrapper.classList.add('playlist-wrapper');
    playlistWrapper.addEventListener('click', onPlaylistClick)
    const data = getPlayListdata();
    data.forEach((obj) => {
      const thumbnailElement = createThumbnails(obj);
      playlistWrapper.append(thumbnailElement);
    });
    return playlistWrapper;
  }
  function createThumbnails(obj) {
    const mainDiv = document.createElement('div');
    mainDiv.id = `card_${obj.id}`;
    mainDiv.classList.add('playlist-card');
    if (selectedVideoId === obj.id) {
      mainDiv.classList.add('active');
    }

    const img = document.createElement('img');
    img.src = obj.thumbnail;
    img.id = `thumbnail_${obj.id}`
    img.classList.add('thumbnail');

    const title = document.createElement('h3');
    title.id = `title_${obj.id}`;
    title.classList.add('video-card-title');
    title.innerText = obj.title;
    mainDiv.append(img, title);
    return mainDiv;
  }
  function onPlaylistClick(event) {
    const target = event.target;
    if (target.tagName === 'IMG' || target.tagName === 'H3' || target.tagName === 'DIV') {
      const videoId = getVideoIdFromTarget(event.target.id);
      const activeElement = document.getElementById(`card_${selectedVideoId}`);
      activeElement.classList.remove('active');
      const videoData = getDataById(videoId);
      const frameId = document.getElementById('video-player');
      const viewsCount = document.getElementById('views-count');
      const videoTitle = document.getElementById('video-title');
      const videoDesc = document.getElementById('video-description');
      frameId.setAttribute('src', `${VIDEO_URL_PREFIX}${videoData.vimeoId}`);
      const newSelected = document.getElementById(`card_${videoId}`);
      newSelected.classList.add('active');
      selectedVideoId = videoId;
      viewsCount.innerText = videoData.views;
      videoTitle.innerText = videoData.title;
      videoDesc.innerText = videoData.description;
    }
    return;
  }
})();