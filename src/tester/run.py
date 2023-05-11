import sys
from pathlib import Path
import subprocess
import os

class flags:
    path = "-path"
    help = "-help"
    quiet = "-quiet"
    timer = "-timer"

def get_dir_name(argv):
    for i in range(len(argv)):
        if argv[i] == flags.path:
            if len(argv) > i + 1:
                return argv[i + 1]
            else:
                raise ValueError('The ' + flags.path + ' flag requires a path immediately following.')
    return os.getcwd() + "/src"

def run_tests(argv):
    dirname = get_dir_name(argv)

    quiet_flag_included = flags.quiet in argv
    timer_flag_included = flags.timer in argv
    
    print("Searching for test files in " + dirname)
    paths = Path(dirname).glob('**/*.spec.ts',)

    quiet = [flags.quiet] if quiet_flag_included else []
    timer = [flags.timer] if timer_flag_included else []
    
    # iterating over all files
    for test_file_path in paths:
        subprocess.run(["npx", "ts-node-dev", test_file_path] + quiet + timer)
 
argv = sys.argv
if flags.help in argv:
    print(
        flags.help + '\t\t\t\tTake a wild guess\n' +
        flags.path +' <absolute path>\t\tLimits tests to specified (absolute) path\n' +
        flags.quiet + '\t\t\t\tSkips unnecessary output\n' +
        flags.timer + "\t\t\t\tDisplays time taken for tests"
    )
else:
    run_tests(argv)
