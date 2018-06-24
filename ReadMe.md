# CEPSparker

  **** NOTE: THIS PROJECT IS INCOMPLETE. DO NOT TRY TO USE IT YET

Starter project for developing CEP panels to be used with Adobe applications

© 2018, Rorohiko Ltd. - Kris Coppieters
kris@rorohiko.com

v1.0, June 23, 2018

## Preamble

The goal is to reduce the treshold to 'get started' building CEP panels.

The approach I've taken is to provide a ready-to-run panel with all its 
source code, as well as a lot of infrastructure code (helpers) which 
help with tasks like installing, debugging, reading log files,...

The helpers are all written in a way that is easy to inspect and 
analyze, so they also serve as a way to explain and document the development 
processes.
 
I know from experience how disheartening it is to find some useful sample code, 
and then get mired into all kinds of issues trying to install various tools 
that are needed in order to get a simple bit of sample code to run.

To avoid that, I've also tried my best to keep external dependencies 
to the absolute minimum.

This package should allow you to get going with the following minimal 
dependencies:

- Adobe Creative Cloud CC 2014 or higher
- A text editor
- Mac OS X 10.9 or Windows 7.x or higher

To get started, simply decompress the .zip file and run the configuration app
_CEPSparkerConfig_. Mac and Windows versions of _CEPSparkerConfig_ are provided.

_CEPSparkerConfig_ is a simple-minded convenience app. It does not contain any 
esoteric 'magic'.

_CEPSparkerConfig_ will grab the content of the Templates folder, 
do some simple search-and-replace on the text files below the 
Templates folder, and set up your starter project.

The project is then ready to be installed and/or tweaked.

I attempted to make everything self-explanatory and well documented.

You can start by ignoring most of the stuff in the CEPSparker folder initially 
(i.e. don't pay attention to the man behind the curtain).

As your familiarity with CEP grows, you can start analyzing the various tools 
provided, and tweak or replace them with your own.

The panel is set up to run with as wide a range of applications and 
CEP versions as possible.

## CEPSparkerConfig

_CEPSparkerConfig_ is written in Xojo (sources are provided). 

I used Xojo so I could easily provide WYSIWYG apps for Mac and Windows. 

However, the _CEPSparker_ project is not dependent on Xojo: _CEPSparkerConfig_
does not contain any 'secret sauce' and you can easily perform the same
tasks manually.

All _CEPSparkerConfig_ does is:
    - search the text files under _Templates_ for placeholder patterns `$$PLACEHOLDER$$`
    - show the placeholders with some default values to the user
    - allow the user to tweak stuff
    - do a search-and-replace with the user-provided placeholder replacements 

After this, the project is ready to install and/or tweak.

## Finding your way around

Before trying to run this panel, you need to be able to find your way 
around. 

In order to help you with that, there is a script called `setupLocalLinks`

There is a Mac version in the _Mac_ folder and a Windows version in the _Win_
folder

The Mac version is called `setupLocalLinks.command`. The Windows version is 
called `setupLocalLinks.bat`.

Double-click the correct one, and you should end up with a new folder called 
_LocalLinks_. 

This folder contains a few aliases or shortcuts to important folder
on your system. You'll often need to visit these folders, so having quick access
to them is helpful.

If the links become broken, simply remove the _LocalLinks_ folder and re-run 
the `setupLocalLinks` script.

## Getting it to run

First open up the file called `ProjectConfig.txt` and adjust it; the file contains
some sample placeholder values. 

Then run the `setupProject` script.

## Debugging

### Clear the log folder

Before starting a debug session, you might want to clear the contents of the
_Adobe_LogFiles_ folder (look inside the _LocalLinks_ folder. If you don't see
_LocalLinks_, run the `SetupLocalLinks` script).

When you try running your panel and things go badly wrong, you might not
even get to the point where you can use the debugger. 

If and when that happens, there might be some information in this folder.

Clearing the whole folder will avoid getting drowned in old log info.


