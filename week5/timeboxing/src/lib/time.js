function getHoursMinutesAndSecondsFromDurationInSeconds(durationInSeconds){
    const seconds = Math.floor(durationInSeconds%60);
    const minutes = Math.floor(durationInSeconds/60);
    const hours = Math.floor(durationInSeconds/3600);
    return [hours, minutes, seconds];
}

export {
    getHoursMinutesAndSecondsFromDurationInSeconds
}