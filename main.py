from utils.parser import parse_srt

file_path = "data/subtitle.srt"

file = open(file_path, mode="r")
# print(file.read())

def main():
    subtitles = parse_srt(file)
    # print(subtitles)
    for subtitle in subtitles:
        print(subtitle.__dict__)

if __name__ == "__main__":
    main()