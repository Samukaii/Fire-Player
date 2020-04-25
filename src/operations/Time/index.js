export function milisecToTime(miliseconds = 1000) {
  let totalSeconds = Math.round(miliseconds / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.round((totalSeconds / 60 - minutes) * 60);

  let minutesFormated = minutes < 10 ? '0' + minutes : minutes;
  let secondsFormated = seconds < 10 ? '0' + seconds : seconds;

  return minutesFormated + ':' + secondsFormated;
}
