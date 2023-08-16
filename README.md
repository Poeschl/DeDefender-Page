# DeDefender

Just a simple webpage stored in a html file.
It has an input box which accepts an url which is protected by Microsoft Cloud Defender and unpacks it.
Those urls can be retrieved by the Office 365 Outlook or Teams.

![The ui of DeDefender](doc/overview.png)

## Features

* Unwraps Urls from the Microsoft Cloud Defender

## Use from GitHub Pages

1. Goto https://poeschl.github.io/DeDefender-Page
2. Use it

## Install locally

1. Download the singe-file-application as `dedefender.html` from [here](https://github.com/Poeschl/DeDefender-Page/raw/gh-pages/index.html)
2. Open it in your browser
3. Use it

## Note

This software will get no versioning and lives on the bloody main branch.

## Development

For development there is a little script in the project root named `start_dev_env.sh`.
Executing it as well as `.gradlew backend:bootRun` (from project root) and `npm run dev` (from the `frontend` folder)
will set up the local environment on http://localhost:8888.
