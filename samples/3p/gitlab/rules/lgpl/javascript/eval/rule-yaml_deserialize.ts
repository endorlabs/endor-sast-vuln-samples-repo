// License: GNU Lesser General Public License v3.0
// source (original): https://github.com/ajinabraham/njsscan/blob/master/tests/assets/node_source/true_positives/semantic_grep/eval/eval_yaml_deserialize.js
// hash: e7a0a61
var untrusted_code = '"toString": !<tag:yaml.org,2002:js/function> "function (){very_evil_thing();}"';
var notneeded = 1;
// I'm just converting that string, what could possibly go wrong?
import yaml from 'js-yaml';

// ruleid:rules_lgpl_javascript_eval_rule-yaml-deserialize
yaml.load(untrusted_code)

// ok:rules_lgpl_javascript_eval_rule-yaml-deserialize
x.load(untrusted_code)
