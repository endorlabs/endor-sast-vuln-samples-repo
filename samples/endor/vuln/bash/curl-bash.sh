#!/bin/bash
# shellcheck disable=SC2006,SC2086,SC2116

# IMPORTANT: This file is not meant to be executed. It only serves as a test file for semgrep

# ok: curl-bash
x="foo"
bash -c "echo $x"

p=`pwd`
# ruleid: curl-bash
curl -s "file://$p/script.sh" | bash -x

# ruleid: curl-bash
bash <(curl -s "file://$p/script.sh")

# ruleid: curl-bash
/bin/csh <(curl -s "file://$p/script.sh")

# ok: curl-bash
curl -s "file://$p/script.sh" | cat

# ruleid: curl-bash
curl -s "file://$p/script.sh" | cat | cat | cat | bash -x

# ruleid: curl-bash
curl -s "file://$p/script.sh" | cat | cat | cat | /bin/bash -x

# ruleid: curl-bash
curl -s "file://$p/script.sh" | cat | cat | cat | /bin/zsh -x

# ruleid: curl-bash
curl -s "file://$p/script.sh" | cat | cat | cat | ksh -x
