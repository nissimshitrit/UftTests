Browser("Login").Page("Login").WebEdit("WebEdit").Set DataTable("User", dtGlobalSheet)
Browser("Login").Page("Login").WebEdit("WebEdit_2").SetSecure "59492c7610bf491a8de90e1335c5594333375ad17141"
Browser("Login").Page("Login").WebButton("Login").Click
wait(10)
Browser("Login").Page("BACKLOG - Features").WebElement("BACKLOG").Click
Browser("Login").Page("BACKLOG - Features").Link("TEAM BACKLOG").Click
Browser("Login").Page("TEAM BACKLOG_2").WebButton("Team Management").Click
Browser("Login").CloseAllTabs

