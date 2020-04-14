#tag Class
Protected Class CConditionParser
	#tag Method, Flags = &h0
		Shared Function EvalCondition(in_condition as String) As Boolean
		  Dim retVal as Boolean
		  
		  do
		    try 
		      
		      Dim cpsStack() as CConditionParserState
		      
		      Dim cps as CConditionParserState
		      cps = new CConditionParserState
		      
		      Dim pos as integer
		      Dim nestedCps as CConditionParserState
		      
		      while pos <= Len(in_condition) 
		        
		        Dim c as String
		        c = in_condition.Mid(pos, 1)
		        pos = pos + 1
		        
		        if c = "(" then
		          cpsStack.Append cps
		          nestedCps = new CConditionParserState
		          cps = nestedCps
		        elseif c = ")" then
		          nestedCps = cps
		          cps = cpsStack.Pop
		          nestedCps.fOrValue = nestedCps.fOrValue or nestedCps.fAndValue
		          if cps.fInverted then
		            cps.fInverted = false
		            nestedCps.fOrValue = not nestedCps.fOrValue
		          end if
		          cps.fAndValue = cps.fAndValue and nestedCps.fOrValue
		        else
		          select case cps.fState
		          case CConditionParserState.kState_Idle
		            if c = Chr(34) then
		              cps.fState = CConditionParserState.kState_DoubleQuotedString
		              cps.fStr2 = ""
		            elseif c = Chr(39) then
		              cps.fState = CConditionParserState.kState_QuotedString
		              cps.fStr2 = ""
		            elseif c >= "A" and c <= "Z" or c >= "a" and c <= "z" or c = "$" then
		              cps.fState = CConditionParserState.kState_UnquotedString
		              cps.fStr2 = c
		            elseif c > " " then
		              cps.fState = CConditionParserState.kState_Operator
		              cps.fOperator = c
		            end if
		          case CConditionParserState.kState_Operator
		            if c > " " then
		              cps.fOperator = cps.fOperator + c
		            else
		              if cps.fOperator = "!" then
		                cps.fOperator = ""
		                cps.fInverted = not cps.fInverted
		              end if
		              cps.fState = CConditionParserState.kState_Idle
		            end if
		          case CConditionParserState.kState_UnquotedString
		            if c > " " then
		              cps.fStr2 = cps.fStr2 + c
		            elseif cps.fStr2 = "not" then
		              cps.fStr2 = ""
		              cps.fInverted = not cps.fInverted
		              cps.fState = CConditionParserState.kState_Idle
		            elseif cps.fStr2 = "and" then
		              cps.fStr2 = ""
		              cps.fState = CConditionParserState.kState_Idle
		            elseif cps.fStr2 = "or" then
		              cps.fOrValue = cps.fOrValue or cps.fAndValue
		              cps.fAndValue = true
		              cps.fStr2 = ""
		              cps.fState = CConditionParserState.kState_Idle
		            else
		              cps.StringComplete
		            end if
		          case CConditionParserState.kState_DoubleQuotedString
		            if c = "\" then
		              cps.fState = CConditionParserState.kState_EscapedDoubleQuotedString
		            elseif c = Chr(34) then
		              cps.StringComplete
		            else 
		              cps.fStr2 = cps.fStr2 + c
		            end if
		          case CConditionParserState.kState_EscapedDoubleQuotedString
		            cps.fState = CConditionParserState.kState_DoubleQuotedString
		            cps.fStr2 = cps.fStr2 + c
		          case CConditionParserState.kState_QuotedString
		            if c = "\" then
		              cps.fState = CConditionParserState.kState_EscapedQuotedString
		            elseif c = Chr(39) then
		              cps.StringComplete
		            else 
		              cps.fStr2 = cps.fStr2 + c
		            end if
		          case CConditionParserState.kState_EscapedQuotedString
		            cps.fState = CConditionParserState.kState_QuotedString
		            cps.fStr2 = cps.fStr2 + c
		          end select
		        end if
		        
		      wend
		      
		      cps.fOrValue = cps.fOrValue or cps.fAndValue
		      
		      retVal = cps.fOrValue
		      
		    catch e as RuntimeException
		      WndCEPSparker.LogError CurrentMethodName, "Throws " + e.Message
		    end try
		    
		  Loop Until true
		  
		  return retVal
		End Function
	#tag EndMethod


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
	#tag EndViewBehavior
End Class
#tag EndClass
