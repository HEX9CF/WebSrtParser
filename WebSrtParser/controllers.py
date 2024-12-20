from django.http import HttpResponse, JsonResponse

from model.resp import Resp
from utils.parser import parse_srt

def parse(request):
    if request.method == "POST":
        if "file" not in request.FILES:
            return HttpResponse("请上传文件")

        file = request.FILES["file"]
        print("上传文件：", file.name)
        if file.name.split(".")[-1] != "srt":
            return HttpResponse("请上传有效的srt文件")

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

    return HttpResponse("请求方式错误")

