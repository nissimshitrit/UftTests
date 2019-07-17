/* 
Copyright: Paul Hanlon

Released under the MIT/BSD licence which means you can do anything you want 
with it, as long as you keep this copyright notice on the page 
*/
(function(jq){
  jq.fn.jqTreeTable=function(map, options){
    var opts = jq.extend({openImg:"",shutImg:"",leafImg:"",lastOpenImg:"",lastShutImg:"",lastLeafImg:"",vertLineImg:"",blankImg:"",collapse:false,column:0,striped:false,highlight:false,state:true},options),
    mapa=[],mapb=[],tid=this.attr("id"),collarr=[],
	  stripe=function(){
      if(opts.striped){
  		  $("#"+tid+" tr:visible").filter(":even").addClass("even").end().filter(":odd").removeClass("even");
      }
	  },
    buildText = function(parno, preStr){//Recursively build up the text for the images that make it work
      var mp=mapa[parno], ro=0, pre="", pref, img;
      for (var y=0,yl=mp.length;y<yl;y++){
        ro = mp[y];
        if (mapa[ro]){//It's a parent as well. Build it's string and move on to it's children
          pre=(y==yl-1)? opts.blankImg: opts.vertLineImg;
          img=(y==yl-1)? opts.lastOpenImg: opts.openImg;
          mapb[ro-1] = preStr + '<img src="'+img+'" class="parimg" id="'+tid+ro+'">';
          pref = preStr + '<img src="'+pre+'" class="preimg">';
          arguments.callee(ro, pref);
        }else{//it's a child
          img = (y==yl-1)? opts.lastLeafImg: opts.leafImg;//It's the last child, It's child will have a blank field behind it
          mapb[ro-1] = preStr + '<img src="'+img+'" class="ttimage" id="'+tid+ro+'">';
        }
      }
    },
    expandKids = function(num, last){//Expands immediate children, and their uncollapsed children
      jq("#"+tid+num).attr("src", (last)? opts.lastOpenImg: opts.openImg);//
      for (var x=0, xl=mapa[num].length;x<xl;x++){
        var mnx = mapa[num][x];
        jq("#"+tid+mnx).parents("tr").removeClass("collapsed");
  			if (mapa[mnx] && opts.state && jq.inArray(mnx, collarr)<0){////If it is a parent and its number is not in the collapsed array
          arguments.callee(mnx,(x==xl-1));//Expand it. More intuitive way of displaying the tree
        }
      }
    },
    collapseKids = function(num, last){//Recursively collapses all children and their children and change icon
      jq("#"+tid+num).attr("src", (last)? opts.lastShutImg: opts.shutImg);
      for (var x=0, xl=mapa[num].length;x<xl;x++){
        var mnx = mapa[num][x];
        jq("#"+tid+mnx).parents("tr").addClass("collapsed");
        if (mapa[mnx]){//If it is a parent
          arguments.callee(mnx,(x==xl-1));
        }
      }
    },
  	creset = function(num, exp){//Resets the collapse array
  		var o = (exp)? collarr.splice(jq.inArray(num, collarr), 1): collarr.push(num);
      cset(tid,collarr);
  	},
  	cget = function(n){
	  	var v='',c=' '+document.cookie+';',s=c.indexOf(' '+n+'=');
	    if (s>=0) {
	    	s+=n.length+2;
	      v=(c.substring(s,c.indexOf(';',s))).split("|");
	    }
	    return v||0;
  	},
    cset = function (n,v) {
  		jq.unique(v);
	  	document.cookie = n+"="+v.join("|")+";";
	  };
    for (var x=0,xl=map.length; x<xl;x++){//From map of parents, get map of kids
      num = map[x];
      if (!mapa[num]){
        mapa[num]=[];
      }
      mapa[num].push(x+1);
    }
    buildText(0,"");
    jq("tr", this).each(function(i){//Inject the images into the column to make it work
      jq(this).children("td").eq(opts.column).prepend(mapb[i]);
      
    });
		collarr = cget(tid)||opts.collapse||collarr;
		if (collarr.length){
			cset(tid,collarr);
	    for (var y=0,yl=collarr.length;y<yl;y++){
	      collapseKids(collarr[y],($("#"+collarr[y]+ " .parimg").attr("src")==opts.lastOpenImg));
	    }
		}
    stripe();
    jq(".parimg", this).each(function(i){
      var jqt = jq(this),last;
      jqt.click(function(){
        var num = parseInt(jqt.attr("id").substr(tid.length));//Number of the row
        if (jqt.parents("tr").next().is(".collapsed")){//If the table row directly below is collapsed
          expandKids(num, (jqt.attr("src")==opts.lastShutImg));//Then expand all children not in collarr
					if(opts.state){creset(num,true);}//If state is set, store in cookie
        }else{//Collapse all and set image to opts.shutImg or opts.lastShutImg on parents
          collapseKids(num, (jqt.attr("src")==opts.lastOpenImg));
					if(opts.state){creset(num,false);}//If state is set, store in cookie
        }
        stripe();//Restripe the rows
      });
    });
    if (opts.highlight){//This is where it highlights the rows
      jq("tr", this).hover(
        function(){jq(this).addClass("over");},
        function(){jq(this).removeClass("over");}
      );
    };
  };
  return this;
})(jQuery);

