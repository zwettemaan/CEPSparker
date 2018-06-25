#tag Window
Begin Window WndCEPSparker
   BackColor       =   &cFFFFFF00
   Backdrop        =   0
   CloseButton     =   True
   Compatibility   =   ""
   Composite       =   False
   Frame           =   0
   FullScreen      =   False
   FullScreenButton=   False
   HasBackColor    =   False
   Height          =   430
   ImplicitInstance=   True
   LiveResize      =   True
   MacProcID       =   0
   MaxHeight       =   32000
   MaximizeButton  =   True
   MaxWidth        =   32000
   MenuBar         =   1754114047
   MenuBarVisible  =   True
   MinHeight       =   430
   MinimizeButton  =   True
   MinWidth        =   600
   Placement       =   0
   Resizeable      =   True
   Title           =   "CEPSparker Config"
   Visible         =   True
   Width           =   600
   Begin Label LblCEPVersion
      AutoDeactivate  =   True
      Bold            =   False
      DataField       =   ""
      DataSource      =   ""
      Enabled         =   True
      Height          =   20
      HelpTag         =   ""
      Index           =   -2147483648
      InitialParent   =   ""
      Italic          =   False
      Left            =   20
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   False
      LockTop         =   True
      Multiline       =   False
      Scope           =   0
      Selectable      =   False
      TabIndex        =   0
      TabPanelIndex   =   0
      TabStop         =   True
      Text            =   "CEP Version:"
      TextAlign       =   2
      TextColor       =   &c00000000
      TextFont        =   "System"
      TextSize        =   0.0
      TextUnit        =   0
      Top             =   20
      Transparent     =   True
      Underline       =   False
      Visible         =   True
      Width           =   84
   End
   Begin PopupMenu PupCEPVersion
      AutoDeactivate  =   True
      Bold            =   False
      DataField       =   ""
      DataSource      =   ""
      Enabled         =   True
      Height          =   20
      HelpTag         =   ""
      Index           =   -2147483648
      InitialParent   =   ""
      InitialValue    =   ""
      Italic          =   False
      Left            =   116
      ListIndex       =   0
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   False
      LockTop         =   True
      Scope           =   0
      TabIndex        =   2
      TabPanelIndex   =   0
      TabStop         =   True
      TextFont        =   "System"
      TextSize        =   0.0
      TextUnit        =   0
      Top             =   20
      Transparent     =   False
      Underline       =   False
      Visible         =   True
      Width           =   80
   End
   Begin Listbox LstConfigStrings
      AutoDeactivate  =   True
      AutoHideScrollbars=   True
      Bold            =   False
      Border          =   True
      ColumnCount     =   2
      ColumnsResizable=   False
      ColumnWidths    =   ""
      DataField       =   ""
      DataSource      =   ""
      DefaultRowHeight=   -1
      Enabled         =   True
      EnableDrag      =   False
      EnableDragReorder=   False
      GridLinesHorizontal=   0
      GridLinesVertical=   0
      HasHeading      =   True
      HeadingIndex    =   -1
      Height          =   295
      HelpTag         =   "Double-click a value to edit it."
      Hierarchical    =   False
      Index           =   -2147483648
      InitialParent   =   ""
      InitialValue    =   "Setting	Value"
      Italic          =   False
      Left            =   20
      LockBottom      =   True
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   True
      LockTop         =   True
      RequiresSelection=   False
      Scope           =   0
      ScrollbarHorizontal=   False
      ScrollBarVertical=   True
      SelectionType   =   0
      ShowDropIndicator=   False
      TabIndex        =   3
      TabPanelIndex   =   0
      TabStop         =   True
      TextFont        =   "System"
      TextSize        =   0.0
      TextUnit        =   0
      Top             =   84
      Transparent     =   False
      Underline       =   False
      UseFocusRing    =   True
      Visible         =   True
      Width           =   560
      _ScrollOffset   =   0
      _ScrollWidth    =   -1
   End
   Begin PushButton BtnGenerate
      AutoDeactivate  =   True
      Bold            =   False
      ButtonStyle     =   "0"
      Cancel          =   False
      Caption         =   "Generate"
      Default         =   True
      Enabled         =   True
      Height          =   20
      HelpTag         =   ""
      Index           =   -2147483648
      InitialParent   =   ""
      Italic          =   False
      Left            =   500
      LockBottom      =   True
      LockedInPosition=   False
      LockLeft        =   False
      LockRight       =   True
      LockTop         =   False
      Scope           =   0
      TabIndex        =   4
      TabPanelIndex   =   0
      TabStop         =   True
      TextFont        =   "System"
      TextSize        =   0.0
      TextUnit        =   0
      Top             =   390
      Transparent     =   False
      Underline       =   False
      Visible         =   True
      Width           =   80
   End
   Begin PushButton BtnCancel
      AutoDeactivate  =   True
      Bold            =   False
      ButtonStyle     =   "0"
      Cancel          =   True
      Caption         =   "Cancel"
      Default         =   False
      Enabled         =   True
      Height          =   20
      HelpTag         =   ""
      Index           =   -2147483648
      InitialParent   =   ""
      Italic          =   False
      Left            =   408
      LockBottom      =   True
      LockedInPosition=   False
      LockLeft        =   False
      LockRight       =   True
      LockTop         =   False
      Scope           =   0
      TabIndex        =   5
      TabPanelIndex   =   0
      TabStop         =   True
      TextFont        =   "System"
      TextSize        =   0.0
      TextUnit        =   0
      Top             =   390
      Transparent     =   False
      Underline       =   False
      Visible         =   True
      Width           =   80
   End
   Begin Label LblHeading
      AutoDeactivate  =   True
      Bold            =   False
      DataField       =   ""
      DataSource      =   ""
      Enabled         =   True
      Height          =   20
      HelpTag         =   ""
      Index           =   -2147483648
      InitialParent   =   ""
      Italic          =   False
      Left            =   20
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   True
      LockTop         =   True
      Multiline       =   False
      Scope           =   0
      Selectable      =   False
      TabIndex        =   6
      TabPanelIndex   =   0
      TabStop         =   True
      Text            =   "Please change the placeholder values below, then click 'Generate'."
      TextAlign       =   0
      TextColor       =   &c00000000
      TextFont        =   "System"
      TextSize        =   0.0
      TextUnit        =   0
      Top             =   52
      Transparent     =   False
      Underline       =   False
      Visible         =   True
      Width           =   560
   End
