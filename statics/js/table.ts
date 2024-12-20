let resultTbl = document.getElementById("result") as HTMLTableElement;

let tableData:[] = []

function loadTable(data: any[], offset: number) {
    let tbody = resultTbl.getElementsByTagName("tbody")[0] as HTMLTableSectionElement;
    tbody.innerHTML = "";

    console.log("加载表格", data, offset);
    data.forEach((item) => {
        let row = tbody.insertRow();
        row.insertCell(0).innerText = item['index'];
        row.insertCell(1).innerText = formatTime(item['start_time'], offset);
        row.insertCell(2).innerText = formatTime(item['end_time'], offset);
        row.insertCell(3).innerText = item['content'];
    })
}

// HH:MM:SS.sss
function formatTime(timeStr: string, offset: number): string {
    let date = new Date(`1970-01-01T${timeStr}Z`);
    // 偏移量为毫秒
    date.setMilliseconds(date.getMilliseconds() + offset);
    return date.toISOString().substring(11, 23);
}

