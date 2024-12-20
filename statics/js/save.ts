let saveBtn = document.getElementById('save-btn') as HTMLButtonElement;

saveBtn.onclick = () => {
    if (subtitles.length === 0) {
        alert("请先加载字幕");
        return;
    }
    console.log("保存字幕", subtitles);

    fetch("/api/save", {
        method: "POST",
        body: JSON.stringify(subtitles),
        headers: {
            "X-CSRFToken": tokenInput.value
        }
    }).then(res => res.json())
        .then((data) => {
            console.log(data);
            if (data['code'] === 1) {
                alert("保存成功");
            } else {
                alert("保存失败：" + data['msg']);
            }
        }).catch((err) => {
        console.log(err);
        alert("保存失败：" + err);
    });
}