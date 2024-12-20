import json

from django.http import JsonResponse

from model.resp import Resp
from model.subtitle import Subtitle
from utils.file import save_srt
from utils.parser import parse_srt

def parse(request):
    if request.method == "POST":
        if "file" not in request.FILES:
            resp = Resp(0, "请上传文件", None)
            return JsonResponse(resp.__dict__)

        file = request.FILES["file"]
        print("上传文件：", file.name)
        if file.name.split(".")[-1] != "srt":
            resp = Resp(0, "请上传srt文件", None)
            return JsonResponse(resp.__dict__)

        # print(file.read())
        subtitles = parse_srt(file)
        print("解析成功")

        data = []
        for subtitle in subtitles:
            data.append(subtitle.__dict__)
            # print(subtitle.__dict__)
        resp = Resp(1, "OK", data)
        return JsonResponse(resp.__dict__)
        # return HttpResponse("解析成功")

    resp = Resp(0, "请求方式错误", None)
    return JsonResponse(resp.__dict__)

def save(request):
    if request.method == "POST":
        subtitles = []
        try:
            data = json.loads(request.body)
            for item in data:
                subtitle = Subtitle(
                    index=item["index"],
                    start_time=item["start_time"],
                    end_time=item["end_time"],
                    content=item["content"]
                )
                subtitles.append(subtitle)
                # print(subtitle.__dict__)

            save_srt(subtitles)
            resp = Resp(1, "OK", None)
            return JsonResponse(resp.__dict__)

        except Exception as e:
            print(e)
            resp = Resp(0, e, None)
            return JsonResponse(resp.__dict__)

    resp = Resp(0, "请求方式错误", None)
    return JsonResponse(resp.__dict__)
