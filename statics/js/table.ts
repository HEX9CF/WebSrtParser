let resultTbl = document.getElementById("result") as HTMLTableElement;

interface ISubtitle {
    index: number;
    start_time: string;
    end_time: string;
    content: string;
}

let subtitles: ISubtitle[] = []

function loadTable(data: any[]) {
    let tbody = resultTbl.getElementsByTagName("tbody")[0] as HTMLTableSectionElement;
    tbody.innerHTML = "";

    console.log("加载表格", data, offset);
    data.forEach((item) => {
        let row = tbody.insertRow();
        row.insertCell(0).innerText = item['index'];
        row.insertCell(1).innerText = formatTime(item['start_time']);
        row.insertCell(2).innerText = formatTime(item['end_time']);
        row.insertCell(3).innerHTML = item['content'];
    })
}

// HH:MM:SS.sss
function formatTime(timeStr: string): string {
    let date = new Date(`1970-01-01T${timeStr}Z`);
    return date.toISOString().substring(11, 23);
}

