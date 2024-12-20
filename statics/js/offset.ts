let offsetInput = document.getElementById('offset') as HTMLInputElement;

let offset = 0;

offsetInput.onchange = () => {
    if (offsetInput.value === '') {
        offset = 0;
    }
    offset = parseInt(offsetInput.value);
    console.log("时间偏移", offset);
    loadTable(tableData, offset);
}