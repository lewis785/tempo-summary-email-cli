# Tempo Summary Email CLI

A command line interface used to generate a summary email of time recordings in tempo.

## Installation

First, make sure node is installed.

Then git clone this repo.

`cd` into the clone directory

```shell script
$ npm install
$ npm run build
$ npm link
```

## Configuring

Create a file called `config.json` using the template file `example.config.json`.

Property | Place Holder | Instructions
--- | :---: | --- 
jiraDomain | example.atlassian.net||
jiraToken | JIRA_TOKEN | [How To Generate](https://confluence.atlassian.com/cloud/api-tokens-938839638.html)
jiraUsername | example@example.com ||
tempoToken | TEMPO_TOKEN | [How To Generate](https://tempo-io.atlassian.net/wiki/spaces/KB/pages/199065601/How+to+use+Tempo+Cloud+REST+APIs)

## Usage

```shell script
$ tempo-summary-email -- help
Options:
  --version         Show version number                                [boolean]
  --help            Show help                                          [boolean]
  --today, -t       Generate summary for today                         [boolean]
  --start-date, -s  Start date [YYYY-MM-DD]                             [string]
  --end-date, -e    End date [YYYY-MM-DD]                               [string]
  --config, -c      Config filepath [string] [required] [default: "config.json"]
```

To generate a summary of today's work:
```shell script
$ tempo-summary-email -t
```

To generate a summary for a date range:
```shell script
$ tempo-summary-email -s 2019-01-01 -e 2019-01-07
```

## Development

During development it's recommend to run
```shell script
$ npm run dev
```

That way, any changes you make are automatically compiled by the TypeScript compiler

To run the build code, simply execute the js file directly:
```shell script
$ node lib/cli.js --help
```