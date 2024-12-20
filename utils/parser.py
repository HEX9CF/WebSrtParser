import re

from model.subtitle import Subtitle

HOUR = r"[0-9]{2}"
MINUTE = r"[0-5][0-9]"
SECOND = r"[0-5][0-9]"
MILLISECOND = r"[0-9]{3}"
TIMESTAMP = fr"{HOUR}:{MINUTE}:{SECOND},{MILLISECOND}"
TIME = fr"{TIMESTAMP} --> {TIMESTAMP}"
CONTENT = r".*"

def parse_srt(file):
    subtitles = []
    subtitle = Subtitle()

    for line in file.readlines():
        line = line.strip()
        if not line:
            if subtitle and subtitle.index != -1:
                subtitles.append(subtitle)
                subtitle = Subtitle()
            continue

        if line.isdigit():
            subtitle.index = int(line)
        elif re.match(TIME, line):
            start_time, end_time = line.split(' --> ')
            subtitle.start_time = start_time
            subtitle.end_time = end_time
        else:
            if subtitle.content == "":
                subtitle.content = line
            else:
                subtitle.content += '\n' + line

    if subtitle and subtitle.index != -1:
        subtitles.append(subtitle)

    return subtitles




