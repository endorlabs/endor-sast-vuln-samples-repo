Default Semgrep rules for `endorctl` SAST scans reside in this repository. This includes rules authored by Endor Labs and ones from 3rd parties.

__Important__: Proper attribution of rules authored by 3rd parties is ensured through
- including the license and a link to the upstream repository and rule in the rule metadata,
- maintaining leading comments with license and copyright information in the YAML files, and
- including separate copyright notices and license files in the respective 3rd party subfolders.

# Directory structure

The directory structure looks as follows, whereby:
- Rules and samples are kept in separate directories
- Content authored by 3rd parties resides in subdirectory `3p`, whereby content from Endor Labs resides in `endor`
- The directory structure for 3rd party rules follows the one from the Git repository they have been sourced from
- The directory structure for rules from Endor Labs depends on
  - `<category>`: one of `vuln`, `malware` or `api`
  - `<lang>`: one of `java`, `js`, `py` or `gen` (for cross-language rules)

```bash
.
├── rules
│   ├── 3p
│   │   └── <3rd-party>
│   │       └── <dir-structure-from-remote-repo>
│   └── endor
│       └── <category>
│           └── <lang>
│               └── <lang>-<rule-id>.yaml
└── samples
    ├── 3p
    │   └── <3rd-party>
    └── endor
        └── <category>
            └── <lang>
                └── <lang>-<rule-id>.<ext>
```

# Statistics

![No. of rules per OWASP Top 10](stats/rules_per_language_owasp.svg)

![No. of rules per language and category](stats/rules_per_language_category.svg)

![No. of rules per technology](stats/rules_per_technology.svg)

![No. of rules per language and confidence](stats/rules_per_language_confidence.svg)

![No. of 3rd party rules per language and license](stats/3p_rules_per_language_license.svg)


# Anomalies

The following charts and CSV files describe anomalies and shortcomings that should be addressed to improve rule quality:

| File/link | Description |
| --- | --- |
| todo | YAML files with more than 1 rule |
| todo | vulnerability rules with identical `description` |
| todo | vulnerability rules with `TODO` in `cwe` or `description` |
| [rules_without_confidence.csv](stats/rules_without_confidence.csv) | rules without `confidence` |
| [vuln_rules_without_cwe.csv](stats/vuln_rules_without_cwe.csv) | vulnerability rules without `cwe` |
| [vuln_rules_with_many_cwes.csv](stats/vuln_rules_with_many_cwes.csv) | vulnerability rules with more than one `cwe` |
| [vuln_rules_without_owasp_top10.csv](stats/vuln_rules_without_owasp_top10.csv) | vulnerability rules with a `cwe` that is not part of the OWASP Top 10 |

# Adding Rules

__Mandatory rule metadata__ to ensure correct processing and display:
- `confidence`: the confidence in the finding (`LOW`, `MEDIUM` or `HIGH`)
- `cwe`: a list of one or more strings in the form `CWE-xxx: Name` (only for category `vulnerability`)
- `description`: a short, user-facing description of the rule
- `endor-category`: one of `critical-api`, `malware-detection`, or `vulnerability`
- `endor-rule-origin.license`: the license of a 3rd party rule (or `none` if no corresponding information can be found in the upstream repository)
- `endor-rule-origin.url`: the Git URL including the commit hash that last touched the respective file in the upstream repository
- `endor-targets`: always `ENDOR_TARGET_REPOSITORY` for the time being
- `version`: a semantic version identifier
- `technology`: should be set in case a rule targets a specific technology, library or framework (not the programming language, which would be redundant with `languages`)
   - Vue.js
   - Express
   - Angular
   - React
   - Spring
   - Spring Boot
   - Flask
   - Django

