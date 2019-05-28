# CEPSparker

  *** Note: this is work-in-progress. Documentation is quite incomplete.

--

Starter project for developing CEP panels to be used with Adobe applications

© 2018-2019, Rorohiko Ltd. - Kris Coppieters
kris@rorohiko.com

v1.0.4, May 28, 2019

## Preamble

The goal of this project is to reduce the treshold to 'get started' building CEP panels.

The approach I've taken is to provide you with a ready-to-run panel with all its 
source code.

In addition there is a lot of developer infrastructure code (helpers scripts) which 
help with tasks like installing, debugging, reading log files...

Most of the helper scripts are human-readable command line scripts (.command on Mac, .bat on Windows). 

These helpers are all written in such a way that they are easy to inspect and analyze. They also serve as a way to explain and document the development processes.
 
I know from experience how disheartening it is to find some useful sample code, 
and then get mired into all kinds of issues trying to install various tools 
that are needed in order to get a simple bit of sample code to run.

To avoid that, I've also tried my best to keep external dependencies 
to the absolute minimum.

This package should allow you to get going with the following minimal 
dependencies:

- Adobe Creative Cloud CC 2014 or higher
- Mac OS X 10.9 or Windows 7.x or higher
- A text editor
- Google Chrome browser, Google Chromium, or cefclient

Stuff you need to understand to make sense of things:

https://github.com/zwettemaan/CEPSparker/wiki/The-Lie-Of-The-Land

Warning: you must read and mentally ingest the information below. 
You should complete the 'whirlwind tour' at least once.

Otherwise, you **will** get stuck.

The CEPSparker.zip file contains a **precursor** to the project.

In other words: the CEPSparker.zip file you download from this GitHub repository 
**does not provide you with a starter project straight away**.
 
To convert the precursor into a real project, you need to run
the _CEPSparkerConfig_ configuration tool. 

Also: make sure to use the Wiki!

https://github.com/zwettemaan/CEPSparker/wiki

## Security Hurdles

### Mac

If you are on a Mac, you also will need to jump through one additional 
hoop, in order to work with the Mac's heightened security defenses. 

Otherwise the Mac will not allow _CEPSparkerConfig_ to run properly. 

Make sure to correctly run 'initialSetupConfigApp.command'.

See 'Whirlwind Tour On A Mac' further below.

### Windows

If you are on a Windows PC, you will need to run most commands from an elevated 
command prompt ('Run as Administrator'). 

The Windows\sudo.bat file provides you with a quick way to get to such a command prompt.

See 'Whirlwind Tour On Windows' further below.

## CEPSparkerConfig

_CEPSparkerConfig_ is a simple-minded convenience app. 

_CEPSparkerConfig_ allows you to select between some options, and to set some preferences. 

Based on these configuration options, _CEPSparkerConfig_ will read some template files, 
customize them, and then set up the starter project for you.

The project is then ready to be installed, debugged, tweaked...

_CEPSparkerConfig_ does not contain esoteric 'magic'. Source code to this application is provided
in the CEPSparker.zip file ('ToolSources').

_CEPSparkerConfig_ will parse the content of the _Templates_ subfolder,
do some simple search-and-replace, and some text preprocessing on the text files 
that live in this subfolder, and will then build up your starter project.

You can run _CEPSparkerConfig_ **only once** for any particular project. 

If you want to start over with a clean slate, you need to go back to the downloaded 
.zip file.

## Getting Started

I attempted to make everything self-explanatory and well documented.

You can start by ignoring most of the stuff in the _CEPSparker_ folder 
(i.e. don't pay attention to the man behind the curtain).

As your familiarity with CEP grows, you can start analyzing the various tools 
provided, and tweak or replace them with your own.

We'll start with a very quick whirlwind tour, to give you a feel for the process.

Elsewhere in the documentation, I have a 'cookbook' sections 
which discusses everything in much more detail, and we'll go through the motions
a few more times in increasingly more detail.

There are two separate 'whirlwind tour' sections below: one for Mac, one for Windows.

### Whirlwind Tour On A Mac

Cookbook for generating, installing and running the panel:

https://github.com/zwettemaan/CEPSparker/wiki/A-Whirlwind-Tour-on-Mac

### Whirlwind Tour On Windows

Cookbook for generating, installing and running the panel:

https://github.com/zwettemaan/CEPSparker/wiki/A-Whirlwind-Tour-on-Windows

### Debugging

Cookbooks for debugging different aspects of the panel:

https://github.com/zwettemaan/CEPSparker/wiki/Debugging-Cookbooks

### Uninstalling the extension

https://github.com/zwettemaan/CEPSparker/wiki/Uninstalling

## CEPSparkerConfig

https://github.com/zwettemaan/CEPSparker/wiki/CEPSparkerConfig

## Finding your way around

Before trying to start editing this panel, you need to be able to find your way 
around. 

In order to help you with that, there is a script called `setupLocalLinks`

#### Mac

Double-click the

    Mac/setupLocalLinks.command

script.

#### Windows

Run the clean.bat script from the shell with administrative permissions.

First double-click 

    Windows/sudo.bat

Then type

    setupLocalLinks

followed by &lt;Enter&gt;

#### LocalLinks

A LocalLinks folder will be created.

It contains a few aliases or shortcuts to important folder
on your system. You'll often need to visit these folders, so having quick access
to them is helpful.

If the links become broken, simply delete the _LocalLinks_ folder and re-run 
the `setupLocalLinks` script.

## Next Steps

Please check the Wiki for more cookbooks:

https://github.com/zwettemaan/CEPSparker/wiki

As you get more familiar with the workflow, you'll probably want to 
abandon the command-line scripts in the _Mac_ and _Windows_ folders,
and replace them with a more advanced build tool. 

For my own projects I use _ant_, but that's just a matter of personal preference
and familiarity. You can just as well use a variant of _make_, or _grunt_ or _gulp_
or whatever build tool works best for you.

