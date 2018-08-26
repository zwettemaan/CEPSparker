# CEPSparker

  *** NOTE: THIS PROJECT IS INCOMPLETE. USE WITH EXTREME CARE. 
  *** Documentation is highly incomplete.

--

Starter project for developing CEP panels to be used with Adobe applications

© 2018, Rorohiko Ltd. - Kris Coppieters
kris@rorohiko.com

v1.0.2, August 27, 2018

## Preamble

The goal of this project is to reduce the treshold to 'get started' building CEP panels.

The approach I've taken is to provide you with a ready-to-run panel with all its 
source code, as well as a lot of developer infrastructure code (helpers) which 
help with tasks like installing, debugging, reading log files...

The helpers are all written in such a way that they are easy to inspect and 
analyze. 

The helpers also serve as a way to explain and document the development 
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
- Google Chrome browser, Google Chromium, or cefclient

Warning: you must read and ingest the information below. Otherwise,
you will get stuck.

The CEPSparker.zip file you download from this GitHub repository **does not 
provide you with a starter project straight away**. 

Instead, the CEPSparker.zip file contains a **precursor** to the project. 

To convert the precursor into a real project, you need to run
the _CEPSparkerConfig_ configuration tool. 

Furthermore, if you are on a Mac, you also will need to jump through an additional 
hoop, in order to work with the Mac's heightened security defenses. Otherwise the 
Mac will not allow _CEPSparkerConfig_ to run properly. See 'Whirlwind Start On A Mac'
further below.

## CEPSparkerConfig

_CEPSparkerConfig_ allows you to select between some options, and to set some preferences. 

Based on these configuration options, _CEPSparkerConfig_ will set up 
a the starter project for you.

The project is then ready to be installed, debugged, tweaked...

_CEPSparkerConfig_ is a simple-minded convenience app. 

It does not contain esoteric 'magic'. Source code to this application is provided
in the CEPSparker.zip file.

_CEPSparkerConfig_ will parse the content of the Templates subfolder,
do some simple search-and-replace and some text preprocessing on the text files 
that live in this subfolder, and will then set up your starter project.

Tou can run _CEPSparkerConfig_ **only once** for any particular project. 

If you want to start over with a clean slate, you need to go back to the downloaded 
.zip file.

## Getting Started

I attempted to make everything self-explanatory and well documented.

