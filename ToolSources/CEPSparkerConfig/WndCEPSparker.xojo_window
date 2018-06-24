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
   Height          =   436
   ImplicitInstance=   True
   LiveResize      =   True
   MacProcID       =   0
   MaxHeight       =   32000
   MaximizeButton  =   True
   MaxWidth        =   32000
   MenuBar         =   1754114047
   MenuBarVisible  =   True
   MinHeight       =   64
   MinimizeButton  =   True
   MinWidth        =   64
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
      Height          =   329
      HelpTag         =   ""
      Hierarchical    =   False
      Index           =   -2147483648
      InitialParent   =   ""
      InitialValue    =   "Setting	Value"
      Italic          =   False
      Left            =   20
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   False
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
      Top             =   52
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
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   False
      LockTop         =   True
      Scope           =   0
      TabIndex        =   4
      TabPanelIndex   =   0
      TabStop         =   True
      TextFont        =   "System"
      TextSize        =   0.0
      TextUnit        =   0
      Top             =   396
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
      LockBottom      =   False
      LockedInPosition=   False
      LockLeft        =   True
      LockRight       =   False
      LockTop         =   True
      Scope           =   0
      TabIndex        =   5
      TabPanelIndex   =   0
      TabStop         =   True
      TextFont        =   "System"
      TextSize        =   0.0
      TextUnit        =   0
      Top             =   396
      Transparent     =   False
      Underline       =   False
      Visible         =   True
      Width           =   80
   End
End
#tag EndWindow

#tag WindowCode
	#tag Event
		Sub Open()
		  do 
		    Init
		    if fErrorMessage <> "" then
		      MsgBox fErrorMessage
		      Quit
		      Exit
		    end if
		    
		    UpdateUI
		  loop until True
		End Sub
	#tag EndEvent


	#tag Method, Flags = &h0
		Sub Generate()
		  do
		    
		  Loop Until true
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub Init()
		  do 
		    try 
		      
		      Dim appFolder as FolderItem
		      appFolder = GetFolderItem("")
		      
		      fProjectHomeFolder = appFolder.Parent
		      while (fProjectHomeFolder <> nil) and (fProjectHomeFolder.Name <> kProjectHomeFolderName)
		        fProjectHomeFolder = fProjectHomeFolder.Parent
		      wend
		      
		      if fProjectHomeFolder = nil then
		        LogError CurrentMethodName, "Cannot find project home folder '" + kProjectHomeFolderName + "'"
		        ReportError "Cannot find project home folder '" + kProjectHomeFolderName + "'"
		        Exit
		      end if
		      
		      fTemplateFolder = fProjectHomeFolder.Child(kTemplatesFolderName)
		      if fTemplateFolder = nil or not fTemplateFolder.Directory then
		        LogError CurrentMethodName, "Cannot find project templates folder '" + kTemplatesFolderName + "'"
		        ReportError "Cannot find project templates folder '" + kTemplatesFolderName + "'"
		        Exit
		      end if
		      
		      fCSXSTemplatesFolder = fTemplateFolder.Child(kCSXSFolderName)
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
		      ParseTemplates fPlaceholderDict
		      ParseConfigFile fPlaceholderDict
		      
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
		Sub LogError(in_methodName as String, in_message as String)
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub ParseConfigFile(io_placeholders as Dictionary)
		  do 
		    
		    try 
		      
		      if fProjectHomeFolder = nil then
		        LogError CurrentMethodName, "fProjectHomeFolder = nil"
		        Exit
		      end if
		      
		      if not fProjectHomeFolder.Directory then
		        LogError CurrentMethodName, "fProjectHomeFolder does not exist"
		        Exit
		      end if
		      
		      Dim projectConfigFile as FolderItem
		      projectConfigFile = fProjectHomeFolder.Child(kProjectConfigFileName)
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
		            io_placeholders.Value(placeholder) = value
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
		Sub ParseManifest(in_manifestTemplateFile as FolderItem, io_placeholders as Dictionary)
		  ParseTextFile in_manifestTemplateFile, io_placeholders
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub ParseTemplates(io_placeholders as Dictionary)
		  for each manifestTemplateFile as FolderItem in fCSXSManifestTemplateList
		    ParseManifest manifestTemplateFile, io_placeholders
		  next
		  
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
		      
		      Dim placeholderMatch as RegEx
		      placeHolderMatch = new RegEx
		      placeholderMatch.SearchPattern = "^[a-z][a-z0-9_-]*$"
		      placeholderMatch.Options.CaseSensitive = false
		      
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
		      LstConfigStrings.AddRow fPlaceholders(idx)
		      LstConfigStrings.Cell(idx,1) = fPlaceholderDict.Value(fPlaceholders(idx))
		      LstConfigStrings.CellType(idx, 1) = Listbox.TypeEditableTextField
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
		fPlaceholderDict As Dictionary
	#tag EndProperty

	#tag Property, Flags = &h0
		fPlaceholders() As String
	#tag EndProperty

	#tag Property, Flags = &h0
		fProjectHomeFolder As FolderItem
	#tag EndProperty

	#tag Property, Flags = &h0
		fTemplateFolder As FolderItem
	#tag EndProperty


	#tag Constant, Name = kCSXSFolderName, Type = String, Dynamic = False, Default = \"CSXS", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kManifestFileName, Type = String, Dynamic = False, Default = \"manifest.xml", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kPlaceholderPrefixSuffix, Type = String, Dynamic = False, Default = \"$$", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kProjectConfigFileName, Type = String, Dynamic = False, Default = \"ProjectConfig.txt", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kProjectHomeFolderName, Type = String, Dynamic = False, Default = \"CEPSparker", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kTemplatesFolderName, Type = String, Dynamic = False, Default = \"Templates", Scope = Public
	#tag EndConstant


#tag EndWindowCode

#tag Events BtnGenerate
	#tag Event
		Sub Action()
		  Generate
		  Quit
		  
		End Sub
	#tag EndEvent
#tag EndEvents
#tag Events BtnCancel
	#tag Event
		Sub Action()
		  Quit
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
