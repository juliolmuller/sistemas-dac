$(function() {
    
    $('.mask-cpf').mask('000.000.000-00', { reverse: true });
    $('.mask-cep').mask('00000-000');
    $('.mask-cep').mask('99/99/9999');

    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        endDate: '-18y'
    });
    
    var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSIMqKwalYJtmvTwYi8ximHRZdOl2QBBlB5MIaWxwhXVBR5E_iiipj_z1xNVhiqjsljyK8XqL3Zj3ri/pub?gid=0&single=true&output=csv';
    var tipo = 'Advogado';
    var usuario = 'Josnei';

    function init() {
//        Papa.parse(publicSpreadsheetUrl, {
//            download: true,
//            header: true,
//            complete: showInfo
//        });
    }

    function showInfo(data, tabletop) {
        $(".spinner").remove();
        var parsed = "";
        let lista = document.getElementById('lista');
        var i = 0;
        $.each(data.data, function (y, item) {
            if (item.numero !== '' && item.situacao !== '' && item.promovido !== '' && item.promovente !== '') {
                if (((item.advpromovido === usuario || item.advpromovente === usuario) && tipo === 'Advogado') || (((item.promovido == usuario || item.promovente == usuario) && item.situacao != "Encerrado") && tipo == "Parte") || (item.juiz == usuario && tipo == "Juiz")) {
                    if (item.fase !== 'Deliberativa') {
                        parsed += '<div class="item">';
                    } else {
                        parsed += '<div class="item" style="color: red;">';
                    }
                    parsed += '<div class="item-info">';
                    parsed += '<span class="num">Processo ' + item.numero + '</span>';
                    if (tipo !== 'Juiz') {
                        if ((item.advpromovido === usuario && tipo === 'Advogado') || (item.promovido === usuario && tipo === 'Parte')) {
                            parsed += ' - <span class="parte">Promovido</span>';
                        } else if ((item.advpromovente === usuario && tipo === 'Advogado') || (item.promovente == usuario && tipo == "Parte")) {
                            parsed += ' - <span class="parte">Promovente</span>';
                        }
                    }
                    parsed += '<span class="situacao">' + item.situacao + '</span><br>';
                    if (item.situacao === 'Encerrado' && tipo !== 'Juiz') {
                        parsed += '<span class="fase">' + item.conclusao + '</span>';
                    } else {
                        parsed += '<span class="fase">' + item.fase + '</span>';
                    }
                    parsed += '<span class="juiz"><b>Juiz:</b> ' + item.juiz + '</span></div>' +
                        '<div class="partes">' +
                        '<span class=!promovido!><b>Promovido:</b> ' + item.promovido + '<span style="margin-left: 25px;">' +
                        '<b>Advogado:</b> ' + item.advpromovido + '</span></div>' +
                        '<div class="partes">' +
                        '<span class="promovente"><b>Promovente:</b> ' + item.promovente + '<span style="margin-left: 25px;">' +
                        '<b>Advogado:</b> ' + item.advpromovente + '</span></div>' +
                        '<div class="descricao">' + item.descricao + '</div></div>';
                }
            }
        });
        document.getElementById('lista').innerHTML = parsed;
        if (tipo === "Juiz") {
            $(document.getElementById('div-filtro-parte')).hide();
            $(document.getElementById('div-filtro-conclusao')).hide();
            $(document.getElementById('novo-processo')).hide();
        } else if (tipo === "Parte") {
            $(document.getElementById('div-filtro-situacao')).hide();
            $(document.getElementById('div-filtro-conclusao')).hide();
            $(document.getElementById('novo-processo')).hide();
        }
    }

    $(document).ready(function () {
        $('#filtro-situacao').on('change', function () {
            var $filtro = $(this);
            var value = $filtro.val();
            var val = document.getElementsByClassName('situacao');
            $.each(val, function (i, item) {
                if (value === 'Todos') {
                    $(item).parent().parent().show('fast');
                } else if (item.innerText == value) {
                    $(item).parent().parent().show('fast');
                } else {
                    $(item).parent().parent().hide("fast");
                }
            });
        });
        $('#filtro-parte').on('change', function () {
            var $filtro = $(this);
            var value = $filtro.val();
            var val = document.getElementsByClassName('parte');
            $.each(val, function (i, item) {
                if (value === "Todos") {
                    $(item).parent().parent().show("fast");
                } else if (item.innerText == value) {
                    $(item).parent().parent().show("fast");
                } else {
                    $(item).parent().parent().hide("fast");
                }
            });
        });
        $('#filtro-conclusao').on('change', function () {
            var $filtro = $(this);
            var value = $filtro.val();
            var val = document.getElementsByClassName('fase');
            $.each(val, function (i, item) {
                if (value === "Todos") {
                    $(item).parent().parent().show("fast");
                } else if (item.innerText == value) {
                    $(item).parent().parent().show("fast");
                } else {
                    $(item).parent().parent().hide("fast");
                }
            });
        });
    });

    function process(quant, i, max) {
        var val = parseInt(document.getElementsByClassName("quant")[i].value);
        val += quant;
        if (val < 0) {
            document.getElementsByClassName("quant")[i].value = 0;
        } else if (val > max) {
            document.getElementsByClassName("quant")[i].value = max;
        } else {
            document.getElementsByClassName("quant")[i].value = val;
        }
        var t =
                document.getElementById("total").value = 0;
        for (var y = 0; y < document.getElementsByClassName("quant").length; y++) {
            document.getElementById("total").value = (parseInt(document.getElementById("total").value) +
                    parseInt(document.getElementsByClassName("quant")[y].value.replace(".", '').replace(".", '')) *
                    parseInt(document.getElementsByClassName("price")[y].value.replace(".", '').replace(".", '').substring(0, (document.getElementsByClassName("price")[y].value.length - 3))));
        }
        document.getElementById("total").value = parseInt(document.getElementById("total").value).toLocaleString("pt") + " Bs.";
        msg();
    }

    window.addEventListener('DOMContentLoaded', init);
});
