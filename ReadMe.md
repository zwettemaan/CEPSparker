# CEPSparker

  **** NOTE: THIS PROJECT IS INCOMPLETE. USE WITH EXTREME CARE. NO WINDOWS SUPPORT JUST YET

--

Starter project for developing CEP panels to be used with Adobe applications

© 2018, Rorohiko Ltd. - Kris Coppieters
kris@rorohiko.com

v1.0, June 23, 2018

## Preamble

The goal of this project is to reduce the treshold to 'get started' building CEP panels.

The approach I've taken is to provide you with a ready-to-run panel with all its 
source code, as well as a lot of developer infrastructure code (helpers) which 
help with tasks like installing, debugging, reading log files...

The helpers are all written in such a way that they are easy to inspect and 
analyze. 

They also serve as a way to explain and document the development 
processes.
 
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
- Google Chrome browser

Note: the .zip file you download from GitHub initially does not contain the starter project.

Instead, it contains a precursor to the project. 

You will first use the _CEPSparkerConfig_ configuration tool to make some choices 
and set some preferences. 

Based on these configuration options, the _CEPSparkerConfig_ will then provide you 
with the starter project.

You will only be able to run _CEPSparkerConfig_ once for any particular project. 

If you want to start over with a clean slate, you need to go back to the downloaded .zip file.

Note that _CEPSparkerConfig_ is a simple-minded convenience app. 

It does not contain esoteric 'magic'.

_CEPSparkerConfig_ will read the content of the Templates folder, 
do some simple search-and-replace and some text preprocessing on the text files 
that live inside the Templates folder, and will set up your starter project.

The project is then ready to be installed and/or tweaked.

I attempted to make everything self-explanatory and well documented.

You can start by ignoring most of the stuff in the _CEPSparker_ folder initially 
(i.e. don't pay attention to the man behind the curtain).

As your familiarity with CEP grows, you can start analyzing the various tools 
provided, and tweak or replace them with your own.

The panel is set up to run with as wide a range of applications and 
CEP versions as possible.

## Getting Started


## Getting Started On Mac

First a very quick whirlwind tour.

Further down in this document, I have a 'cookbook' section 
which discusses everything in much more detail.

On a Mac, there are a few hoops to jump through: recent versions of Mac OS X
are very security-conscious, and this sample project triggers a few security measures.

Download and decompress the .zip file from GitHub:

https://github.com/zwettemaan/CEPSparker/archive/master.zip

Look in the _Mac_ subfolder.

### De-quarataine _CEPSparkerConfig_

Right-click the command-line script

    Mac/initialSetupConfigApp.command

and select 'Open' from the context menu. 

Allow the script to run (be careful - the buttons are positioned in unexpected places and
it is easy to get confused and click 'Cancel' button without noticing).

This script will 'de-quarantaine' _CEPSparkerConfig_, telling Mac OS X it is OK to run this app without setting up a protective sandbox. If you forget to do this, _CEPSparkerConfig_ will end up running in a 'sandbox' where it does not have access to the rest of the unzipped information.

You will need to close the Terminal window afterwards.

### Generate the project from the templates

Double-click the
 
    CEPSparkerConfig

icon. You will now be presented with a table where you can configure some important values. 

If you're only trying things out, you can leave all options unchanged and click 'Generate' immediately.

If you're getting ready to build a 'real' CEP panel, you do need to change the dummy default values into
'real' values. Check the cookbook further down, where I'll discuss all the options in detail.

One important value to pay attention to is the port number. This port number is used for debugging.

You might have multiple CEP panels installed, and in order to debug all of them, each needs a unique network port
number. 

The default presented is 8888. If you are dealing with multiple panels, make sure to give each panel a different port number.

### Install the extension

Right-click the

    Mac/localDebugInstall.command

script, and select 'Open'. 

Allow the script to run (be careful - the buttons are positioned in unexpected places and
it is easy to get confused and click 'Cancel' button without noticing).  

You will need to close the Terminal window afterwards.

This script will set the CEP debug flag, which allows you to run the extension without having a proper code signature.

Then the script will create a subfolder for the extension in

    ~/Library/Application Support/Adobe/CEP/extensions

In this subfolder, a number of symbolic links will be created that lead back to the source folders for the panel.

This approach avoids making extra copies of the extension source code. 

There is only one copy of the source code files in existence, and it is 'hot-linked' to the Adobe extensions folder, so the target app will load the extension when it is restarted.

Launch your target application and check under 'Window - Extensions'. 

The extension should be listed, and the panel should appear when you select the menu item.

### Debug the extension

Point your Chrome browser or cefclient to http://localhost:8888 
(replace 8888 with whatever port you used in the _CEPSparkerConfig_ configuration screen).

## CEPSparkerConfig

_CEPSparkerConfig_ is an app written in Xojo.

For reference, all source code is provided, but the ready-to-run application is included
in the .zip file; there is no need to build this app yourself.

I used Xojo so I can easily provide WYSIWYG apps for Mac and Windows. 

Furthermore, _CEPSparkerConfig_ does not contain any 'secret sauce'. You can easily perform the same
tasks manually.

_CEPSparkerConfig_ will:

    - search the text files under _Templates_ for placeholder patterns `$$PLACEHOLDER$$`
    - show the placeholders with some default values to the user
    - allow the user to tweak stuff
    - when the user clicks 'Generate', do a search-and-replace with the user-provided placeholder replacements 
    - depending on the user selection, it will also select between multiple variants of some key files. For example, there are multiple manifest.xml files in the Templates folder, and depending on the CEPVERSION selected, one of them will be picked.
	- process conditional expressions, very similar to how a C preprocessor works, but using '$include/$if' (with a dollar sign) instead of '#include/#if'. I am using a '$' instead of a '#' prefix to avoid clashes with the use of #include in ExtendScript.
    
After this, the project is ready to install and/or tweak.

## Finding your way around

Before trying to run this panel, you need to be able to find your way 
around. 

In order to help you with that, there is a script called `setupLocalLinks`

There is a Mac version in the _Mac_ folder and a Windows version in the _Windows_
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

## Next Steps

As you get more familiar with the workflow, you'll probably want to 
abandon the command-line scripts in the _Mac_ and _Windows_ folders,
and replace them with a more advanced build tool. 

For my own projects I use _ant_, but that's just a matter of personal preference
and familiarity. You can just as well use a variant of _make_, or _grunt_ or _gulp_
or whatever build tool works best for you.

## Debugging

### Clear the log folder

Before starting a debug session, you might want to clear the contents of the
_Adobe_LogFiles_ folder (look inside the _LocalLinks_ folder. If you don't see
_LocalLinks_, run the `SetupLocalLinks` script).

When you try running your panel and things go badly wrong, you might not
even get to the point where you can use the debugger. 

If and when that happens, there might be some information in this folder.

Clearing the whole folder will avoid getting drowned in old log info.

For CC 2013, it is 4.0
for CC 2014, it is 5.0
