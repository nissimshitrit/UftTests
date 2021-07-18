systemutil.Run("C:\Program Files (x86)\Micro Focus\UFT One\samples\Flights Application\FlightsGUI.exe")


WpfWindow("Micro Focus MyFlight Sample").WpfEdit("agentName").Set "john" @@ hightlight id_;_1909924872_;_script infofile_;_ZIP::ssf2.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("password").SetSecure "60f095204fb7357e524f" @@ hightlight id_;_2051608352_;_script infofile_;_ZIP::ssf4.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("OK").Click @@ hightlight id_;_1909921320_;_script infofile_;_ZIP::ssf3.xml_;_

'Start the code from action 1

systemutil.Run("C:\Program Files (x86)\Micro Focus\UFT One\samples\Flights Application\FlightsGUI.exe")
wait 1
systemutil.Run("C:\Program Files (x86)\Micro Focus\UFT One\samples\Flights Application\FlightsGUI.exe")




'WpfWindow("Micro Focus MyFlight Sample").Move 438,120

WpfWindow("Micro Focus MyFlight Sample").WpfEdit("agentName").Set "muli"
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("password").SetSecure "60edd45fdda413a9266b065f3f8b"
WpfWindow("Micro Focus MyFlight Sample").WpfButton("OK").Click

WpfWindow("Micro Focus MyFlight Sample").WpfEdit("password").SetSecure "60edd471e7eb"
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("agentName").Set "john"
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("password").SetSecure "60edd48049ece8e7905b"
WpfWindow("Micro Focus MyFlight Sample").WpfButton("OK").Click
Dialog("Login Failed").WinButton("OK").Click