End
#tag EndWindow

#tag WindowCode
	#tag Event
		Sub Close()
		  Handle_Close
		End Sub
	#tag EndEvent

	#tag Event
		Sub Open()
		  Handle_Open
		End Sub
	#tag EndEvent


	#tag Method, Flags = &h0
		Sub AppQuit()
		  if not fQuitting then
		    fQuitting = true
		    Quit
		  end if
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function CheckIfPristine() As Boolean
		  Dim retVal as Boolean
		  
		  do
		    try 
		      
		      if fProjectRootFolder = nil then
		        LogError CurrentMethodName, "fProjectRootFolder = nil"
		        Exit
		      end if
		      
		      if not fProjectRootFolder.Directory then
		        LogError CurrentMethodName, "fProjectRootFolder does not exist"
		        Exit
		      end if
		      
		      if fTemplatesFolder = nil then
		        LogError CurrentMethodName, "fTemplatesFolder = nil"
		        Exit
		      end if
		      
		      if not fTemplatesFolder.Directory then
		        LogError CurrentMethodName, "fTemplatesFolder does not exist"
		        Exit
		      end if
		      
		      retVal = true
		      
		      if DebugBuild then
		        Exit
		      end if
		      
		      // Bail out if any of the template subfolders exists in the 
		      // project folder: the project has already been generated
		      
		      Dim fileCount as integer
		      fileCount = fTemplatesFolder.Count
		      
		      for idx as integer = 1 to fileCount
		        try 
		          Dim subFile as FolderItem
		          subFile = fTemplatesFolder.Item(idx)
		          if subFile.Directory then
		            if fProjectRootFolder.Child(subFile.Name).Exists then
		              retVal = false
		              Exit // For
		            end if
		          end if
		        catch e as RuntimeException
		          LogError CurrentMethodName, "Loop throws " + e.Message
		        end try
		      next
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop Until true
		  
		  return retVal
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Generate()
		  do
		    try 
		      
		      if fProjectRootFolder = nil then
		        LogError CurrentMethodName, "fProjectRootFolder = nil"
		        Exit
		      end if
		      
		      if not fProjectRootFolder.Directory then
		        LogError CurrentMethodName, "fProjectRootFolder does not exist"
		        Exit
		      end if
		      
		      if fTemplatesFolder = nil then
		        LogError CurrentMethodName, "fTemplatesFolder = nil"
		        Exit
		      end if
		      
		      if not fTemplatesFolder.Directory then
		        LogError CurrentMethodName, "fTemplatesFolder does not exist"
		        Exit
		      end if
		      
		      Dim selectedVersion as String
		      selectedVersion = PupCEPVersion.List(PupCEPVersion.ListIndex)
		      if selectedVersion = "" then
		        LogError CurrentMethodName, "no selectedVersion"
		        Exit
		      end if
		      
		      Dim macScriptFolder as FolderItem
		      macScriptFolder = fProjectRootFolder.Child(kMacScriptFolder)
		      
		      if macScriptFolder = nil then
		        LogError CurrentMethodName, "macScriptFolder = nil"
		        Exit
		      end if
		      
		      if not macScriptFolder.Directory then
		        LogError CurrentMethodName, "macScriptFolder does not exist"
		        Exit
		      end if
		      
		      Dim winScriptFolder as FolderItem
		      winScriptFolder = fProjectRootFolder.Child(kWinScriptFolder)
		      
		      if winScriptFolder = nil then
		        LogError CurrentMethodName, "winScriptFolder = nil"
		        Exit
		      end if
		      
		      if not winScriptFolder.Directory then
		        LogError CurrentMethodName, "winScriptFolder does not exist"
		        Exit
		      end if
		      
		      Dim maxPlaceholderIdx as Integer
		      maxPlaceholderIdx = LstConfigStrings.ListCount - 1
		      
		      for idx as integer = 0 to maxPlaceholderIdx
		        
		        Dim placeholder as String
		        placeholder = LstConfigStrings.Cell(idx,0)
		        
		        Dim value as String
		        value = LstConfigStrings.Cell(idx,1)
		        
		        fPlaceholderDict.Value(placeholder) = value
		        
		      next
		      
		      GenerateProjectItemFromTemplate selectedVersion, fTemplatesFolder, fProjectRootFolder
		      
		      Dim extensionVersion as String
		      extensionVersion = fPlaceholderDict.Value(kPlaceholder_ExtensionVersion)
		      
		      Dim generatedMacProjectSettings as String
		      Dim generatedWinProjectSettings as String
		      
		      generatedMacProjectSettings = "export " + kPlaceholder_CEPVersion + "=" + CHR(34) + selectedVersion + Chr(34) + Chr(10)
		      generatedWinProjectSettings = "SET " + kPlaceholder_CEPVersion + "=" + selectedVersion + Chr(13) + CHR(10)
		      
		      for idx as integer = 0 to UBound(fPlaceholders)
		        
		        Dim placeholder as String
		        placeholder = fPlaceholders(idx)
		        
		        if placeholder <> kPlaceholder_ExtensionVersion then
		          Dim value as String
		          value = fPlaceholderDict.Value(placeholder)
		          
		          generatedMacProjectSettings = generatedMacProjectSettings + "export " + placeholder + "=" + Chr(34) + value + Chr(34) + Chr(10)
		          generatedWinProjectSettings = generatedWinProjectSettings + "SET " + placeholder + "=" + value + Chr(13) + CHR(10)
		        end if
		        
		      next
		      
		      Dim generatedMacSettingsFile as FolderItem
		      generatedMacSettingsFile = macScriptFolder.Child(kGeneratedProjectConfigFileName + ".command")
		      
		      Dim tos as TextOutputStream
		      tos = TextOutputStream.Create(generatedMacSettingsFile)
		      if tos = nil then
		        LogError CurrentMethodName, "Cannot create Mac text file"
		        Exit
		      end if
		      
		      tos.Write generatedMacProjectSettings
		      tos.Close
		      
		      Dim generatedWinSettingsFile as FolderItem
		      generatedWinSettingsFile = winScriptFolder.Child(kGeneratedProjectConfigFileName + ".bat")
		      
		      tos = TextOutputStream.Create(generatedWinSettingsFile)
		      if tos = nil then
		        LogError CurrentMethodName, "Cannot create Windows text file"
		        Exit
		      end if
		      
		      tos.Write generatedWinProjectSettings
		      tos.Close
		      
		      Dim extensionVersionFile as FolderItem
		      extensionVersionFile = fProjectRootFolder.Child(kFileName_ExtensionVersion)
		      
		      tos = TextOutputStream.Create(extensionVersionFile)
		      if tos = nil then
		        LogError CurrentMethodName, "Cannot create version text file"
		        Exit
		      end if
		      
		      tos.Write extensionVersion
		      tos.Close
		      
		      Dim cepVersionFile as FolderItem
		      cepVersionFile = fProjectRootFolder.Child(kFileName_CEPVersion)
		      
		      tos = TextOutputStream.Create(cepVersionFile)
		      if tos = nil then
		        LogError CurrentMethodName, "Cannot create CEP version text file"
		        Exit
		      end if
		      
		      tos.Write selectedVersion
		      tos.Close
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop Until true
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub GenerateProjectFileFromTemplateFile(in_selectedVersion as String, in_sourceItem as FolderItem, in_targetItem as FolderItem)
		  do
		    try 
		      
		      if in_sourceItem = nil then
		        LogError CurrentMethodName, "in_sourceItem = nil"
		        Exit
		      end if
		      
		      if not in_sourceItem.Exists or in_sourceItem.Directory then
		        LogError CurrentMethodName, "in_sourceItem does not exist"
		        Exit
		      end if
		      
		      if in_targetItem = nil then
		        LogError CurrentMethodName, "in_targetItem = nil"
		        Exit
		      end if
		      
		      if in_targetItem.Exists then
		        LogError CurrentMethodName, "in_targetItem already exists"
		        Exit
		      end if
		      
		      Dim tis as TextInputStream
		      tis = TextInputStream.Open(in_sourceItem)
		      if tis = nil then
		        LogError CurrentMethodName, "Cannot open text file"
		        Exit
		      end if
		      
		      Dim fileText as String
		      fileText = tis.ReadAll
		      tis.Close
		      
		      Dim textChopped as String 
		      textChopped = fileText
		      
		      Dim generatedText as String
		      
		      Static placeholderMatch as RegEx
		      if placeholderMatch = nil then
		        placeHolderMatch = new RegEx
		        placeholderMatch.SearchPattern = "^[a-z][a-z0-9_-]*$"
		        placeholderMatch.Options.CaseSensitive = false
		      end if
		      
		      Dim placeholderStartPos as Integer
		      placeholderStartPos = textChopped.InStr(kPlaceholderPrefixSuffix)
		      while placeholderStartPos > 0
		        
		        if placeholderStartPos > 1 then
		          generatedText = generatedText + textChopped.Left(placeholderStartPos - 1)
		        end if
		        
		        textChopped = textChopped.mid(placeHolderStartPos + Len(kPlaceholderPrefixSuffix))
		        
		        Dim placeholderEndPos as integer
		        placeholderEndPos = textChopped.InStr(kPlaceholderPrefixSuffix)
		        
		        if placeholderEndPos <= 0 then
		          
		          placeholderStartPos = -1
		          
		        else
		          
		          Dim possiblePlaceholder as String
		          possiblePlaceholder = Left(textChopped, placeholderEndPos - 1)
		          
		          if placeHolderMatch.Search(possiblePlaceholder) = nil then
		            
		            placeholderStartPos = placeholderEndPos
		            
		          else
		            
		            Dim placeholder as String
		            placeholder = possiblePlaceholder.Uppercase()
		            
		            textChopped = textChopped.mid(placeholderEndPos + Len(kPlaceholderPrefixSuffix))
		            
		            placeholderStartPos = textChopped.InStr(kPlaceholderPrefixSuffix)
		            
		            generatedText = generatedText + fPlaceholderDict.Value(placeholder)
		            
		          end if
		        end if
		      wend
		      
		      generatedText = generatedText + textChopped
		      
		      Dim tos as TextOutputStream
		      tos = TextOutputStream.Create(in_targetItem)
		      if tos = nil then
		        LogError CurrentMethodName, "Cannot create text file"
		        Exit
		      end if
		      
		      tos.Write generatedText
		      tos.Close
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop Until true
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub GenerateProjectItemFromTemplate(in_selectedVersion as String, in_sourceItem as FolderItem, in_targetItem as FolderItem)
		  do
		    try 
		      
		      if in_sourceItem = nil then
		        LogError CurrentMethodName, "in_sourceItem = nil"
		        Exit
		      end if
		      
		      if not in_sourceItem.Exists then
		        LogError CurrentMethodName, "in_sourceItem does not exist"
		        Exit
		      end if
		      
		      if in_targetItem = nil then
		        LogError CurrentMethodName, "in_targetItem = nil"
		        Exit
		      end if
		      
		      if not in_sourceItem.Directory then
		        GenerateProjectFileFromTemplateFile in_selectedVersion, in_sourceItem, in_targetItem
		        Exit
		      end if
		      
		      if not in_targetItem.Exists then
		        in_targetItem.CreateAsFolder
		      end if
		      
		      if not in_targetItem.Directory then
		        LogError CurrentMethodName, "in_targetItem is not a directory"
		        Exit
		      end if
		      
		      Dim fileCount as integer
		      fileCount = in_sourceItem.Count
		      
		      for idx as integer = 1 to fileCount
		        
		        try 
		          
		          Dim subItem as FolderItem
		          subItem = in_sourceItem.Item(idx)
		          
		          Dim subItemName as String
		          subItemName = subItem.Name
		          
		          if IsVersionedFolder(subItem) then
		            
		            if subItem.name = in_selectedVersion then
		              GenerateProjectItemFromTemplate in_selectedVersion, subItem, in_targetItem
		            end if
		            
		          else
		            
		            Dim targetItem as FolderItem
		            targetItem = in_targetItem.Child(subItemName)
		            
		            GenerateProjectItemFromTemplate in_selectedVersion, subItem, targetItem
		            
		          end if
		          
		        catch e as RuntimeException
		          LogError CurrentMethodName, "Copy loop throws " + e.Message
		        end try
		        
		      next
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop Until true
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Handle_BtnCancel_Action()
		  AppQuit
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Handle_BtnGenerate_Action()
		  Generate
		  AppQuit
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Handle_Close()
		  AppQuit
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Handle_Open()
		  do 
		    Init
		    
		    if not CheckIfPristine then
		      ReportError "This project has already been generated. Please unzip the original folder and try again with a clean copy"
		    end if
		    
		    if fErrorMessage <> "" then
		      MsgBox fErrorMessage
		      AppQuit
		      Exit
		    end if
		    
		    UpdateUI
		    
		  loop until True
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Init()
		  do 
		    try 
		      
		      Dim appFolder as FolderItem
		      appFolder = GetFolderItem("")
		      if appFolder = nil then
		        LogError CurrentMethodName, "appFolder = nil"
		        ReportError "Fatal error: app cannot locate its own folder"
		        Exit
		      end if
		      
		      fTemplatesFolder = nil
		      fProjectRootFolder = appFolder
		      
		      do
		        fProjectRootFolder = fProjectRootFolder.parent
		        if fProjectRootFolder <> nil then
		          fTemplatesFolder = fProjectRootFolder.Child(kTemplatesFolderName)
		        end if
		      Loop until fProjectRootFolder = nil or (fTemplatesFolder <> nil and fTemplatesFolder.Directory)
		      
		      if fProjectRootFolder = nil then
		        LogError CurrentMethodName, "Cannot locate project root folder"
		        ReportError "Cannot locate project root folder"
		        Exit
		      end if
		      
		      if fTemplatesFolder = nil or not fTemplatesFolder.Directory then
		        LogError CurrentMethodName, "Cannot find project templates folder '" + kTemplatesFolderName + "'"
		        Exit
		      end if
		      
		      fCSXSTemplatesFolder = fTemplatesFolder.Child(kCSXSFolderName)
		      if fCSXSTemplatesFolder = nil or not fCSXSTemplatesFolder.Directory then
		        LogError CurrentMethodName, "Cannot find project CSXS templates folder '" + kCSXSFolderName + "'"
		        ReportError "Cannot find project CSXS templates folder '" + kCSXSFolderName + "'"
		        Exit
		      end if
		      
		      Dim maxSubFolderIdx as Integer
		      maxSubFolderIdx = fCSXSTemplatesFolder.Count
		      
		      Redim fCSXSVersionList(-1)
		      for idx as integer = 1 to maxSubFolderIdx
		        Dim subFolder as FolderItem
		        subFolder = fCSXSTemplatesFolder.Item(idx)
		        if subFolder <> nil and subFolder.Exists then
		          Dim manifestFile as FolderItem
		          manifestFile = subFolder.Child(kManifestFileName)
		          if manifestFile <> nil and manifestFile.exists then
		            fCSXSVersionList.Append subFolder.name
		            fCSXSManifestTemplateList.Append manifestFile
		          end if
		        end if
		      next
		      
		      fCSXSVersionList.SortWith(fCSXSManifestTemplateList)
		      
		      fPlaceholderDict = new Dictionary
		      ParseTemplates fTemplatesFolder, fPlaceholderDict
		      
		      fHelpStringDict = new Dictionary
		      ParseConfigFile fPlaceholderDict, fHelpStringDict
		      
		      Redim fPlaceholders(-1)
		      
		      Dim keys() as Variant
		      keys = fPlaceholderDict.Keys
		      for each key as Variant in keys
		        fPlaceholders.Append key
		      next
		      
		      fPlaceholders.Sort
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop until true
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function IsVersionedFolder(in_folder as FolderItem) As Boolean
		  Dim retVal as Boolean
		  
		  do
		    
		    try 
		      
		      if in_folder = nil or not in_folder.Directory then
		        Exit
		      end if
		      
		      Dim folderName as String
		      folderName = in_folder.Name
		      
		      Static versionedFolderRegEx as RegEx
		      if versionedFolderRegEx = nil then
		        versionedFolderRegEx = new RegEx
		        versionedFolderRegEx.SearchPattern = "^\d\.x$"
		        versionedFolderRegEx.Options.CaseSensitive = false
		      end if
		      
		      if versionedFolderRegEx.Search(folderName) <> nil then
		        retVal = true
		      end if
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop Until true
		  
		  return retVal
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub LogError(in_methodName as String, in_message as String)
		  // TODO when needed. This is a simple project, and I've not needed any advanced logging or debugging
		  // just yet.
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub ParseConfigFile(io_placeholders as Dictionary, io_helpStrings as Dictionary)
		  do 
		    
		    try 
		      
		      if fProjectRootFolder = nil then
		        LogError CurrentMethodName, "fProjectRootFolder = nil"
		        Exit
		      end if
		      
		      if not fProjectRootFolder.Directory then
		        LogError CurrentMethodName, "fProjectRootFolder does not exist"
		        Exit
		      end if
		      
		      Dim projectConfigFile as FolderItem
		      projectConfigFile = fProjectRootFolder.Child(kProjectConfigFileName)
		      if projectConfigFile = nil then
		        LogError CurrentMethodName, "projectConfigFile = nil"
		        Exit
		      end if
		      
		      if not projectConfigFile.Exists or projectConfigFile.Directory then
		        LogError CurrentMethodName, "projectConfigFile not found"
		        Exit
		      end if
		      
		      Dim tis as TextInputStream
		      tis = TextInputStream.Open(projectConfigFile)
		      if tis = nil then
		        LogError CurrentMethodName, "Cannot open projectConfigFile"
		        Exit
		      end if
		      
		      Dim fileText as String
		      fileText = tis.ReadAll
		      tis.Close
		      
		      Dim lines() as String
		      lines = fileText.split(Chr(13) + Chr(10))
		      if UBound(lines) = 0 then
		        lines = fileText.split(Chr(13))
		        if UBound(lines) = 0 then
		          lines = fileText.split(Chr(10))
		        end if
		      end if
		      
		      for each line as String in lines
		        line = Trim(line)
		        if Left(line,1) <> "#" then
		          Dim parts() as String
		          parts = line.split("=")
		          if UBound(parts) >= 1 then
		            Dim placeholder as String
		            placeholder = parts(0).Uppercase()
		            Dim value as String
		            value = Trim(Mid(line, placeholder.len + 2))
		            if left(value, 1) = Chr(34) and right(value,1) = Chr(34) then
		              value = value.Mid(2, value.len - 2)
		            end if
		            if left(placeholder, kPlaceHolderPrefix_Help.Len) = kPlaceHolderPrefix_Help then
		              placeholder = Mid(placeholder,6)
		              io_helpStrings.Value(placeholder) = value
		            else
		              io_placeholders.Value(placeholder) = value
		            end if
		          end if
		        end if
		      next
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop until true
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub ParseTemplates(in_sourceFolder as FolderItem, io_placeholders as Dictionary)
		  do
		    try 
		      
		      if in_sourceFolder = nil then
		        LogError CurrentMethodName, "fTemplatesFolder = nil"
		        Exit
		      end if
		      
		      if not in_sourceFolder.Directory then
		        LogError CurrentMethodName, "in_sourceFolder does not exist"
		        Exit
		      end if
		      
		      Dim fileCount as integer
		      fileCount = in_sourceFolder.Count
		      
		      for idx as integer = 1 to fileCount
		        
		        try 
		          
		          Dim subItem as FolderItem
		          subItem = in_sourceFolder.Item(idx)
		          
		          Dim subItemName as String
		          subItemName = subItem.Name
		          
		          if not subItem.Directory then
		            
		            ParseTextFile subItem, io_placeholders
		            
		          else
		            
		            ParseTemplates subItem, io_placeholders
		            
		          end if
		          
		        catch e as RuntimeException
		          LogError CurrentMethodName, "Copy loop throws " + e.Message
		        end try
		        
		      next
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop Until true
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub ParseTextFile(in_textFile as FolderItem, io_placeholders as Dictionary)
		  do 
		    
		    try 
		      
		      if in_textFile = nil then
		        LogError CurrentMethodName, "in_textFile is nil"
		        Exit
		      end if
		      
		      if not in_textFile.Exists or in_textFile.Directory then
		        LogError CurrentMethodName, "Text file does not exist"
		        Exit
		      end if
		      
		      Dim tis as TextInputStream
		      tis = TextInputStream.Open(in_textFile)
		      if tis = nil then
		        LogError CurrentMethodName, "Cannot open text file"
		        Exit
		      end if
		      
		      Dim fileText as String
		      fileText = tis.ReadAll
		      tis.Close
		      
		      Dim textChopped as String 
		      textChopped = fileText
		      
		      Static placeholderMatch as RegEx
		      if placeholderMatch = nil then
		        placeHolderMatch = new RegEx
		        placeholderMatch.SearchPattern = "^[a-z][a-z0-9_-]*$"
		        placeholderMatch.Options.CaseSensitive = false
		      end if
		      
		      Dim placeholderStartPos as Integer
		      placeholderStartPos = textChopped.InStr(kPlaceholderPrefixSuffix)
		      while placeholderStartPos > 0
		        textChopped = textChopped.mid(placeHolderStartPos + Len(kPlaceholderPrefixSuffix))
		        
		        Dim placeholderEndPos as integer
		        placeholderEndPos = textChopped.InStr(kPlaceholderPrefixSuffix)
		        
		        if placeholderEndPos <= 0 then
		          placeholderStartPos = -1
		        else
		          
		          Dim possiblePlaceholder as String
		          possiblePlaceholder = Left(textChopped, placeholderEndPos - 1)
		          if placeHolderMatch.Search(possiblePlaceholder) = nil then
		            placeholderStartPos = placeholderEndPos
		          else
		            Dim placeholder as String
		            placeholder = possiblePlaceholder.Uppercase()
		            io_placeholders.Value(placeholder) = ""
		            
		            textChopped = textChopped.mid(placeholderEndPos + Len(kPlaceholderPrefixSuffix))
		            placeholderStartPos = textChopped.InStr(kPlaceholderPrefixSuffix)
		          end if
		        end if
		      wend
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop until true
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub ReportError(in_message as String)
		  if fErrorMessage = "" then
		    fErrorMessage = in_message
		  end if
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub UpdateUI()
		  do 
		    LstConfigStrings.TextSize = 10
		    LstConfigStrings.DefaultRowHeight = 14
		    
		    PupCEPVersion.DeleteAllRows
		    Dim highestVersion as double
		    Dim selectedIdx as integer
		    for idx as integer = 0 to UBound(fCSXSVersionList)
		      dim versionString as String
		      versionString = fCSXSVersionList(idx)
		      PupCEPVersion.AddRow versionString
		      Dim version as Double
		      version = Val(versionString)
		      if version > highestVersion then
		        highestVersion = version
		        selectedIdx = idx
		      end if
		    next
		    PupCEPVersion.ListIndex = selectedIdx
		    
		    LstConfigStrings.DeleteAllRows
		    for idx as integer = 0 to UBound(fPlaceholders)
		      Dim placeholder as String
		      placeholder = fPlaceholders(idx)
		      LstConfigStrings.AddRow placeholder
		      if fPlaceholderDict.HasKey(placeholder) then
		        LstConfigStrings.Cell(idx,1) = fPlaceholderDict.Value(placeholder)
		        LstConfigStrings.CellType(idx, 1) = Listbox.TypeEditableTextField
		        if fHelpStringDict.HasKey(placeholder) then
		          Dim helpString as String
		          helpString = fHelpStringDict.Value(placeholder)
		          LstConfigStrings.CellHelpTag(idx,0) = helpString
		          LstConfigStrings.CellHelpTag(idx,1) = helpString
		        end if 
		      end if
		    next
		    
		  Loop until true
		End Sub
	#tag EndMethod


	#tag Property, Flags = &h0
		fCSXSManifestTemplateList() As FolderItem
	#tag EndProperty

	#tag Property, Flags = &h0
		fCSXSTemplatesFolder As FolderItem
	#tag EndProperty

	#tag Property, Flags = &h0
		fCSXSVersionList() As String
	#tag EndProperty

	#tag Property, Flags = &h0
		fErrorMessage As String
	#tag EndProperty

	#tag Property, Flags = &h0
		fHelpStringDict As Dictionary
	#tag EndProperty

	#tag Property, Flags = &h0
		fPlaceholderDict As Dictionary
	#tag EndProperty

	#tag Property, Flags = &h0
		fPlaceholders() As String
	#tag EndProperty

	#tag Property, Flags = &h0
		fProjectRootFolder As FolderItem
	#tag EndProperty

	#tag Property, Flags = &h0
		fQuitting As Boolean
	#tag EndProperty

	#tag Property, Flags = &h0
		fTemplatesFolder As FolderItem
	#tag EndProperty


	#tag Constant, Name = kCSXSFolderName, Type = String, Dynamic = False, Default = \"CSXS", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kFileName_CEPVersion, Type = String, Dynamic = False, Default = \"CEPVersion.txt", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kFileName_ExtensionVersion, Type = String, Dynamic = False, Default = \"ExtensionVersion.txt", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kGeneratedProjectConfigFileName, Type = String, Dynamic = False, Default = \"ProjectSettings", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kMacScriptFolder, Type = String, Dynamic = False, Default = \"Mac", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kManifestFileName, Type = String, Dynamic = False, Default = \"manifest.xml", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPlaceholderPrefixSuffix, Type = String, Dynamic = False, Default = \"$$", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPlaceHolderPrefix_Help, Type = String, Dynamic = False, Default = \"HELP_", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPlaceholder_CEPVersion, Type = String, Dynamic = False, Default = \"CEPVERSION", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPlaceholder_ExtensionVersion, Type = String, Dynamic = False, Default = \"EXTENSION_VERSION", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kProjectConfigFileName, Type = String, Dynamic = False, Default = \"ProjectConfig.txt", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kProjectHomeFolderName, Type = String, Dynamic = False, Default = \"CEPSparker", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kTemplatesFolderName, Type = String, Dynamic = False, Default = \"Templates", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kWinScriptFolder, Type = String, Dynamic = False, Default = \"Windows", Scope = Public
	#tag EndConstant


