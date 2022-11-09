import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const LOCALSTORAGE_KEY = "videoplayer-current-time";

const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};



player.setCurrentTime(load(LOCALSTORAGE_KEY).seconds).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});

player.on('timeupdate', throttle(timeOnNow, 1000));

function timeOnNow(e) {
    save(LOCALSTORAGE_KEY, e);
}

