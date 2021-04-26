SystemUtil.Run ("Notepad.exe")

Window("Notepad").WinEditor("Edit").Type DataTable("Param1", dtGlobalSheet)

wait 1

Window("Notepad").Close
Window("Notepad").Dialog("Notepad").WinButton("Don't Save").Click



