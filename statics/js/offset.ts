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
    loadTable(tableData, offset);
}