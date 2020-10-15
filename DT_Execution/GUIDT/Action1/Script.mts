Window("Notepad").WinEditor("Edit").Type DataTable("Riki", dtGlobalSheet) & vbNewLine


Set qtApp = CreateObject("QuickTest.Application")    
Set oParams = qtApp.Test.ParameterDefinitions.GetParameters()


Window("Notepad").WinEditor("Edit").Type "ParamString = " & oParams.Item("ParamString").Value & vbNewLine

Window("Notepad").WinEditor("Edit").Type  "ParamNumber = " & oParams.Item("ParamNumber").Value & vbNewLine

Window("Notepad").WinEditor("Edit").Type  "ParamBoolean = " & oParams.Item("ParamBoolean").Value & vbNewLine

Window("Notepad").WinEditor("Edit").Type  "ParamDate = " & oParams.Item("ParamDate").Value & vbNewLine

Window("Notepad").Close
Window("Notepad").Dialog("Notepad").WinButton("Don't Save").Click @@ hightlight id_;_263024_;_script infofile_;_ZIP::ssf4.xml_;_
