Dim x
Dim y

num= calc(parameter("parameter1"),parameter("parameter2"))

SystemUtil.Run "C:\Program Files (x86)\Micro Focus\UFT One\samples\Flights Application\FlightsGUI.exe"

WpfWindow("Micro Focus MyFlight Sample").Move 590,295 @@ hightlight id_;_1117588_;_script infofile_;_ZIP::ssf1.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("agentName").Set "john" @@ hightlight id_;_2120089400_;_script infofile_;_ZIP::ssf2.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfEdit("password").SetSecure "60ebd717c633153473c2" @@ hightlight id_;_2120151080_;_script infofile_;_ZIP::ssf3.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("OK").Click @@ hightlight id_;_2120149112_;_script infofile_;_ZIP::ssf4.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("fromCity").Select "Frankfurt" @@ hightlight id_;_2120961312_;_script infofile_;_ZIP::ssf8.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("toCity").Select "London" @@ hightlight id_;_2120964048_;_script infofile_;_ZIP::ssf12.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfImage("WpfImage_3").Click 7,7 @@ hightlight id_;_2120097128_;_script infofile_;_ZIP::ssf13.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfCalendar("Su").SetDate "27-Jul-2021" @@ hightlight id_;_2120103656_;_script infofile_;_ZIP::ssf14.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("Class").Select "Business" @@ hightlight id_;_2120105528_;_script infofile_;_ZIP::ssf18.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfComboBox("numOfTickets").Select num @@ hightlight id_;_2120114360_;_script infofile_;_ZIP::ssf22.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("FIND FLIGHTS").Click @@ hightlight id_;_2120107880_;_script infofile_;_ZIP::ssf23.xml_;_
WpfWindow("Micro Focus MyFlight Sample").WpfButton("BACK").Click @@ hightlight id_;_2120119112_;_script infofile_;_ZIP::ssf24.xml_;_
wait 2
WpfWindow("Micro Focus MyFlight Sample").Close @@ hightlight id_;_2426866_;_script infofile_;_ZIP::ssf25.xml_;_
