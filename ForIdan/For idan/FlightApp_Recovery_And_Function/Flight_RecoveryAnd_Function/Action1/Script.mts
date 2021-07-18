
func()

systemutil.Run("C:\Program Files (x86)\Micro Focus\UFT One\samples\Flights Application\FlightsGUI.exe")
wait 1
systemutil.Run("C:\Program Files (x86)\Micro Focus\UFT One\samples\Flights Application\FlightsGUI.exe")




'WpfWindow("Micro Focus MyFlight Sample").Move 438,120 @@ hightlight id_;_1314024_;_script infofile_;_ZIP::ssf13.xml_;_

WpfWindow("Micro Focus MyFlight Sample").WpfEdit("agentName").Set "muli" @@ hightlight id_;_1925326792_;_script infofile_;_ZIP::ssf3.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("password").SetSecure "60edd45fdda413a9266b065f3f8b" @@ hightlight id_;_1925327896_;_script infofile_;_ZIP::ssf6.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("OK").Click @@ hightlight id_;_1925329960_;_script infofile_;_ZIP::ssf5.xml_;_
 @@ hightlight id_;_2556838_;_script infofile_;_ZIP::ssf7.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("password").SetSecure "60edd471e7eb" @@ hightlight id_;_1925327896_;_script infofile_;_ZIP::ssf8.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("agentName").Set "john" @@ hightlight id_;_1925326792_;_script infofile_;_ZIP::ssf9.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("password").SetSecure "60edd48049ece8e7905b" @@ hightlight id_;_1925327896_;_script infofile_;_ZIP::ssf11.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("OK").Click @@ hightlight id_;_1925329960_;_script infofile_;_ZIP::ssf10.xml_;_
Dialog("Login Failed").WinButton("OK").Click @@ hightlight id_;_1182454_;_script infofile_;_ZIP::ssf12.xml_;_
