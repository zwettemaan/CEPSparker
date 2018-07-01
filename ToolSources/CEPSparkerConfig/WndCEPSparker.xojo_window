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
      Height          =   237
      HelpTag         =   ""
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
   Begin Label LblHelpText
      AutoDeactivate  =   True
      Bold            =   False
      DataField       =   ""
      DataSource      =   ""
      Enabled         =   True
      Height          =   45
      HelpTag         =   ""
      Index           =   -2147483648
      InitialParent   =   ""
      Italic          =   False
      Left            =   20
      LockBottom      =   True
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   True
      LockTop         =   False
      Multiline       =   True
      Scope           =   0
      Selectable      =   False
      TabIndex        =   7
      TabPanelIndex   =   0
      TabStop         =   True
      Text            =   ""
      TextAlign       =   0
      TextColor       =   &c00000000
      TextFont        =   "System"
      TextSize        =   0.0
      TextUnit        =   0
      Top             =   333
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
		              MsgBox subFile.Name
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
		Function EvalCondition(in_condition as String) As Boolean
		  Dim retVal as Boolean
		  
		  do
		    try 
		      
		      Dim leftSide as String
		      Dim rightSide as String
		      Dim operator as String
		      
		      Const kState_Idle = 0
		      Const kState_LeftSide = 1
		      Const kState_LeftSideQuoted = 2
		      Const kState_LeftSideUnquoted = 3
		      Const kState_Operator = 4
		      Const kState_RightSide = 5
		      Const kState_RightSideQuoted = 6
		      Const kState_RightSideUnquoted = 7
		      Const kState_Done = 8
		      
		      Dim state as integer
		      state = kState_Idle
		      
		      Dim pos as integer
		      while pos <= Len(in_condition) 
		        Dim c as String
		        c = Mid(in_condition, pos, 1)
		        pos = pos + 1
		        
		        select case state
		        case kState_Idle
		          if c > " " then
		            pos = pos - 1
		            state = kState_LeftSide
		          end if
		        case kState_LeftSide
		          if c = Chr(34) then
		            state = kState_LeftSideQuoted
		          else
		            leftSide = leftSide + c
		            state = kState_LeftSideUnquoted
		          end if
		        case kState_LeftSideQuoted
		          if c = Chr(34) then
		            state = kState_Operator
		          else
		            leftSide = leftSide + c
		          end if
		        case kState_LeftSideUnquoted
		          if c <= " " then
		            state = kState_Operator
		          else
		            leftSide = leftSide + c
		          end if
		        case kState_Operator
		          if c = "=" or c = ">" or c = "<" or c = "!" then
		            operator = operator + c
		          elseif c > " " then
		            state = kState_RightSide
		            pos = pos - 1
		          end if
		        case kState_RightSide
		          if c = Chr(34) then
		            state = kState_RightSideQuoted
		          else
		            rightSide = rightSide + c
		            state = kState_RightSideUnquoted
		          end if
		        case kState_RightSideQuoted
		          if c = Chr(34) then
		            state = kState_Done
		          else
		            rightSide = rightSide + c
		          end if
		        case kState_RightSideUnquoted
		          if c <= " " then
		            state = kState_Done
		          else
		            rightSide = rightSide + c
		          end if
		        end select
		      wend
		      
		      Select case operator
		      case "=", "=="
		        retVal = leftSide = rightSide
		      case "<"
		        retVal = leftSide < rightSide
		      case "<=", "=<"
		        retVal = leftSide <= rightSide
		      case ">=", "=>"
		        retVal = leftSide >= rightSide
		      case ">", ">"
		        retVal = leftSide > rightSide
		      case "<>", "!=", "><"
		        retVal = leftSide <> rightSide
		      end select
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop Until true
		  
		  return retVal
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub ExtractPlaceholdersFromFile(in_textFile as FolderItem, io_placeholders as Dictionary)
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
		Sub ExtractPlaceholdersFromTemplates(in_sourceFolder as FolderItem, io_placeholders as Dictionary)
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
		            
		            ExtractPlaceholdersFromFile subItem, io_placeholders
		            
		          else
		            
		            ExtractPlaceholdersFromTemplates subItem, io_placeholders
		            
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
		      
		      fPlaceholderDict.Value(kPlaceholder_CEPVersion) = selectedVersion
		      
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
		      
		      Dim buildSettingsFolder as FolderItem
		      buildSettingsFolder = fProjectRootFolder.Child(kBuildSettingsFolderName)
		      if not buildSettingsFolder.Exists then
		        buildSettingsFolder.CreateAsFolder
		      end if
		      
		      if not buildSettingsFolder.Directory then
		        LogError CurrentMethodName, "buildSettingsFolder is not a directory"
		        Exit
		      end if
		      
		      Dim extensionVersion as String
		      extensionVersion = fPlaceholderDict.Value(kPlaceholder_ExtensionVersion)
		      
		      Dim extensionDirName as String
		      extensionDirName = fPlaceholderDict.Value(kPlaceholder_ExtensionDirName)
		      
		      Dim extensionVersionFile as FolderItem
		      extensionVersionFile = buildSettingsFolder.Child(kFileName_ExtensionVersion)
		      
		      Dim tos as TextOutputStream
		      
		      tos = TextOutputStream.Create(extensionVersionFile)
		      if tos = nil then
		        LogError CurrentMethodName, "Cannot create version text file"
		        Exit
		      end if
		      
		      tos.Write extensionVersion
		      tos.Close
		      
		      Dim cepVersionFile as FolderItem
		      cepVersionFile = buildSettingsFolder.Child(kFileName_CEPVersion)
		      
		      tos = TextOutputStream.Create(cepVersionFile)
		      if tos = nil then
		        LogError CurrentMethodName, "Cannot create CEP version text file"
		        Exit
		      end if
		      
		      tos.Write selectedVersion
		      tos.Close
		      
		      Dim extensionDirNameFile as FolderItem
		      extensionDirNameFile = buildSettingsFolder.Child(kFileName_ExtensionDirName)
		      
		      tos = TextOutputStream.Create(extensionDirnameFile)
		      if tos = nil then
		        LogError CurrentMethodName, "Cannot create dirname text file"
		        Exit
		      end if
		      
		      tos.Write extensionDirName
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
		      
		      if left(in_sourceItem.Name, 1) = "." then
		        Exit
		      end if
		      
		      Dim sourceText as String
		      sourceText = ProcessIncludes(in_sourceItem)
		      
		      Dim generatedText as String
		      generatedText = ReplacePlaceholders(sourceText)
		      
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
		          
		          if not IsReservedSubitem(subItem) then
		            
		            Dim subItemName as String
		            subItemName = subItem.Name
		            
		            Dim selector as String
		            Dim value as String
		            Dim isConditionalFolder as Boolean
		            isConditionalFolder = ParseConditionalFolderName(subItem, selector, value)
		            
		            if isConditionalFolder then
		              
		              if IsSelectedConditionalFolder(selector, value) then
		                GenerateProjectItemFromTemplate in_selectedVersion, subItem, in_targetItem
		              end if
		              
		            else
		              
		              Dim targetItem as FolderItem
		              targetItem = in_targetItem.Child(subItemName)
		              
		              GenerateProjectItemFromTemplate in_selectedVersion, subItem, targetItem
		              
		            end if
		            
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
		      ReportError "This project folder has been previously configured. Please unzip the original folder and try again with a clean copy"
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
		      
		      MsgBox appFolder.URLPath
		      
		      fTemplatesFolder = nil
		      fProjectRootFolder = appFolder
		      
		      do
		        fProjectRootFolder = fProjectRootFolder.parent
		        if fProjectRootFolder <> nil then
		          fTemplatesFolder = fProjectRootFolder.Child(kTemplatesFolderName)
		        end if
		      Loop until fProjectRootFolder = nil or (fTemplatesFolder <> nil and fTemplatesFolder.Directory)
		      
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
		      
		      Dim subItemCount as Integer
		      subItemCount = fCSXSTemplatesFolder.Count
		      
		      Redim fCSXSVersionList(-1)
		      for idx as integer = 1 to subItemCount
		        Dim subFolder as FolderItem
		        subFolder = fCSXSTemplatesFolder.Item(idx)
		        if subFolder <> nil and subFolder.Directory then
		          
		          Dim selector as String
		          Dim value as String
		          Dim isConditionalFolder as Boolean
		          isConditionalFolder = ParseConditionalFolderName(subFolder, selector, value)
		          
		          if isConditionalFolder and selector = kPlaceholder_CEPVersion then
		            Dim manifestFile as FolderItem
		            manifestFile = subFolder.Child(kManifestFileName)
		            if manifestFile <> nil and manifestFile.exists then
		              fCSXSVersionList.Append value
		              fCSXSManifestTemplateList.Append manifestFile
		            end if
		          end if
		        end if
		      next
		      
		      fCSXSVersionList.SortWith(fCSXSManifestTemplateList)
		      
		      fPlaceholderDict = new Dictionary
		      ExtractPlaceholdersFromTemplates fTemplatesFolder, fPlaceholderDict
		      
		      fHelpStringDict = new Dictionary
		      fSelectionListDict = new Dictionary
		      ParseConfigFile fPlaceholderDict, fHelpStringDict, fSelectionListDict
		      
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
		Function IsReservedSubitem(in_item as FolderItem) As Boolean
		  Dim retVal as Boolean
		  
		  do
		    
		    try 
		      
		      retVal = true
		      
		      if in_item = nil then
		        LogError CurrentMethodName, "in_item = nil"
		        Exit
		      end if
		      
		      if not in_item.Exists then
		        LogError CurrentMethodName, "in_item does not exist"
		        Exit
		      end if
		      
		      Dim name as String
		      name = in_item.Name
		      
		      if left(name,1) = "." then
		        Exit
		      end if
		      
		      if name = kIncludesFolderName and in_item.Parent.URLPath = fTemplatesFolder.URLPath then
		        Exit
		      end if
		      
		      retVal = false
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Copy loop throws " + e.Message
		    end try
		    
		  Loop Until true
		  
		  return retVal
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function IsSelectedConditionalFolder(in_selector as String, in_value as String) As Boolean
		  Dim retVal as Boolean
		  
		  do
		    
		    try 
		      
		      if fPlaceholderDict.HasKey(in_selector) then
		        Dim compareValue as String
		        compareValue = fPlaceholderDict.Value(in_selector)
		        if in_value = compareValue then
		          retVal = true
		        end if
		        Exit
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
		  
		  MsgBox in_methodName + " " + in_message
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function ParseConditionalFolderName(in_folder as FolderItem, ByRef out_selector as String, ByRef out_value as String) As Boolean
		  Dim retVal as Boolean
		  
		  do
		    
		    try 
		      
		      if in_folder = nil or not in_folder.Directory then
		        Exit
		      end if
		      
		      Dim folderName as String
		      folderName = in_folder.Name
		      
		      Static conditionalFolderRegEx as RegEx
		      if conditionalFolderRegEx = nil then
		        conditionalFolderRegEx = new RegEx
		        conditionalFolderRegEx.SearchPattern = "^\$\$([^-]+)\$\$-(.+)$"
		      end if
		      
		      Dim match as RegExMatch
		      match = conditionalFolderRegEx.Search(folderName)
		      if match <> nil and match.SubExpressionCount = 3 then
		        
		        out_selector = match.SubExpressionString(1)
		        out_value = match.SubExpressionString(2)
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
		Sub ParseConfigFile(io_placeholders as Dictionary, io_helpStrings as Dictionary, io_selectionList as Dictionary)
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
		            if StartsWith(kPlaceHolderPrefix_Help, placeholder) then
		              placeholder = Mid(placeholder,kPlaceHolderPrefix_Help.Len + 1)
		              io_helpStrings.Value(placeholder) = value
		            elseif StartsWith(kPlaceHolderPrefix_SelectionList, placeholder) then
		              placeholder = Mid(placeholder,kPlaceHolderPrefix_SelectionList.Len + 1)
		              io_selectionList.Value(placeholder) = value
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
		Function ProcessIncludes(in_file as FolderItem) As String
		  Dim fileText as String
		  
		  do
		    try 
		      
		      fileText = ReadFileText(in_file)
		      
		      Dim lines() as String
		      lines = SplitIntoLines(fileText)
		      
		      Dim includesFolder as FolderItem
		      includesFolder = fTemplatesFolder.Child(kIncludesFolderName)
		      if includesFolder = nil then
		        LogError CurrentMethodName, "includesFolder = nil"
		        Exit
		      end if
		      
		      if not includesFolder.Directory then
		        LogError CurrentMethodName, "includesFolder does not exist"
		        Exit
		      end if
		      
		      Dim changed as Boolean
		      
		      do
		        
		        Dim conditionStack() as Boolean
		        Dim condition as Boolean
		        condition = true
		        changed = false
		        
		        Dim updatedLines() as String
		        
		        for each line as String in lines
		          
		          Dim trimmedLine as String
		          trimmedLine = Trim(line)
		          
		          if StartsWith(kPreprocessorCommand_Include, trimmedLine) then
		            
		            Dim fileName as String
		            fileName = Trim(trimmedLine.Mid(kPreprocessorCommand_Include.Len + 1))
		            if Left(fileName,1) = Chr(34) and Right(fileName, 1) = Chr(34) then
		              fileName = Mid(fileName, 2, Len(fileName) - 2)
		            end if
		            
		            Dim includeFile as FolderItem
		            includeFile = includesFolder.Child(fileName)
		            
		            if includeFile = nil or not includeFile.Exists then
		              
		              if condition then
		                updatedLines.Append line
		              end if
		              
		            else
		              
		              if condition then
		                
		                changed = true
		                
		                Dim includeText as String
		                includeText = ReadFileText(includeFile)
		                
		                Dim includeLines() as String
		                includeLines = SplitIntoLines(includeText)
		                
		                
		                for each includeLine as String in includeLines
		                  updatedLines.Append includeLine
		                next
		                
		              end if
		              
		            end if
		            
		          elseif StartsWith(kPreprocessorCommand_If, trimmedLine) then
		            
		            Dim expression as String
		            expression = Trim(trimmedLine.Mid(kPreprocessorCommand_If.Len + 1))
		            
		            conditionStack.Append condition
		            
		            expression = ReplacePlaceholders(expression)
		            
		            condition = condition and EvalCondition(expression)
		            
		          elseif StartsWith(kPreprocessorCommand_ElseIf, trimmedLine) then
		            
		            Dim expression as String
		            expression = Trim(trimmedLine.Mid(kPreprocessorCommand_ElseIf.Len + 1))
		            
		            if UBound(conditionStack) >= 0 then
		              condition = conditionStack.Pop
		            else
		              condition = true
		            end if
		            
		            conditionStack.Append condition
		            
		            expression = ReplacePlaceholders(expression)
		            
		            condition = condition and EvalCondition(expression)
		            
		          elseif StartsWith(kPreprocessorCommand_Else, trimmedLine) then
		            
		            condition = not condition
		            
		          elseif StartsWith(kPreprocessorCommand_Endif, trimmedLine) then
		            
		            if UBound(conditionStack) >= 0 then
		              condition = conditionStack.Pop
		            else
		              condition = true
		            end if
		            
		          else
		            
		            if condition then
		              updatedLines.Append line
		            end if
		            
		          end if
		        next
		        
		        lines = updatedLines
		        
		      loop until not changed
		      
		      fileText = Join(lines, EndOfLine)
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop Until true
		  
		  return fileText
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function ReadFileText(in_file as FolderItem) As String
		  Dim fileText as String
		  
		  do
		    try 
		      
		      if in_file = nil then
		        LogError CurrentMethodName, "in_file = nil"
		        Exit
		      end if
		      
		      if not in_file.Exists then
		        LogError CurrentMethodName, "in_file does not exist"
		        Exit
		      end if
		      
		      Dim tis as TextInputStream
		      tis = TextInputStream.Open(in_file)
		      if tis = nil then
		        LogError CurrentMethodName, "Cannot open text file"
		        Exit
		      end if
		      
		      fileText = tis.ReadAll
		      tis.Close
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop Until true
		  
		  return fileText
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function ReplacePlaceholders(in_text as String) As String
		  Dim generatedText as String
		  
		  do
		    try 
		      
		      Dim textChopped as String
		      textChopped = in_text
		      
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
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop Until true
		  
		  return generatedText
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub ReportError(in_message as String)
		  if fErrorMessage = "" then
		    fErrorMessage = in_message
		  end if
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Function SplitIntoLines(in_fileText as String) As String()
		  Dim lines() as String
		  
		  do
		    try 
		      
		      Dim delimiter as String
		      delimiter = Chr(13) + Chr(10)
		      
		      lines = in_fileText.Split(delimiter)
		      
		      if UBound(lines) = 0 then
		        delimiter = Chr(13)
		        lines = in_fileText.Split(delimiter)
		        if UBound(lines) = 0 then
		          delimiter = Chr(10)
		          lines = in_fileText.Split(delimiter)
		        end if
		      end if
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop Until true
		  
		  return lines
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Function StartsWith(in_start as String, in_s as String) As Boolean
		  Dim retVal as Boolean
		  
		  do 
		    
		    try 
		      
		      retVal = (Left(in_s, in_start.Len) = in_start)
		      
		    catch e as RuntimeException
		      LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop until true
		  
		  return retVal
		End Function
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub UpdateUI()
		  do 
		    LstConfigStrings.TextSize = 10
		    LstConfigStrings.DefaultRowHeight = 14
		    
		    PupCEPVersion.DeleteAllRows
		    
		    Dim selectedVersionString as String
		    if fPlaceholderDict.HasKey(kPlaceholder_CEPVersion) then
		      selectedVersionString = fPlaceholderDict.Value(kPlaceholder_CEPVersion)
		    end if
		    
		    Dim highestVersion as double
		    Dim highestVersionIdx as integer
		    highestVersionIdx = -1
		    Dim selectedIdx as integer
		    selectedIdx = -1
		    for idx as integer = 0 to UBound(fCSXSVersionList)
		      dim versionString as String
		      versionString = fCSXSVersionList(idx)
		      PupCEPVersion.AddRow versionString
		      Dim version as Double
		      version = Val(versionString)
		      if version > highestVersion then
		        highestVersion = version
		        highestVersionIdx = idx
		      end if
		      if selectedVersionString <> "" and versionString = selectedVersionString then
		        selectedIdx = idx
		      end if
		    next
		    
		    if selectedIdx >= 0 then
		      PupCEPVersion.ListIndex = selectedIdx
		    elseif highestVersionIdx >= 0 then
		      PupCEPVersion.ListIndex = highestVersionIdx
		    end if
		    
		    LstConfigStrings.DeleteAllRows
		    for idx as integer = 0 to UBound(fPlaceholders)
		      Dim placeholder as String
		      placeholder = fPlaceholders(idx)
		      if placeholder <> kPlaceholder_CEPVersion then
		        
		        LstConfigStrings.AddRow placeholder
		        
		        Dim row as Integer
		        row = LstConfigStrings.ListCount - 1
		        
		        if fPlaceholderDict.HasKey(placeholder) then
		          LstConfigStrings.Cell(row,1) = fPlaceholderDict.Value(placeholder)
		          LstConfigStrings.CellType(row, 1) = Listbox.TypeEditableTextField
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
		fSelectionListDict As Dictionary
	#tag EndProperty

	#tag Property, Flags = &h0
		fTemplatesFolder As FolderItem
	#tag EndProperty


	#tag Constant, Name = kBuildSettingsFolderName, Type = String, Dynamic = False, Default = \"BuildSettings", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kCSXSFolderName, Type = String, Dynamic = False, Default = \"CSXS", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kFileName_CEPVersion, Type = String, Dynamic = False, Default = \"CEPVersion.txt", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kFileName_ExtensionDirName, Type = String, Dynamic = False, Default = \"ExtensionDirName.txt", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kFileName_ExtensionVersion, Type = String, Dynamic = False, Default = \"ExtensionVersion.txt", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kGeneratedProjectConfigFileName, Type = String, Dynamic = False, Default = \"ProjectSettings", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kIncludesFolderName, Type = String, Dynamic = False, Default = \"includes", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kMacScriptFolder, Type = String, Dynamic = False, Default = \"Mac", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kManifestFileName, Type = String, Dynamic = False, Default = \"manifest.xml", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPlaceholderPrefixSuffix, Type = String, Dynamic = False, Default = \"$$", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPlaceHolderPrefix_Help, Type = String, Dynamic = False, Default = \"HELP_", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPlaceHolderPrefix_SelectionList, Type = String, Dynamic = False, Default = \"SELECT_", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPlaceholder_CEPVersion, Type = String, Dynamic = False, Default = \"CEPVERSION", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPlaceholder_ExtensionDirName, Type = String, Dynamic = False, Default = \"EXTENSION_DIRNAME", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPlaceholder_ExtensionVersion, Type = String, Dynamic = False, Default = \"EXTENSION_VERSION", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPlaceholder_TargetApp, Type = String, Dynamic = False, Default = \"TARGETAPP", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPreprocessorCommand_Else, Type = String, Dynamic = False, Default = \"$else", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPreprocessorCommand_ElseIf, Type = String, Dynamic = False, Default = \"$elif", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPreprocessorCommand_Endif, Type = String, Dynamic = False, Default = \"$endif", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPreprocessorCommand_If, Type = String, Dynamic = False, Default = \"$if", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPreprocessorCommand_Include, Type = String, Dynamic = False, Default = \"$include", Scope = Public
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

