#tag Class
Protected Class CConditionParserState
	#tag Method, Flags = &h0
		Sub Constructor()
		  fState = kState_Idle
		  fStr1 = ""
		  fStr2 = ""
		  fOperator = ""
		  fAndValue = true
		  fOrValue = false
		  fInverted = false
		  
		End Sub
	#tag EndMethod

	#tag Method, Flags = &h0
		Sub StringComplete()
		  fState = kState_Idle
		  Dim noOperator as Boolean
		  Dim value as Boolean
		  if fOperator = "==" then
		    value = fStr1 = fStr2
		  elseif fOperator = "!=" then
		    value = fStr1 <> fStr2
		  elseif fOperator = ">=" or fOperator = "=>" then
		    value = fStr1 <= fStr2
		  elseif fOperator = "=<" or fOperator = "<=" then
		    value = fStr1 >= fStr2
		  elseif fOperator = ":starts_with" then
		    value = fStr1.Left(Len(fStr2)) = fStr2
		  else
		    fStr1 = fStr2
		    noOperator = true
		  end if
		  
		  if not noOperator then
		    if fInverted then
		      fInverted = false
		      value = not value
		    end if
		    fAndValue = fAndValue and value
		    fOperator = ""
		    fStr1 = ""
		  end if
		  
		  fStr2 = ""
		  
		End Sub
	#tag EndMethod


	#tag Property, Flags = &h0
		fAndValue As Boolean
	#tag EndProperty

	#tag Property, Flags = &h0
		fInverted As Boolean
	#tag EndProperty

	#tag Property, Flags = &h0
		fOperator As String
	#tag EndProperty

	#tag Property, Flags = &h0
		fOrValue As Boolean
	#tag EndProperty

	#tag Property, Flags = &h0
		fState As Integer
	#tag EndProperty

	#tag Property, Flags = &h0
		fStr1 As String
	#tag EndProperty

	#tag Property, Flags = &h0
		fStr2 As String
	#tag EndProperty


	#tag Constant, Name = kState_DoubleQuotedString, Type = Double, Dynamic = False, Default = \"1", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kState_EscapedDoubleQuotedString, Type = Double, Dynamic = False, Default = \"3", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kState_EscapedQuotedString, Type = Double, Dynamic = False, Default = \"4", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kState_Idle, Type = Double, Dynamic = False, Default = \"0", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kState_Operator, Type = Double, Dynamic = False, Default = \"6", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kState_QuotedString, Type = Double, Dynamic = False, Default = \"2", Scope = Public
	#tag EndConstant

	#tag Constant, Name = kState_UnquotedString, Type = Double, Dynamic = False, Default = \"5", Scope = Public
	#tag EndConstant


	#tag ViewBehavior
		#tag ViewProperty
			Name="Name"
			Visible=true
			Group="ID"
			InitialValue=""
			Type="String"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="Index"
			Visible=true
			Group="ID"
			InitialValue="-2147483648"
			Type="Integer"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="Super"
			Visible=true
			Group="ID"
			InitialValue=""
			Type="String"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="Left"
			Visible=true
			Group="Position"
			InitialValue="0"
			Type="Integer"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="Top"
			Visible=true
			Group="Position"
			InitialValue="0"
			Type="Integer"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="fState"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="Integer"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="fOperator"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="fStr1"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="fStr2"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="String"
			EditorType="MultiLineEditor"
		#tag EndViewProperty
		#tag ViewProperty
			Name="fAndValue"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="Boolean"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="fOrValue"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="Boolean"
			EditorType=""
		#tag EndViewProperty
		#tag ViewProperty
			Name="fInverted"
			Visible=false
			Group="Behavior"
			InitialValue=""
			Type="Boolean"
			EditorType=""
		#tag EndViewProperty
	#tag EndViewBehavior
End Class
#tag EndClass