// SIG // Begin signature block
// SIG // MIIcqwYJKoZIhvcNAQcCoIIcnDCCHJgCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // MqtnW6RLrOSGDtOQJDHk21B4zyGIse0tnkmjewFfRKWg
// SIG // ggs1MIIFTTCCBDWgAwIBAgIQTw4JubL5zLXrXkZtsOn/
// SIG // NzANBgkqhkiG9w0BAQsFADB9MQswCQYDVQQGEwJHQjEb
// SIG // MBkGA1UECBMSR3JlYXRlciBNYW5jaGVzdGVyMRAwDgYD
// SIG // VQQHEwdTYWxmb3JkMRowGAYDVQQKExFDT01PRE8gQ0Eg
// SIG // TGltaXRlZDEjMCEGA1UEAxMaQ09NT0RPIFJTQSBDb2Rl
// SIG // IFNpZ25pbmcgQ0EwHhcNMTgwNTAyMDAwMDAwWhcNMTkw
// SIG // NTAyMjM1OTU5WjCBtjELMAkGA1UEBhMCR0IxETAPBgNV
// SIG // BBEMCFJHMTQgMVFOMRIwEAYDVQQIDAlCZXJrc2hpcmUx
// SIG // EDAOBgNVBAcMB05ld2J1cnkxJjAkBgNVBAkMHVRoZSBM
// SIG // YXduLCAyMi0zMCBPbGQgQmF0aCBSb2FkMSIwIAYDVQQK
// SIG // DBlNaWNybyBGb2N1cyBHcm91cCBMaW1pdGVkMSIwIAYD
// SIG // VQQDDBlNaWNybyBGb2N1cyBHcm91cCBMaW1pdGVkMIIB
// SIG // IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsLV9
// SIG // cmRmLPSR/tntkEW5tiYsLQsCYJEnY+aoSAak8R6k+q39
// SIG // shXy4COKx2yAFENHKnjunT6ebDdc+uVexBVkj66c5A5g
// SIG // LjUvEu608ZjKzQwnDQJGFkomFFdYlf8/8LsFpkDZNMg5
// SIG // xbcmrwXEHLrVmSLgXFmearg2xzusHxp6Q9uU4L//kPmj
// SIG // K30jxEcYHmhde5HXTrkjxeUvJX3FzgtYebEfVCcJa+Fi
// SIG // mzRYPVfapFILgyv6FA6ZNJamEYf9KzG3cSdNT0kQgqu6
// SIG // 9j2h9zg0jeUaY/aiYHK+YHY+/5HtIGBNB8IKduOW9dJg
// SIG // BNDkR59+HBgLBsKiroht2K/5FHGQLQIDAQABo4IBjTCC
// SIG // AYkwHwYDVR0jBBgwFoAUKZFg/4pN+uv5pmq4z/nmS71J
// SIG // zhIwHQYDVR0OBBYEFH5MDtmDr6g/F8LVbGMF+51yVK7+
// SIG // MA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8EAjAAMBMG
// SIG // A1UdJQQMMAoGCCsGAQUFBwMDMBEGCWCGSAGG+EIBAQQE
// SIG // AwIEEDBGBgNVHSAEPzA9MDsGDCsGAQQBsjEBAgEDAjAr
// SIG // MCkGCCsGAQUFBwIBFh1odHRwczovL3NlY3VyZS5jb21v
// SIG // ZG8ubmV0L0NQUzBDBgNVHR8EPDA6MDigNqA0hjJodHRw
// SIG // Oi8vY3JsLmNvbW9kb2NhLmNvbS9DT01PRE9SU0FDb2Rl
// SIG // U2lnbmluZ0NBLmNybDB0BggrBgEFBQcBAQRoMGYwPgYI
// SIG // KwYBBQUHMAKGMmh0dHA6Ly9jcnQuY29tb2RvY2EuY29t
// SIG // L0NPTU9ET1JTQUNvZGVTaWduaW5nQ0EuY3J0MCQGCCsG
// SIG // AQUFBzABhhhodHRwOi8vb2NzcC5jb21vZG9jYS5jb20w
// SIG // DQYJKoZIhvcNAQELBQADggEBADo1MICa+hwds2YoN5zh
// SIG // 9OqcCuwQSjMn3N5EVXvUVUdBRRCYIX/f6mz/wCe/kKHd
// SIG // TocZcf0pBdTvIhA5y0vxqwpyS0g/PpHVZEC6M0Xzq+ZW
// SIG // gyDjaeBP8OAa5Bhd3d8dJPhP/RdWc02Ej7062pr5D1Bq
// SIG // ExLat3gZjXz29GanF1qKl3QcEd4PJDZVNJvuiaDYrFca
// SIG // jW3xSliUSegVHFnckLzRZr8ugcaU3dyumC1l9KufGHTs
// SIG // bwSTygjuRkLMSweLYlVl/wDeM5f30xLNMOPreWv7AKtI
// SIG // 9U0KtpQRa5qwQcQNHMGYPBxLiPcYLDM726Wpm+xdtrpR
// SIG // 14o8cobXUwk4CrcwggXgMIIDyKADAgECAhAufIfMDpNK
// SIG // Uv6U/Ry3zTSvMA0GCSqGSIb3DQEBDAUAMIGFMQswCQYD
// SIG // VQQGEwJHQjEbMBkGA1UECBMSR3JlYXRlciBNYW5jaGVz
// SIG // dGVyMRAwDgYDVQQHEwdTYWxmb3JkMRowGAYDVQQKExFD
// SIG // T01PRE8gQ0EgTGltaXRlZDErMCkGA1UEAxMiQ09NT0RP
// SIG // IFJTQSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTAeFw0x
// SIG // MzA1MDkwMDAwMDBaFw0yODA1MDgyMzU5NTlaMH0xCzAJ
// SIG // BgNVBAYTAkdCMRswGQYDVQQIExJHcmVhdGVyIE1hbmNo
// SIG // ZXN0ZXIxEDAOBgNVBAcTB1NhbGZvcmQxGjAYBgNVBAoT
// SIG // EUNPTU9ETyBDQSBMaW1pdGVkMSMwIQYDVQQDExpDT01P
// SIG // RE8gUlNBIENvZGUgU2lnbmluZyBDQTCCASIwDQYJKoZI
// SIG // hvcNAQEBBQADggEPADCCAQoCggEBAKaYkGN3kTR/itHd
// SIG // 6WcxEevMHv0xHbO5Ylc/k7xb458eJDIRJ2u8UZGnz56e
// SIG // JbNfgagYDx0eIDAO+2F7hgmz4/2iaJ0cLJ2/cuPkdaDl
// SIG // NSOOyYruGgxkx9hCoXu1UgNLOrCOI0tLY+AilDd71XmQ
// SIG // ChQYUSzm/sES8Bw/YWEKjKLc9sMwqs0oGHVIwXlaCM27
// SIG // jFWM99R2kDozRlBzmFz0hUprD4DdXta9/akvwCX1+XjX
// SIG // jV8QwkRVPJA8MUbLcK4HqQrjr8EBb5AaI+JfONvGCF1H
// SIG // s4NB8C4ANxS5Eqp5klLNhw972GIppH4wvRu1jHK0SPLj
// SIG // 6CH5XkxieYsCBp9/1QsCAwEAAaOCAVEwggFNMB8GA1Ud
// SIG // IwQYMBaAFLuvfgI9+qbxPISOre44mOzZMjLUMB0GA1Ud
// SIG // DgQWBBQpkWD/ik366/mmarjP+eZLvUnOEjAOBgNVHQ8B
// SIG // Af8EBAMCAYYwEgYDVR0TAQH/BAgwBgEB/wIBADATBgNV
// SIG // HSUEDDAKBggrBgEFBQcDAzARBgNVHSAECjAIMAYGBFUd
// SIG // IAAwTAYDVR0fBEUwQzBBoD+gPYY7aHR0cDovL2NybC5j
// SIG // b21vZG9jYS5jb20vQ09NT0RPUlNBQ2VydGlmaWNhdGlv
// SIG // bkF1dGhvcml0eS5jcmwwcQYIKwYBBQUHAQEEZTBjMDsG
// SIG // CCsGAQUFBzAChi9odHRwOi8vY3J0LmNvbW9kb2NhLmNv
// SIG // bS9DT01PRE9SU0FBZGRUcnVzdENBLmNydDAkBggrBgEF
// SIG // BQcwAYYYaHR0cDovL29jc3AuY29tb2RvY2EuY29tMA0G
// SIG // CSqGSIb3DQEBDAUAA4ICAQACPwI5w+74yjuJ3gxtTbHx
// SIG // TpJPr8I4LATMxWMRqwljr6ui1wI/zG8Zwz3WGgiU/yXY
// SIG // qYinKxAa4JuxByIaURw61OHpCb/mJHSvHnsWMW4j71RR
// SIG // LVIC4nUIBUzxt1HhUQDGh/Zs7hBEdldq8d9YayGqSdR8
// SIG // N069/7Z1VEAYNldnEc1PAuT+89r8dRfb7Lf3ZQkjSR9D
// SIG // V4PqfiB3YchN8rtlTaj3hUUHr3ppJ2WQKUCL33s6UTmM
// SIG // qB9wea1tQiCizwxsA4xMzXMHlOdajjoEuqKhfB/LYzoV
// SIG // p9QVG6dSRzKp9L9kR9GqH1NOMjBzwm+3eIKdXP9Gu2si
// SIG // HYgL+BuqNKb8jPXdf2WMjDFXMdA27Eehz8uLqO8cGFjF
// SIG // BnfKS5tRr0wISnqP4qNS4o6OzCbkstjlOMKo7caBnDVr
// SIG // qVhhSgqXtEtCtlWdvpnncG1Z+G0qDH8ZYF8MmohsMKxS
// SIG // CZAWG/8rndvQIMqJ6ih+Mo4Z33tIMx7XZfiuyfiDFJN2
// SIG // fWTQjs6+NX3/cjFNn569HmwvqI8MBlD7jCezdsn05tfD
// SIG // NOKMhyGGYf6/VXThIXcDCmhsu+TJqebPWSXrfOxFDnlm
// SIG // aOgizbjvmIVNlhE8CYrQf7woKBP7aspUjZJczcJlmAae
// SIG // zkhb1LU3k0ZBfAfdz/pD77pnYf99SeC7MH1cgOPmFjlL
// SIG // pzGCEM4wghDKAgEBMIGRMH0xCzAJBgNVBAYTAkdCMRsw
// SIG // GQYDVQQIExJHcmVhdGVyIE1hbmNoZXN0ZXIxEDAOBgNV
// SIG // BAcTB1NhbGZvcmQxGjAYBgNVBAoTEUNPTU9ETyBDQSBM
// SIG // aW1pdGVkMSMwIQYDVQQDExpDT01PRE8gUlNBIENvZGUg
// SIG // U2lnbmluZyBDQQIQTw4JubL5zLXrXkZtsOn/NzANBglg
// SIG // hkgBZQMEAgEFAKB8MBAGCisGAQQBgjcCAQwxAjAAMBkG
// SIG // CSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisGAQQB
// SIG // gjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3DQEJ
// SIG // BDEiBCCU2R4mwLBgo8ogukIyON3l+jq2vp8LKlGDRJoE
// SIG // YnG+9TANBgkqhkiG9w0BAQEFAASCAQB//DZnyCBhi6/O
// SIG // Dx61IgLdr79fys1BJQFdLJQ1r8NNNA/S5N6TjSbBGKPD
// SIG // B252tFMhM8kiLjoQ1049djf/CUcZXf1TukBfrQNDRopo
// SIG // 7e99EUJHYOnf2P0f2LZwI7JT/H4C6Q1vEDc4wCYEgmA8
// SIG // tMv3rgs6HD97kmBrH9GW+aAYJIC474m1KlmFYeddcmAu
// SIG // 6l0MHPUf09Cr1+uNXPSodRCy90FqXHrjChjbgunPcZPx
// SIG // Vq9XagwEMn5fqyZVtDGeFxnE6SZ36ybBqcfHZCSooTgh
// SIG // gM3wsy6RiWyheIs4sUXtUbudNW9cMjr0BGSfIHH5je8c
// SIG // QBHvfrm7gEENOrPLT8HCoYIOjzCCDosGCisGAQQBgjcD
// SIG // AwExgg57MIIOdwYJKoZIhvcNAQcCoIIOaDCCDmQCAQMx
// SIG // DzANBglghkgBZQMEAgEFADCB8gYLKoZIhvcNAQkQAQSg
// SIG // geIEgd8wgdwCAQEGCWCGSIb6bAoDBTAxMA0GCWCGSAFl
// SIG // AwQCAQUABCB8KL3eKw96Vopn/PLbis+u5IzNKE0OJJme
// SIG // P9gTeLIsvQIGW9zAcE+3GBMyMDE4MTExMjE5NTU0NC4z
// SIG // NDhaMASAAgH0oHakdDByMQswCQYDVQQGEwJDQTEQMA4G
// SIG // A1UECBMHT250YXJpbzEPMA0GA1UEBxMGT3R0YXdhMRYw
// SIG // FAYDVQQKEw1FbnRydXN0LCBJbmMuMSgwJgYDVQQDEx9F
// SIG // bnRydXN0IFRpbWUgU3RhbXBpbmcgQXV0aG9yaXR5oIIJ
// SIG // 7zCCBNQwggO8oAMCAQICEQCEM3uiibeMugAAAABVkdqH
// SIG // MA0GCSqGSIb3DQEBCwUAMIGyMQswCQYDVQQGEwJVUzEW
// SIG // MBQGA1UEChMNRW50cnVzdCwgSW5jLjEoMCYGA1UECxMf
// SIG // U2VlIHd3dy5lbnRydXN0Lm5ldC9sZWdhbC10ZXJtczE5
// SIG // MDcGA1UECxMwKGMpIDIwMTUgRW50cnVzdCwgSW5jLiAt
// SIG // IGZvciBhdXRob3JpemVkIHVzZSBvbmx5MSYwJAYDVQQD
// SIG // Ex1FbnRydXN0IFRpbWVzdGFtcGluZyBDQSAtIFRTMTAe
// SIG // Fw0xODA1MjkxODI2MjdaFw0yOTA4MjkxODU2MjdaMHIx
// SIG // CzAJBgNVBAYTAkNBMRAwDgYDVQQIEwdPbnRhcmlvMQ8w
// SIG // DQYDVQQHEwZPdHRhd2ExFjAUBgNVBAoTDUVudHJ1c3Qs
// SIG // IEluYy4xKDAmBgNVBAMTH0VudHJ1c3QgVGltZSBTdGFt
// SIG // cGluZyBBdXRob3JpdHkwggEiMA0GCSqGSIb3DQEBAQUA
// SIG // A4IBDwAwggEKAoIBAQCvIqq9ktlWegnjroHKGdbDiwBv
// SIG // 7sFPpUtiDtK8S4FNmsnRH0QVaQ7Rfd9HUj/vbBPYfKvD
// SIG // rEznmUhMmj1lqUZF0c+3zZJLxt67UkLFTEel+A7YmuIs
// SIG // JcW6Ds2iBUbLU3VtppJBhiTiaMYolczsn6W3/XGAv/pn
// SIG // VodxRRuutid4TtBe2xa6Ure1LrwoVH8QHRGWwTBRZsQv
// SIG // 6WDwjiYiaTciDf/eCNYafj2Yw+zO8mK/SIOvl6UdY2cl
// SIG // IdIbSaQdqrn2aG+0Im6w1+26DqHwDDCfnvPGlbk6sq83
// SIG // MnX+9DkHVFIJ1Xn1eXJkHe4A3X7G2+TkQOVNaI1BXR7v
// SIG // 9SbVsCYPAgMBAAGjggEiMIIBHjAOBgNVHQ8BAf8EBAMC
// SIG // B4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwgwQQYDVR0g
// SIG // BDowODA2BgpghkgBhvpsCgMFMCgwJgYIKwYBBQUHAgEW
// SIG // Gmh0dHA6Ly93d3cuZW50cnVzdC5uZXQvcnBhMAkGA1Ud
// SIG // EwQCMAAwMwYIKwYBBQUHAQEEJzAlMCMGCCsGAQUFBzAB
// SIG // hhdodHRwOi8vb2NzcC5lbnRydXN0Lm5ldDAxBgNVHR8E
// SIG // KjAoMCagJKAihiBodHRwOi8vY3JsLmVudHJ1c3QubmV0
// SIG // L3RzMWNhLmNybDAfBgNVHSMEGDAWgBTDwnHSe9doBa47
// SIG // OZs0JQxiA8dXaDAdBgNVHQ4EFgQUvGpj/WguLVXCs5aX
// SIG // uTxzWYDbN9AwDQYJKoZIhvcNAQELBQADggEBALHtlVL4
// SIG // vKiP7TNDNZtsB6R2RIA7y0Ua0J0VjD0MFdVoAOY4i6W9
// SIG // idoQbJbjYW8hkNcUqxjcTF/7ueKIOU0F5OHsbmUtVYEz
// SIG // ukrNzehbQ+coUdYU1+haAgajbH9khnd7PVISaWYQCmvF
// SIG // s4pDGQwC2qqKcQx6fd2U/nlPGnX4BCKQJlyGHdoRWM2P
// SIG // cwHJ5SGIiDsePW5FhjV588946f9ZGIQMCM6zFSVT9V0k
// SIG // 45pj2dNS7S8xwmlQd89pracaUGjtYtzviViKdM9cV83H
// SIG // 4tkmR0hOxor+VOibGgzBe9BhMK4XXiqlaAdJm2d/6/FQ
// SIG // UWlkplM1gxnCTzb4OnpID3zlNvUwggUTMIID+6ADAgEC
// SIG // AgxY2hP/AAAAAFHODfcwDQYJKoZIhvcNAQELBQAwgbQx
// SIG // FDASBgNVBAoTC0VudHJ1c3QubmV0MUAwPgYDVQQLFDd3
// SIG // d3cuZW50cnVzdC5uZXQvQ1BTXzIwNDggaW5jb3JwLiBi
// SIG // eSByZWYuIChsaW1pdHMgbGlhYi4pMSUwIwYDVQQLExwo
// SIG // YykgMTk5OSBFbnRydXN0Lm5ldCBMaW1pdGVkMTMwMQYD
// SIG // VQQDEypFbnRydXN0Lm5ldCBDZXJ0aWZpY2F0aW9uIEF1
// SIG // dGhvcml0eSAoMjA0OCkwHhcNMTUwNzIyMTkwMjU0WhcN
// SIG // MjkwNjIyMTkzMjU0WjCBsjELMAkGA1UEBhMCVVMxFjAU
// SIG // BgNVBAoTDUVudHJ1c3QsIEluYy4xKDAmBgNVBAsTH1Nl
// SIG // ZSB3d3cuZW50cnVzdC5uZXQvbGVnYWwtdGVybXMxOTA3
// SIG // BgNVBAsTMChjKSAyMDE1IEVudHJ1c3QsIEluYy4gLSBm
// SIG // b3IgYXV0aG9yaXplZCB1c2Ugb25seTEmMCQGA1UEAxMd
// SIG // RW50cnVzdCBUaW1lc3RhbXBpbmcgQ0EgLSBUUzEwggEi
// SIG // MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDZI+YU
// SIG // pOh8S4VxWPv4geZyi11Gw4gAHzjQiuHWblYw5a/aZFB9
// SIG // whM5+71mtNqE+4PQKB/LduhgUGmb885PE+LBPsHfEssy
// SIG // o/heRCIOzDrpjUm5YHTI3lQ9QV5DXyhGqaa3yhArIrxb
// SIG // TVuMF2UShv0sd9XFoIzKwoPgR1d853CuYkUnMRgK1MCk
// SIG // GFVS92DGBEuz3WgybhAfNBG4Enhk8e6p4PfjsSKPNFpl
// SIG // y4r04UVQdN+Tl6Y05tBMO583SVKnU06fLmdc7Zb8pb90
// SIG // UYjjqo692bEvX1AwFvRRYCJrmcv/4VQ7uftEOKUIOSOb
// SIG // aUf6PMTQ56rfRrLs8ooZrCmyOJV1AgMBAAGjggEjMIIB
// SIG // HzASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQE
// SIG // AwIBBjA7BgNVHSAENDAyMDAGBFUdIAAwKDAmBggrBgEF
// SIG // BQcCARYaaHR0cDovL3d3dy5lbnRydXN0Lm5ldC9ycGEw
// SIG // MwYIKwYBBQUHAQEEJzAlMCMGCCsGAQUFBzABhhdodHRw
// SIG // Oi8vb2NzcC5lbnRydXN0Lm5ldDAyBgNVHR8EKzApMCeg
// SIG // JaAjhiFodHRwOi8vY3JsLmVudHJ1c3QubmV0LzIwNDhj
// SIG // YS5jcmwwEwYDVR0lBAwwCgYIKwYBBQUHAwgwHQYDVR0O
// SIG // BBYEFMPCcdJ712gFrjs5mzQlDGIDx1doMB8GA1UdIwQY
// SIG // MBaAFFXkgdERgL7YibkIozH5oSQJFrlwMA0GCSqGSIb3
// SIG // DQEBCwUAA4IBAQAdJOeadFuqcPyxDjFF1ywAf2Y6K6Ca
// SIG // NKqsY22J+Z/fDXf9JCP8T5y3b4/z9B+2wf3WHMSMiGbB
// SIG // Y426V3fTuBoeyFGtzGA2GodqKOoRZd7MPCyMdLfoUEPT
// SIG // zCjoFWwRKp8UlSnJBVe1ZzboPKmD70HBIRbTfvctEUdm
// SIG // dmCCEmmMdlVzD98vS13pbCP4B/a1fdZpRZxYfWEu/HhL
// SIG // Q06JkUZELKBTqEWh9hZYu5ET8kvF3wvA564per1Fs+dw
// SIG // MOc0jut69tO10d5rE5lGs4vSTZN1tfFvv9wAKMIlv7zn
// SIG // o2U07D8NHZeM+qqIIqQYNdsFjnbjEMgpj2PQrqwY2drE
// SIG // n1ESMYIDZDCCA2ACAQEwgcgwgbIxCzAJBgNVBAYTAlVT
// SIG // MRYwFAYDVQQKEw1FbnRydXN0LCBJbmMuMSgwJgYDVQQL
// SIG // Ex9TZWUgd3d3LmVudHJ1c3QubmV0L2xlZ2FsLXRlcm1z
// SIG // MTkwNwYDVQQLEzAoYykgMjAxNSBFbnRydXN0LCBJbmMu
// SIG // IC0gZm9yIGF1dGhvcml6ZWQgdXNlIG9ubHkxJjAkBgNV
// SIG // BAMTHUVudHJ1c3QgVGltZXN0YW1waW5nIENBIC0gVFMx
// SIG // AhEAhDN7oom3jLoAAAAAVZHahzANBglghkgBZQMEAgEF
// SIG // AKCCAWwwGgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEE
// SIG // MC8GCSqGSIb3DQEJBDEiBCAjm9MjlWu7vfs+UxtzlhRr
// SIG // VvtpbnrVWBjug4RRrAANLTCCARsGCyqGSIb3DQEJEAIM
// SIG // MYIBCjCCAQYwggECMIHnBBRl6GQ6TafRPOlyWXzceLnO
// SIG // FUjvdjCBzjCBuKSBtTCBsjELMAkGA1UEBhMCVVMxFjAU
// SIG // BgNVBAoTDUVudHJ1c3QsIEluYy4xKDAmBgNVBAsTH1Nl
// SIG // ZSB3d3cuZW50cnVzdC5uZXQvbGVnYWwtdGVybXMxOTA3
// SIG // BgNVBAsTMChjKSAyMDE1IEVudHJ1c3QsIEluYy4gLSBm
// SIG // b3IgYXV0aG9yaXplZCB1c2Ugb25seTEmMCQGA1UEAxMd
// SIG // RW50cnVzdCBUaW1lc3RhbXBpbmcgQ0EgLSBUUzECEQCE
// SIG // M3uiibeMugAAAABVkdqHMBYEFFbWJiXy1jcs91Sd1Zt3
// SIG // sPMv/OGNMA0GCSqGSIb3DQEBCwUABIIBAIrkp6Mflupq
// SIG // erT7+CnIz4CKDQeQuBcftN8t9jJLqv2mf9scLU75PMF2
// SIG // qYpJlFZgBmQvh+l5bLT66SRvo9NYo4MEinahOxngLdcr
// SIG // UD+6ShBdeXq+17iYOnX2KMkArHURPkfuVaOdMAQZmD3y
// SIG // hRJTgJYQ130a8/ueS4Tdsyn2Le4kub/E3XiyXTuOCl8h
// SIG // SIvqrki5McA10HaRsJkryX+qbKzFIAT2eAu6Shu59Lp5
// SIG // 3NuHOEJ/Ddv+TvoSNdNS7odJcJMQA8fhRDLelqrtGvlv
// SIG // cDSkfFIH51NZaEcFo9EnR0QzTe2hRHaqFCMkEWHEuDTe
// SIG // +TgNN7yzXfuwD2iJa1cC+tE=
// SIG // End signature block
