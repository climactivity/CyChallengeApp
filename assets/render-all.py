# open the current dir and render all .blend files

import os
from pathlib import Path
for file in os.listdir():
    if file.endswith(".blend"):
        # make a dir for output if not exists
        path = Path(file)
        if not os.path.exists(path.stem):
            os.makedirs(path.stem)
        # start blender from cli
        os.system("blender -b " + file + " -f 180 -o " + path.stem + "")
        print("Rendered: " + file)
    else:
        print("Skipped: " + file)

print("Done!")
