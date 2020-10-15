Window("Notepad").WinEditor("Edit").Type DataTable("Riki", dtGlobalSheet)
Window("Notepad").WinEditor("Edit").Type vbNewLine
Window("Notepad").WinEditor("Edit").Type "ParamString = " + Parameter("ParamString") 

Window("Notepad").WinEditor("Edit").Type vbNewLine
Window("Notepad").WinEditor("Edit").Type  "ParamNumber = "
Window("Notepad").WinEditor("Edit").Type  Parameter("ParamNumber")

Window("Notepad").WinEditor("Edit").Type vbNewLine
Window("Notepad").WinEditor("Edit").Type  "ParamBoolean = "
Window("Notepad").WinEditor("Edit").Type  Parameter("ParamBoolean")

Window("Notepad").WinEditor("Edit").Type vbNewLine
Window("Notepad").WinEditor("Edit").Type  "ParamDate = "
Window("Notepad").WinEditor("Edit").Type  Parameter("ParamDate")

Window("Notepad").Close
Window("Notepad").Dialog("Notepad").WinButton("Don't Save").Click @@ hightlight id_;_263024_;_script infofile_;_ZIP::ssf4.xml_;_
