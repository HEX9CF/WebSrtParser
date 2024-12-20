let fileInput = document.getElementById("file") as HTMLInputElement;
let submitBtn = document.getElementById("submit") as HTMLButtonElement;
let tokenInput = document.getElementsByName("csrfmiddlewaretoken")[0] as HTMLInputElement;
let resultTbl = document.getElementById("result") as HTMLTableElement;

submitBtn.onclick = (e) => {
    e.preventDefault()

    if (fileInput.files?.length) {
        let file = fileInput.files[0];
        let formData = new FormData();
        formData.append("file", file);
        console.log(file)

        fetch("/api/parse", {
            method: "POST",
            body: formData,
            headers: {
                "X-CSRFToken": tokenInput.value
            }
        }).then(res => res.json())
            .then((data) => {
                console.log(data);
                if (data['code'] === 1) {
                    loadTable(data['data']);
                } else {
                    alert("解析失败：" + data['msg']);
                }
            }).catch((err) => {
            console.log(err);
            alert("解析失败：" + err);
        });
    } else {
        alert("请选择文件");
    }
};

function loadTable(data: any[]) {
    let tbody = resultTbl.getElementsByTagName("tbody")[0] as HTMLTableSectionElement;

    data.forEach((item) => {
        let row = tbody.insertRow();
        row.insertCell(0).innerText = item['index'];
        row.insertCell(1).innerText = item['start_time'];
        row.insertCell(2).innerText = item['end_time'];
        row.insertCell(3).innerText = item['content'];
    })
}