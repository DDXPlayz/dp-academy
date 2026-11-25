#!/bin/sh
# compact candidate list for several topics: sh scripts/sug.sh physics a3-work-energy-power a4-rigid-body
subj=$1; shift
for t in "$@"; do echo "=== $t"; python -I -X utf8 scripts/suggest_figures.py $subj $t --per 3 | grep -E '::|#[0-9]' | sed -E 's#^  (\#[0-9]+) .*$#\1#; s#\.md :: ##' | paste -sd' ' | sed 's/ \([0-9][0-9]-\)/\n\1/g'; done
