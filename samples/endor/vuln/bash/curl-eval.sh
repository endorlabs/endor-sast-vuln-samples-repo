#!/bin/bash
# shellcheck disable=SC2006,SC2086,SC2116

# IMPORTANT: This file is not meant to be executed. It only serves as a test file for semgrep

# ok: curl-eval
x="foo"
eval "echo $x"

# ok: curl-eval
x="echo bar"
eval $x

# ok: curl-eval
x=$(echo echo baz)
eval $x

p=`pwd`
x=`curl -s "file://$p/script.sh"`
# ruleid: curl-eval
eval $x
# ruleid: curl-eval
eval ${x}

p=$(pwd)
x=$(curl -s "file://$p/script.sh")
# ruleid: curl-eval
eval $x
# ruleid: curl-eval
eval ${x}

# ruleid: curl-eval
eval "$(curl -s "file://$p/script.sh")"