__Pull Requests and CI__:
A pull request needs to be raised and the CI checks have to be passed before it gets merged. The current settings require the approval of 1 reviewer for the PR to be merged.
A set of checks is triggered with each commit. All checks need to pass for a PR to be merged. Those tests include:
 - Semgrep validation: runs checks against all rules for errors
 - Semgrep tests: runs all rules against the samples provided
 - Proto validation: runs tests to ensure that the rules adhere to the protocol buffer specification from Endor Labs as defined [here](https://docs.endorlabs.com/api/#tag/SemgrepRuleService/operation/SemgrepRuleService_CreateSemgrepRule).
 - Duplicate detection: runs tests to ensure that the rules don't create duplicate results.


## From 3rd party

3rd party rules must be sourced using the Python script `fetch-3p-rules.py`, to make sure that the above-mentioned metadata is auto-generated where possible.

__Prerequisites__:
```
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r bin/requirements.txt
```

__Import/Update__:
```
python3 bin/fetch-3p-rules.py --repo <URL of upstream repo> --clone-into .tmp --license <SPDX license identifier> --third-party <3rd-party> --repo-subdir <subdirectory in upstream repo> --copyright-notice <file in upstream repo>
```

The script downloads rule and sample files to `rules/<3rd-party>/<name>` and `samples/<3rd-party>/<name>`, whereby the `<name>` is specified with option `--third-party`, and should correspond to the name of the GitHub/GitLab organization or repository name.

__License and copyright__:
- The open source license of the rule must be specified as [SPDX license identifier](https://spdx.org/licenses/) using `--license`. If the license identifier needed is not yet present among the choices, add it in the script.
- Additionally, the file containing the original copyright notice must be included with `--copyright-notice`. It will be copied into `rules/<3rd-party>/<name>`.

__Rule versioning__: The script loops over all files in the respective repo and subfolder (if any, specified with `--repo-subdir`) and checks whether the files already exist in the rules or samples subfolders of the monorepo:
- If not, the file is copied and `metadata.version` is set to `v1.0.0`.
- If yes, it compares the commit hash of the file in the upstream repo with the commit hash in the metadata field `endor-rule-origin.url` of the existing file. If the commits are identical, the file is not copied. If they are different, the file is copied and `metadata.version` is bumped.

__CWE and description__: The rules in the upstream repository may not have CWE metadata or a proper description. In such cases, the script adds them with a `TODO` in the YAML files. Search and fix those manually to meet the above-described metadata requirements.

3rd party rules from __GitLab__:

```
python3 bin/fetch-3p-rules.py --repo https://gitlab.com/gitlab-org/security-products/sast-rules --clone-into .tmp --license MIT --third-party gitlab --copyright-notice LICENSE --repo-subdir c
python3 bin/fetch-3p-rules.py --repo https://gitlab.com/gitlab-org/security-products/sast-rules --clone-into .tmp --license MIT --third-party gitlab --copyright-notice LICENSE --repo-subdir java
python3 bin/fetch-3p-rules.py --repo https://gitlab.com/gitlab-org/security-products/sast-rules --clone-into .tmp --license MIT --third-party gitlab --copyright-notice LICENSE --repo-subdir javascript
python3 bin/fetch-3p-rules.py --repo https://gitlab.com/gitlab-org/security-products/sast-rules --clone-into .tmp --license MIT --third-party gitlab --copyright-notice LICENSE --repo-subdir python
python3 bin/fetch-3p-rules.py --repo https://gitlab.com/gitlab-org/security-products/sast-rules --clone-into .tmp --license LGPL-3.0-only --third-party gitlab --repo-subdir rules/lgpl/javascript --copyright-notice rules/lgpl/LICENSE
```

3rd party rules from __akabe1__:
```
python3 bin/fetch-3p-rules.py --repo https://github.com/akabe1/akabe1-semgrep-rules --clone-into .tmp --license GPL-3.0-or-later --copyright-notice README.md --third-party akabe1 --repo-subdir java/xxe

```

3rd party rules from __chenlvtang__:

```
python3 bin/fetch-3p-rules.py --repo https://github.com/chenlvtang/MySemgrepRules --clone-into .tmp --license none --third-party chenlvtang --repo-subdir file-path-traversal
```

3rd party rules from __0xdea__:

```
python3 bin/fetch-3p-rules.py --repo https://github.com/0xdea/semgrep-rules --clone-into .tmp --repo-subdir c --third-party 0xdea --license MIT --copyright-notice LICENSE
```

## From Endor Labs

What we expect with a new rule:
**Do not look at external semgrep rules for reference.**
**AI usage from ChatGPT or Co-pilot is completely acceptable and encouraged but it should also be human reviewed**

- All commits must be signed
- A new rule should be added to the appropriate category and language directory.
- There should only be one Semgrep rule per YAML file. 
- The rule-id should be names using the following format: **\<lang\>-\<name\>**, for example:
   - java-http-repo
- The file should be named using the following format: **\<rule-id\>.yaml**, for example:
   - java-http-repo.yaml
- The test target file should be named in the same way with the appropriate file extension, for example:
   - java-http-repo.xml
- The rule needs to adhere to the Semgrep syntax. [This page](https://semgrep.dev/docs/writing-rules/rule-syntax) describes the mandatory fields for a semgrep rule.
- Every vulnerability-related rule must also have the metadata field `cwe` (cf. [Semgrep documentation](https://semgrep.dev/docs/contributing/contributing-to-semgrep-rules-repository#including-fields-required-by-security-category)). This CWE will be the basis for creating different categories and subcategories that can be used for selecting a subset of Semgrep rules for a given scan or in the UI. Example categories or TOP-X lists like OWASP Top-10 or CWE Top-25 (cf. [example categories](https://cwe.mitre.org/scoring/index.html#top_n_lists)).
- Each rule should also adhere to the Endor Labs' supported grammar defined [here](https://docs.endorlabs.com/api/#tag/SemgrepRuleService/operation/SemgrepRuleService_CreateSemgrepRule).
- The metadata field `message` must be spell-checked, to make sure it can be shown as-is in our UI. Consider [those advices](https://semgrep.dev/docs/contributing/contributing-to-semgrep-rules-repository#rule-messages) regarding high-quality rule messages. Moreover, the message must not contain any metavariables. The message should also contain descriptive but general advice how how this type of rule should impacts a user, why and how it should be resolved.


