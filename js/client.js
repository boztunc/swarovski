
//Send User Image to Approve 
function sendData(username, imageurl) {
    var token = "";
    $.ajax({
        url: "https://appmates.net/api/getmodulation", //This api converting base64 url to jpg/png
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        headers: { "unq": "move" },
        data: JSON.stringify({ "scc": "x567eRTGt7843ab" }),
        success: function (result) {
            token = result.modulation;
            clientData(token, username, imageurl);
        },
        error: function (err) {
            token = "error";
        },

    });
}

//Send User Info's and Check Digital Outdoor Screen's
function clientData(scc, username, imageurl) {
    var screenId = new URL(location.href).searchParams.get("screenid");
    if (screenId == null) screenId = "1111";

    var screenName = "";
    var screenId_Int = parseInt(screenId);
    switch (screenId_Int) {
        case 1: screenName = "GALLERIA"; break;
        case 2: screenName = "AKMERKEZ"; break;
        case 3: screenName = "İTÜ"; break;
        case 8: screenName = "MARMARA OTEL ÖNÜ"; break;
        case 18: screenName = "EMİRNEVRUZ SOKAK"; break;
        case 19: screenName = "SAKASALİM ÇIKMAZI"; break;
        case 20: screenName = "NURİ ZİYA SOKAK"; break;
        case 21: screenName = "DEVA SOKAK"; break;
        case 22: screenName = "TERKOZ ÇIKMAZI"; break;
        case 23: screenName = "ASMALI MESCİT"; break;
        case 30: screenName = "CİHANGİR AKARSU YOKUŞU"; break;
        case 31: screenName = "GALATA KULESİ MEYDANI"; break;
        case 44: screenName = "ODAKULE ÖNÜ"; break;
        case 202: screenName = "BEKAR SOKAK"; break;
        case 204: screenName = "HÜSEYİN AĞA CAMİİ SOKAK"; break;
        case 205: screenName = "SOLAKZADE SOKAK"; break;
        default: screenName = "";
    }

    $.ajax({
        url: "https://appmates.net/api/clientdata",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        headers: { "unq": "move", "scc": scc },
        data: JSON.stringify({
            "userid": "1",
            "username": username,
            "imageurl": imageurl,
            "screenid": screenId
        }),
        beforeSend: function () {
            $("#" + selectedMaterial).fadeOut();
            $('.tooltiptext').fadeOut();
            $('.left-icons:eq(0)').fadeOut();
            $('#loader-container').fadeIn();
            $('.header-text:eq(0) p').text("Onay İçin Gönderiliyor...");
        },
        success: function (result) {
            if (result.status == "success") {
                $('#loader-container').fadeOut();
                $('#' + selectedMaterial).css('display', 'none');
                $('#output').css("border", "0").css("width", "auto");
                $('.header-text:eq(0) p').text("Swarovski'nin ışıltı saçan kolyesiyle oluşturduğunuz fotoğrafınız onaylandıktan sonra " + screenName + " LED ekranında yer alacaktır.");
                alert("Resim Onay İçin Gönderildi!");
                ga('send', 'event', 'Swarovski', 'Kolye-Outdoor', "Onay-Gönderildi");
            }
            else
                alert("Resim Gönderilemedi. Tekrar Deneyiniz. ");
        },
        error: function (err) {
            alert("Resim Gönderilemedi. Tekrar Deneyiniz. ");
        }

    })
}