let fileInput = document.getElementById("file") as HTMLInputElement;
let tokenInput = document.getElementsByName("csrfmiddlewaretoken")[0] as HTMLInputElement;

fileInput.onchange = () => {
    if (fileInput.files?.length) {
        let file = fileInput.files[0];
        let formData = new FormData();
        formData.append("file", file);
        console.log("上传文件", file.name);

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
                    subtitles = data['data'];
                    loadTable(subtitles);
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