#tag Events LstConfigStrings
	#tag Event
		Sub MouseUp(x As Integer, y As Integer)
		  Dim row As Integer = Me.RowFromXY(x, y)
		  
		  Dim placeholder as String
		  placeholder = Me.Cell(row, 0)
		  
		  if fSelectionListDict.HasKey(placeholder) then
		    Dim col As Integer = Me.ColumnFromXY(x, y)
		    If col = 1 Then
		      
		      Me.ListIndex = row
		      Me.Selected(row) = True
		      
		      Dim selectionsStr as String 
		      selectionsStr = fSelectionListDict.Value(placeholder)
		      
		      Dim selections() as String
		      selections = selectionsStr.Split(",")
		      
		      Dim base As New MenuItem
		      for idx as integer = 0 to UBound(selections)
		        Dim selection as String
		        selection = selections(idx)
		        base.Append(New MenuItem(selections(idx)))
		      next
		      
		      Dim selectedMenu As MenuItem
		      selectedMenu = base.PopUp
		      
		      If selectedMenu <> Nil Then
		        // CellTextPaint will check for a value in the CellTag
		        // and display it.
		        Me.Cell(row,1) = selectedMenu.Text
		      End If
		    End If
		  end if
		  
		  
		End Sub
	#tag EndEvent
	#tag Event
		Function MouseDown(x As Integer, y As Integer) As Boolean
		  Dim retVal as Boolean
		  
		  Dim row As Integer
		  row = Me.RowFromXY(X, Y)
		  
		  Dim placeholder as String
		  placeholder = Me.Cell(row, 0)
		  
		  if fSelectionListDict.HasKey(placeholder) then
		    retVal = true
		  end if
		  
		  return retVal
		  
		End Function
	#tag EndEvent
	#tag Event
		Sub MouseMove(X As Integer, Y As Integer)
		  Dim helpText as String
		  
		  Dim row As Integer
		  row = Me.RowFromXY(X, Y)
		  
		  Dim placeholder as String
		  placeholder = Me.Cell(row, 0)
		  
		  if fHelpStringDict.HasKey(placeholder) then
		    helpText = fHelpStringDict.Value(placeholder)
		  end if
		  
		  if helpText <> "" and Right(helpText, 1) <> "." then
		    helpText = helptext + "."
		  end if
		  
		  if not fSelectionListDict.HasKey(placeholder) then
		    helpText = helpText + " Double-click value to edit."
		  else
		    helpText = helpText + " Click triangle for menu."
		  end if
		  
		  LblHelpText.Text = helpText
		End Sub
	#tag EndEvent
	#tag Event
		Function CellTextPaint(g As Graphics, row As Integer, column As Integer, x as Integer, y as Integer) As Boolean
		  Select Case column
		  Case 1 // PopupMenu
		    
		    Dim placeholder as String
		    placeholder = Me.Cell(row, 0)
		    
		    if fSelectionListDict.HasKey(placeholder) then
		      
		      // Points for a triangle on the right side of the cell
		      Dim points(6) As Integer
		      points(1) = g.Width - 10
		      points(2) = 1
		      points(3) = g.Width
		      points(4) = 1
		      points(5) = g.Width - 5
		      points(6) = 10
		      
		      g.FillPolygon(points)
		      
		    end if
		    
		    
		  End Select
		End Function
	#tag EndEvent
#tag EndEvents
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
	#tag ViewProperty
		Name="fQuitting"
		Group="Behavior"
		Type="Boolean"
	#tag EndViewProperty
#tag EndViewBehavior
