
//File Input
$('.container-upload:eq(0)').offset({ top: $('.input:eq(0)').offset().top + 100 });
const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('user-pic');
const output = document.getElementById('output');
var userName = document.getElementById('user-name');
var userSurname = document.getElementById('user-surname');
var selectedMaterial = "";



fileInput.addEventListener('change', (e) => doSomethingWithFiles(e.target.files));

uploadButton.addEventListener('touchstart', function () {
    if (fileInput.files.length > 0) {
        if (userName.value != "" && userSurname.value != "") {
            var material = $('.material:eq(0) img');
            $('.condition-container:eq(0)').fadeOut();
            ga('send', 'event', 'Swarovski', 'Kolye-Outdoor', 'Foto-Yükle');

            $('.user-container').fadeOut("slow", function () {
                $('.materials-container').css('display', 'flex');
                $('.header-text p').text('Swarovski Kolyeni seç, üzerinde nasıl durduğunu incele');

                $('.material:eq(0) img').before('<img id="kolye1" src="assets/img/kolye1.png" style="width:' + material.width() + 'px;height:auto; position:absolute;z-index:99;" />');
                $('.material:eq(1) img').before('<img id="kolye2"  src="assets/img/kolye2.png" style="width:' + material.width() + 'px;height:auto; position:absolute;z-index:99;" />');
                $('.material:eq(2) img').before('<img id="kolye3"  src="assets/img/kolye3.png" style="width:' + material.width() + 'px;height:auto; position:absolute;z-index:99;" />');

                $('#kolye1').on('touchmove', function (event) {
                    $(this).css('left', event.originalEvent.touches[0].pageX - 60);
                    $(this).css('top', event.originalEvent.touches[0].pageY - 20);
                    $('body').css('overflow', 'hidden');
                    $('.material:eq(0) img:eq(1)').css('opacity', '0');
                }).on('touchend', function () {
                    $('body').css('overflow', 'scroll');
                    $('.left-icons:eq(0)').css('display', 'grid');
                    $('.tooltiptext:eq(0)').css('display', 'block');
                    selectedMaterial = "kolye1";
                });

                $('#kolye2').on('touchmove', function (event) {
                    $(this).css('left', event.originalEvent.touches[0].pageX - 60);
                    $(this).css('top', event.originalEvent.touches[0].pageY - 20);
                    $('body').css('overflow', 'hidden');
                    $('.material:eq(1) img:eq(1)').css('opacity', '0');
                }).on('touchend', function () {
                    $('body').css('overflow', 'scroll');
                    $('.left-icons:eq(0)').css('display', 'grid');
                    $('.tooltiptext:eq(0)').css('display', 'block');
                    selectedMaterial = "kolye2";
                });

                $('#kolye3').on('touchmove', function (event) {
                    $(this).css('left', event.originalEvent.touches[0].pageX - 60);
                    $(this).css('top', event.originalEvent.touches[0].pageY - 20);
                    $('body').css('overflow', 'hidden');
                    $('.material:eq(2) img:eq(1)').css('opacity', '0');
                }).on('touchend', function () {
                    $('body').css('overflow', 'scroll');
                    $('.left-icons:eq(0)').css('display', 'grid');
                    $('.tooltiptext:eq(0)').css('display', 'block');
                    selectedMaterial = "kolye3";
                });
            });


        }
        else
            alert("Lütfen İstenilen Alanları Doldurun.");
    }
    else
        alert("Lütfen Resim Ekleyin");
});

//Swipe Materials
$('.left-icons:eq(0) img:eq(0)').on('touchstart', function () {
    $('#' + selectedMaterial).animate({ width: $('#' + selectedMaterial).width() + 20 });
});
$('.left-icons:eq(0) img:eq(1)').on('touchstart', function () {
    $('#' + selectedMaterial).animate({ width: $('#' + selectedMaterial).width() - 20 });
});

$('.tooltiptext:eq(0)').on('touchstart', function () {
    ga('send', 'event', 'Swarovski', 'Kolye-Outdoor', selectedMaterial + "-seçildi");
    done();
});

//Convert Image
function doSomethingWithFiles(fileList) {
    let file = null;

    for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].type.match(/^image\//)) {
            file = fileList[i];
            break;
        }
    }
    if (file !== null) {
        var fileoutput = document.querySelector('#file-input').files[0];

        loadImage.parseMetaData(fileoutput, function (data) {
            //default image orientation
            var orientation = 0;
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }
            var loadingImage = loadImage(
                fileoutput,
                function (canvas) {
                    //base64 data result
                    var base64data = canvas.toDataURL('image/jpeg');
                    var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                    $('#output').attr('src', base64data);


                    $(".input").fadeOut("slow", function () {
                        $('.div-output').fadeIn();
                        ga('send', 'event', 'Swarovski', 'Kolye-Outdoor', 'Foto-Ekle');

                    });

                }, {
                    //should be set to canvas : true to activate auto fix orientation
                    canvas: true,
                    orientation: orientation
                }
            );
        });



    }
}

//Process Done and Send Image to Approve
function done() {
    let region = document.querySelector(".div-output");
    $("#" + selectedMaterial).appendTo(".div-output:eq(0)");
    $('.materials-container:eq(0)').fadeOut("slow", function () {
        html2canvas(region, {
            dpi: 144,
            onrendered: function (canvas) {
                let pngUrl = canvas.toDataURL();
                let img = document.querySelector("#output");
                img.src = pngUrl;
                var user = userName.value + " " + userSurname.value;

                sendData(user, pngUrl);

            },
        });
    });
}

