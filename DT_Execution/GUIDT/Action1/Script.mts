Window("Notepad").WinEditor("Edit").Type "Data table value = " & DataTable("Riki", dtGlobalSheet) & vbNewLine


Window("Notepad").WinEditor("Edit").Type "ParamString = " & Parameter("ParamString") & vbNewLine

Window("Notepad").WinEditor("Edit").Type  "ParamNumber = " & Parameter("ParamNumber") & vbNewLine

Window("Notepad").WinEditor("Edit").Type  "ParamBoolean = " & Parameter("ParamBoolean") & vbNewLine

Window("Notepad").Close
Window("Notepad").Dialog("Notepad").WinButton("Don't Save").Click @@ hightlight id_;_263024_;_script infofile_;_ZIP::ssf4.xml_;_