You can start by ignoring most of the stuff in the _CEPSparker_ folder  
(i.e. don't pay attention to the man behind the curtain).

As your familiarity with CEP grows, you can start analyzing the various tools 
provided, and tweak or replace them with your own.

We'll start with a very quick whirlwind tour, to give you a feel for the process.

Further down in this document, I (will) have a 'cookbook' section 
which discusses everything in much more detail, and we'll go through the motions
a few more times in increasingly more detail.

There are two separate 'whirlwind start' sections below: one for Mac, one for Windows.

### Whirlwind Start On A Mac

Download and decompress the .zip file from GitHub:

https://github.com/zwettemaan/CEPSparker/archive/master.zip

#### Security issues

More recent versions of Mac OS X are very security-conscious, and the tools in the starter 
project will trigger a few security measures. 

The initialSetupConfigApp.command script needs to be run first to avoid these issues.

### De-quarantaine _CEPSparkerConfig_ and the \*.command scripts

Look in the _Mac_ subfolder.

Right-click the command-line script

    Mac/initialSetupConfigApp.command

and select 'Open' from the context menu. 

Allow the script to run. Be careful - the buttons on the dialog that follows are 
positioned in unexpected places and it is easy to get confused and inadvertently 
click the 'Cancel' button without noticing. Close the Terminal window afterwards.

This script will 'de-quarantaine' _CEPSparkerConfig_ and the \*.command scripts, 
telling Mac OS X it is OK to run them without setting up a protective sandbox. 
If you forget to do this, _CEPSparkerConfig_ will end up running in a 'sandbox' 
where it does not have access to the rest of the unzipped information, and nothing 
will work.

### Generate the project from the templates

Double-click the
 
    CEPSparkerConfig

icon. You will now be presented with a table where you can configure some important values. 

If you're only trying things out, you can leave all options unchanged and click 'Generate' 
immediately. The default sample will target InDesign.

If you're getting ready to build a 'real' CEP panel, you will need to change the dummy 
default values into 'real' values. Check the cookbook further down, where I'll discuss 
all the options in detail.

Two important values to pay attention to are the port number and the target app. 

The default target is InDesign; you need to pick another target app from the popup 
menu if you want to use another Creative Cloud app.

The port number is used for debugging.

You might have multiple CEP panels installed, and in order to debug all of them, each 
panel needs to be assigned a unique network port number.

The default port number presented is 8888. If you are dealing with multiple panels, 
make sure to use a different port number (e.g. 8889, 8890, 8891...) for each panel.

### Install the extension

Double-click the

    Mac/localDebugInstall.command

Allow the script to run, and close the Terminal window afterwards.

First, this script will set the CEP debug flag on your computer, which allows you to run 
the extension without having a proper code signature.

Then the script will create a subfolder for the extension in

    ~/Library/Application Support/Adobe/CEP/extensions

In this subfolder, a number of symbolic links will be created that lead back to
the source folders for the panel.

There is only one copy of the source code files in existence, and it is 
'hot-linked' into the Adobe extensions folder, so the target app will load 
the extension directly from your source code folder when it is restarted.

Launch your target application and check under 'Window - Extensions'. 

The extension should be listed as 'Rorohiko CEPSparker', and the panel should appear 
when you select the menu item.

### Whirlwind Start On Windows

Download and decompress the .zip file from GitHub:

https://github.com/zwettemaan/CEPSparker/archive/master.zip

#### Security issues

Some .bat scripts will need to be performed from a command line shell with
administrative permissions.

To make it easier to get such a shell, there is a double-clickable file
called

  Windows\sudo.bat
  
in the CEPSparker project folder.

### Generate the project from the templates

Double-click the
 
    Windows\CEPSparkerConfig.exe

icon. You will now be presented with a table where you can configure some important values. 

If you're only trying things out, you can leave all options unchanged and click 'Generate' 
immediately. The default sample will target InDesign.

If you're getting ready to build a 'real' CEP panel, you will need to change the dummy 
default values into 'real' values. Check the cookbook further down, where I'll discuss 
all the options in detail.

Two important values to pay attention to are the port number and the target app. 

The default target is InDesign; you need to pick another target app from the popup 
menu if you want to use another Creative Cloud app.

The port number is used for debugging.

You might have multiple CEP panels installed, and in order to debug all of them, each 
panel needs to be assigned a unique network port number.

The default port number presented is 8888. If you are dealing with multiple panels, 
make sure to use a different port number (e.g. 8889, 8890, 8891...) for each panel.

### Install the extension

From Windows Explorer, double-click the 

    Windows\sudo.bat
    
script to start a shell with administrative permissions.

The current directory should be set to the Windows CEPSparker Windows subdirectory.

In this shell, type 

  localDebugInstall
  
which will launch the Windows\localDebugInstall.bat script. 

First, this script will set the CEP debug flag on your computer, which allows you to run 
the extension without having a proper code signature.

Then the script will create a subdirectory for the extension inside

    %APPDATA%\Adobe\CEP\extensions

In this subdirectory, a number of symbolic links will be created that lead back to
the source folders for the panel.

There is only one copy of the source code files in existence, and it is 
'hot-linked' into the above Adobe extensions directory, so the target app will load 
the extension directly from your source code directory when it is restarted.

Launch your target application and check under 'Window - Extensions'. 

The extension should be listed as 'Rorohiko CEPSparker', and the panel should appear 
when you select the menu item.

### Debug the extension

For debugging, the milage will vary: Google Chrome often does not work, 
and I find myself trying multiple Chrome-based browsers, until I find 
one that works.

The Adobe collection on GitHub contains versions of cefclient, and the 
cookbooks for various versions sometimes also contain some tips and tricks
to handle debugger issues.

Typical issue are blank windows or garbled windows when trying to start
a debug session.

Some links to other Chrome-based browsers to try:

https://www.chromium.org/getting-involved/download-chromium    
https://www.google.com/intl/en/chrome/browser/canary.html    

For cefclient: look for .zip files in:

https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_6.x    
https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_7.x    
https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_8.x    

Point your Chrome browser or cefclient to http://localhost:8888

(replace 8888 with whatever port you used in the _CEPSparkerConfig_ configuration screen).

### Uninstall the debug extension

#### Mac

Double-click the

    Mac/clean.command

script.

#### Windows

Run the clean.bat script from the shell with administrative permissions.

First double-click 

    Windows/sudo.bat

Then type

    clean

followed by <Enter>

## CEPSparkerConfig

_CEPSparkerConfig_ is an app written in Xojo.

For reference, all source code is provided, but the ready-to-run application is included
in the .zip file; there is no need to build this app yourself.

I used Xojo so I could provide WYSIWYG apps for Mac and Windows. 

Furthermore, _CEPSparkerConfig_ does not contain any 'secret sauce'. You can easily perform the same
tasks manually.

_CEPSparkerConfig_ will:

    - search the text files under _Templates_ for placeholder patterns `$$PLACEHOLDER$$`
    - read the ProjectConfig.txt file to determine what default values to use for placeholders.
    - show the placeholders with their default values to the user
    - allow the user to tweak various settings and values
    - when the user clicks 'Generate', do a search-and-replace with the user-provided placeholder replacements 
    - depending on the user selection, it will also select between multiple variants of some key files. For example, there are multiple manifest.xml files in the Templates folder, and depending on the CEPVERSION selected, one of them will be picked.
	  - process conditional expressions, very similar to how a C preprocessor works, but using '$include/$if' (with a dollar sign) instead of '#include/#if'. I am using a '$' instead of a '#' prefix to avoid clashes with the use of #include in ExtendScript.
    
After this, the project is ready to install and/or tweak.

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

followed by <Enter>

#### LocalLinks

A LocalLinks folder will be created.

It contains a few aliases or shortcuts to important folder
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