#tag EndWindowCode

#tag Events BtnGenerate
	#tag Event
		Sub Action()
		  Handle_BtnGenerate_Action
		End Sub
	#tag EndEvent
#tag EndEvents
#tag Events BtnCancel
	#tag Event
		Sub Action()
		  Handle_BtnCancel_Action
		  
		End Sub
	#tag EndEvent
#tag EndEvents
#tag ViewBehavior
	#tag ViewProperty
		Name="BackColor"
		Visible=true
		Group="Background"
		InitialValue="&hFFFFFF"
		Type="Color"
	#tag EndViewProperty
	#tag ViewProperty
		Name="Backdrop"
		Visible=true
		Group="Background"
		Type="Picture"
		EditorType="Picture"
	#tag EndViewProperty
	#tag ViewProperty
		Name="CloseButton"
		Visible=true
		Group="Frame"
		InitialValue="True"
		Type="Boolean"
		EditorType="Boolean"
	#tag EndViewProperty
	#tag ViewProperty
		Name="Composite"
		Group="OS X (Carbon)"
		InitialValue="False"
		Type="Boolean"
	#tag EndViewProperty
	#tag ViewProperty
		Name="Frame"
		Visible=true
		Group="Frame"
		InitialValue="0"
		Type="Integer"
		EditorType="Enum"
		#tag EnumValues
			"0 - Document"
			"1 - Movable Modal"
			"2 - Modal Dialog"
			"3 - Floating Window"
			"4 - Plain Box"
			"5 - Shadowed Box"
			"6 - Rounded Window"
			"7 - Global Floating Window"
			"8 - Sheet Window"
			"9 - Metal Window"
			"11 - Modeless Dialog"
		#tag EndEnumValues
	#tag EndViewProperty
	#tag ViewProperty
		Name="FullScreen"
		Group="Behavior"
		InitialValue="False"
		Type="Boolean"
		EditorType="Boolean"
	#tag EndViewProperty
	#tag ViewProperty
		Name="FullScreenButton"
		Visible=true
		Group="Frame"
		InitialValue="False"
		Type="Boolean"
		EditorType="Boolean"
	#tag EndViewProperty
	#tag ViewProperty
		Name="HasBackColor"
		Visible=true
		Group="Background"
		InitialValue="False"
		Type="Boolean"
	#tag EndViewProperty
	#tag ViewProperty
		Name="Height"
		Visible=true
		Group="Size"
		InitialValue="400"
		Type="Integer"
	#tag EndViewProperty
	#tag ViewProperty
		Name="ImplicitInstance"
		Visible=true
		Group="Behavior"
		InitialValue="True"
		Type="Boolean"
		EditorType="Boolean"
	#tag EndViewProperty
	#tag ViewProperty
		Name="Interfaces"
		Visible=true
		Group="ID"
		Type="String"
		EditorType="String"
	#tag EndViewProperty
	#tag ViewProperty
		Name="LiveResize"
		Group="Behavior"
		InitialValue="True"
		Type="Boolean"
		EditorType="Boolean"
	#tag EndViewProperty
	#tag ViewProperty
		Name="MacProcID"
		Group="OS X (Carbon)"
		InitialValue="0"
		Type="Integer"
	#tag EndViewProperty
	#tag ViewProperty
		Name="MaxHeight"
		Visible=true
		Group="Size"
		InitialValue="32000"
		Type="Integer"
	#tag EndViewProperty
	#tag ViewProperty
		Name="MaximizeButton"
		Visible=true
		Group="Frame"
		InitialValue="True"
		Type="Boolean"
		EditorType="Boolean"
	#tag EndViewProperty
	#tag ViewProperty
		Name="MaxWidth"
		Visible=true
		Group="Size"
		InitialValue="32000"
		Type="Integer"
	#tag EndViewProperty
	#tag ViewProperty
		Name="MenuBar"
		Visible=true
		Group="Menus"
		Type="MenuBar"
		EditorType="MenuBar"
	#tag EndViewProperty
	#tag ViewProperty
		Name="MenuBarVisible"
		Visible=true
		Group="Deprecated"
		InitialValue="True"
		Type="Boolean"
		EditorType="Boolean"
	#tag EndViewProperty
	#tag ViewProperty
		Name="MinHeight"
		Visible=true
		Group="Size"
		InitialValue="64"
		Type="Integer"
	#tag EndViewProperty
	#tag ViewProperty
		Name="MinimizeButton"
		Visible=true
		Group="Frame"
		InitialValue="True"
		Type="Boolean"
		EditorType="Boolean"
	#tag EndViewProperty
	#tag ViewProperty
		Name="MinWidth"
		Visible=true
		Group="Size"
		InitialValue="64"
		Type="Integer"
	#tag EndViewProperty
	#tag ViewProperty
		Name="Name"
		Visible=true
		Group="ID"
		Type="String"
		EditorType="String"
	#tag EndViewProperty
	#tag ViewProperty
		Name="Placement"
		Visible=true
		Group="Behavior"
		InitialValue="0"
		Type="Integer"
		EditorType="Enum"
		#tag EnumValues
			"0 - Default"
			"1 - Parent Window"
			"2 - Main Screen"
			"3 - Parent Window Screen"
			"4 - Stagger"
		#tag EndEnumValues
	#tag EndViewProperty
	#tag ViewProperty
		Name="Resizeable"
		Visible=true
		Group="Frame"
		InitialValue="True"
		Type="Boolean"
		EditorType="Boolean"
	#tag EndViewProperty
	#tag ViewProperty
		Name="Super"
		Visible=true
		Group="ID"
		Type="String"
		EditorType="String"
	#tag EndViewProperty
	#tag ViewProperty
		Name="Title"
		Visible=true
		Group="Frame"
		InitialValue="Untitled"
		Type="String"
	#tag EndViewProperty
	#tag ViewProperty
		Name="Visible"
		Visible=true
		Group="Behavior"
		InitialValue="True"
		Type="Boolean"
		EditorType="Boolean"
	#tag EndViewProperty
	#tag ViewProperty
		Name="Width"
		Visible=true
		Group="Size"
		InitialValue="600"
		Type="Integer"
	#tag EndViewProperty
	#tag ViewProperty
		Name="fErrorMessage"
		Group="Behavior"
		Type="String"
		EditorType="MultiLineEditor"
	#tag EndViewProperty
#tag EndViewBehavior
