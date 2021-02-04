Dim MySec
MySec = Second (Now)

 

If (Mysec mod 2=0) Then
Reporter.ReportEvent micPass, "Number validation", "Even number, test PASSED"
Else    
Reporter.ReportEvent micFail, "Number validation", "Odd number, test FAILED"
End If
 
