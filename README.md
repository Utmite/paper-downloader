# Papermc-downloader

Papermc-downloader is a CLI tool written in JavaScript that allows you to easily download Papermc versions, including the latest release. You can also download multiple versions and specify the output path.

## Installation

You can install Papermc-downloader using npm by running the following command:

```bash
npm -g install papermc-downloader
```

## Usage

To start using Papermc-downloader, simply execute the command and follow the prompts:

```bash
papermc-downloader
```

Alternatively, you can use command line options to specify the project, output path, version, release, and name:

```bash
papermc-downloader --proyect <proyect> --pathStr path1 --version <version> --release <release> --name <name>
```
Note that in the **--version** and **--release** options, you can also use the keyword **latest** to download the latest version.

This tool is particularly useful for integrating into bash scripts or creating aliases.
