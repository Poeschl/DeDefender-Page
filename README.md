# DeDefender

Just a simple webpage stored in a html file.
It has an input box which accepts an url which is protected by Microsoft Cloud Defender and unpacks it.
Those urls can be retrieved by the Office 365 Outlook or Teams.

![The ui of DeDefender](doc/overview.png)

## Features

* Shortens any Link to a short-code with at least 6 characters or to a long one (length of 1024 chars).
* Allows tracking of the link click via Plausible
* Defender-Mode - Forwards the user to a few "Checking link" pages. "Like a defender does"

## Install

1. Download the singe-file-application from [here]()
2. Open it in your browser
3. Use it

## Note

This software will get no versioning and lives on the bloody main branch.

## Development

For development there is a little script in the project root named `start_dev_env.sh`.
Executing it as well as `.gradlew backend:bootRun` (from project root) and `npm run dev` (from the `frontend` folder)
will set up the local environment on http://localhost:8888.
