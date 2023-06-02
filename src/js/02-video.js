import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
// const player = new Vimeo.Player(iframe);
const player = new Player(iframe);

const PLAYER_CURRENT_TIME = 'videoplayer-current-time';

function saveLocalStorage(e) {
  const currentTime = e.seconds;

  localStorage.setItem(PLAYER_CURRENT_TIME, JSON.stringify(currentTime));
}

player.on('play', resumeWhatching);

function resumeWhatching() {
  player.on('timeupdate', throttle(saveLocalStorage, 1000));
  const getTime = JSON.parse(localStorage.getItem(PLAYER_CURRENT_TIME));
  return player
    .setCurrentTime(getTime)
    .then(function (getTime) {
      // getTime = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
