let offsetSInput = document.getElementById('offset-s') as HTMLInputElement;
let offsetMSInput = document.getElementById('offset-ms') as HTMLInputElement;
let offsetBtn = document.getElementById('offset-btn') as HTMLButtonElement;

let offset = 0;

offsetBtn.onclick = () => {
    let seconds = parseInt(offsetSInput.value);
    if (isNaN(seconds)) {
        seconds = 0;
        offsetSInput.value = "0";
    }
    let milliseconds = parseInt(offsetMSInput.value);
    if (isNaN(milliseconds)) {
        milliseconds = 0;
        offsetMSInput.value = "0";
    }
    offset = seconds * 1000 + milliseconds;
    console.log("时间偏移", offset);

    for (let i = 0; i < subtitles.length; i++) {
        subtitles[i]['start_time'] = updateTime(subtitles[i]['start_time'], offset);
        subtitles[i]['end_time'] = updateTime(subtitles[i]['end_time'], offset);
    }

    loadTable(subtitles);
}

// HH:MM:SS.sss
function updateTime(timeStr: string, offset: number): string {
    let date = new Date(`1970-01-01T${timeStr}Z`);
    date.setTime(date.getTime() + offset);
    return date.toISOString().substring(11, 23);
}

