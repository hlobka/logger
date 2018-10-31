var itemsDict = {};
var isDebugMode = false;
var isFailed = false;
var isInfo = false;
function reCollectItems() {
    var $table = $('#table');
    $table.removeClass('datagrid_red');
    $table.addClass('datagrid_green');
    if (items) {
        var isPrevItemIsHeader = false;
        var prevItemCaption = '';
        var prevItemDate = '';
        var indexXOfsset = 1;
        var headerKey = 0;
        var itemsKey = 0;
        for (var key = 0; key < items.length; key++) {
            if (items[key].type == "error") {
                $table.removeClass('datagrid_green');
                $table.addClass('datagrid_red')
            }
            var caption = items[key].caption;
            var date = items[key].date;
            var isHeader = items[key].type == 'header';
            if (prevItemCaption == items[key].caption && prevItemDate == items[key].date && !isPrevItemIsHeader) {
                items[key - indexXOfsset].description = items[key - indexXOfsset].description.concat(items[key].description);
                indexXOfsset++;
                delete items[key];
            } else {
                indexXOfsset = 1;
            }
            prevItemCaption = caption;
            prevItemDate = date;
            isPrevItemIsHeader = isHeader;
        }

        for (var i = 0; i < items.length; i++) {
            if (items[i] == undefined) {
                items.splice(i, 1);
                i--;
            }
        }

        for (var key = 0; key < items.length; key++) {
            var header = 'header' + headerKey;
            if (items[key].type == "header") {
                if (itemsDict[header] != undefined) {
                    itemsDict[header][0].disable = itemsDict[header].length == 1;
                    console.log(itemsDict[header].length);
                }
                headerKey++;
                itemsKey = 0;
            }
            header = 'header' + headerKey;
            if (!itemsDict[header]) {
                itemsDict[header] = [];
            }
            itemsDict[header][itemsKey] = items[key];
            itemsDict[header][itemsKey].id = headerKey;
            itemsDict[header][itemsKey].itemId = itemsKey;
            itemsDict[header][itemsKey].uid = key;
            itemsDict[header][0].isError = itemsDict[header][0].isError || items[key].type == "error"||  items[key].type == "throwable_error";
            isDebugMode = isDebugMode || items[key].type == "debug";
            isFailed = isFailed || items[key].type == "error" || items[key].type == "throwable_error";
            isInfo = isInfo || items[key].type == "info";
            itemsKey++
        }
    }
    $('#btnDebugInfo').css('display', isDebugMode ? 'inline' : 'none');
    $('#btnShowInfo').css('display', isInfo ? 'inline' : 'none');
    if (isFailed) {
        $table.removeClass('datagrid_green');
        $table.addClass('datagrid_red');
    } else {
        $table.removeClass('datagrid_red');
        $table.addClass('datagrid_green');
        $('#btnShowAllErrors, #btnOpenAllErrors, #btnShowErrorList').css('display', 'none');
    }
}
function getDefaultLine(entry) {
    var _description = "";

    for (var c in entry.description) {
        var className = "desc_item";
        var desc = entry.description[c].replace(".swf", "_swf");
        var descTitle = desc.replace("<br />", " ").replace("'", " ").replace('"', " ");

        if (entry.type == "header" && _description.length != 0) {
            className += " hidden_data";
            _description += "<span title='" + descTitle + "' class='" + className + "'>" + desc + "</span>";
        } else if (entry.type == "throwable_error") {
            _description += "<div><pre class='" + className + "'>" + desc + "</pre></div>";
        } else {
            _description += "<pre class='" + className + "'>" + desc + "</pre>";
        }
    }
    return _description;
}

function showHiddenData(entry_id) {
    console.log(entry_id);
    if ($("#" + entry_id).css("display") == "block") {
        $("#" + entry_id).hide(200);
    } else {
        $("#" + entry_id).show(200);
    }
}
function getHiddenLine(entry) {
    var entry_id = "desc_item" + entry.uid;
    var className = "desc_item";
    var _description = "";
    var description = entry.description[0];
    _description += "<div class='descTitle' onclick='showHiddenData(\"" + entry_id + "\")'><pre class='" + className + "'>" + description + "</pre></div>";
    _description += "<div id='" + entry_id + "' style='display: none'>";
    for (var c in entry.description) {
        if (c == 0) continue;

        var desc = entry.description[c];
        var descTitle = desc;
        _description += "<pre title='" + descTitle + "' class='" + className + "'>" + desc + "</pre>";
    }
    _description += "</div>";
    return _description;
}

function getItemStr(entry, type) {
    var command;
    if (entry.type == "header") {
        command = "<td><a href='#COMMAND_" + entry.id + "' name='COMMAND_" + entry.id + "' id='COMMAND_" + entry.id + "' >" + entry.id + "</a></td>";
    } else {
        command = "<td><a href='#COMMAND_" + entry.id + "' name='COMMAND_" + entry.id + "' id='COMMAND_" + entry.id + "' >" + entry.itemId + "</a></td>";
    }
    var caption = "<td><div class='command'>" + entry.caption + "</div><span class='hidden_data'>" + new Date(entry.date).toLocaleString() + "</span></td>";
    var description = "<td>";
    switch (entry.type) {
        case "throwable_error":
            description = "<td style='vertical-align: sub;'>";
            description += getHiddenLine(entry);
            break;
        default :
            description += getDefaultLine(entry);
            break;
    }

    if (entry.type == "header" && entry.description.length == 0) {
        description += "<pre class='desc_item'> </pre>";
    }
    if (entry.type == "header" && entry.description.length <= 1) {
        description += "<span class='hidden_data'> </span>";
    }
    description += "</td>";
    var thumbImageLink = "<td></td>";
    if (entry.thumbImageLink) {
        thumbImageLink = "<td><a href='" + entry.imageLink + "' rel='superbox[gallery][my_gallery]'>";
        thumbImageLink += "<img src='" + entry.thumbImageLink + "' width='175' height='175' alt='" + entry.caption + "' />";
        thumbImageLink += "</a></td>";
    }
    return "<tr id=" + entry.type + entry.id + " class='" + entry.type + " " + type + " " + (entry.disable ? "disable" : "") + "'>" + command + caption + description + thumbImageLink + "</tr>";
}

function draw() {
    if (itemsDict) {
        var tableGrids = "";
        for (var index in itemsDict) {
            var entry = itemsDict[index][0];
            if (entry.type == "header") {
                tableGrids += getItemStr(entry, entry.isError ? "errorTD" : "default");
            }
        }
        $('#table').find('table').append(tableGrids);
        return true;
    } else {
        return false;
    }
}

var openHash = function (hash) {
    openHeader(hash.split("#COMMAND_")[1]);
    update();
};

var clickOnHeader = function () {
    var itemId = $(this).attr('id');
    openHeader(itemId.replace("header", ""));
    update();
};

var isHeaderOpened = function (itemId) {
    itemId = "header" + itemId;
    return $("." + itemId).length > 0;
};

var openHeader = function (itemId) {
    itemClassId = itemId;
    itemId = "header" + itemId;
    console.log("header: " + itemId);
    if (!isHeaderOpened(itemClassId)) {
        var logs = "";
        var needHideDebugInfo = $('#btnDebugInfo').attr('textContent') != 'hide debug information';
        var needHideInfoBlock = $('#btnShowInfo').attr('textContent') != 'hide info blocks';
        for (var index in itemsDict[itemId]) {
            if (index == 0) continue;
            var entry = itemsDict[itemId][index];
            var emptyClass = (needHideDebugInfo && entry.type == 'debug') ? " empty " : "";
            emptyClass += (needHideInfoBlock && entry.type == 'info') ? " empty " : "";
            logs += getItemStr(entry, itemId + emptyClass);
        }
        $("#" + itemId).after(logs);
    } else {
        $("." + itemId).remove();
    }
    //update();
};

var prevHeader;
var overOnHeader = function () {
    if (prevHeader) {
        prevHeader.find('.hidden_data').css('display', 'none');
        prevHeader = null;
    }
    $(this).find('.hidden_data').css('display', 'block');
};
var outOnHeader = function () {
    prevHeader = $(this);
};


var update = function () {
    var unSelectableElName = '.header, .tab, th';
    setUnselectable(unSelectableElName);
    var $header = $('.header');
    $header.click(clickOnHeader);
    $header.hover(overOnHeader, outOnHeader);
    $.superbox();
};
getElementWidth = function (selector) {
    var element = $(selector);
    return element.width() + parseInt(element.css('padding-left')) + parseInt(element.css('padding-right')) + parseInt(element.css('margin-left')) + parseInt(element.css('margin-right')) + 30
};
resizeDescItem = function (event) {
    var descriptionWidth = window.innerWidth - (getElementWidth('tbody tr td:eq(0)') + getElementWidth('tbody tr td:eq(1)') + getElementWidth('tbody tr td:eq(3)') + getElementWidth('#result'))
    $('.desc_item').css('max-width', descriptionWidth);
};
window.onresize = function (event) {
    resizeDescItem();
};
$(window).scroll(function () {
    $("#result").css({"margin-top": $(window).scrollTop() + 'px'});
    $("#menu").css({"margin-top": ($(window).scrollTop() - 22) + 'px'});
});

function unselectTabs() {
    setUnselectable("#menu");
}

function setUnselectable(unSelectableElName) {
    $(unSelectableElName).css("-webkit-user-select", "none");
    $(unSelectableElName).css("-moz-user-select", "none");
    $(unSelectableElName).css("-ms-user-select", "none");
    $(unSelectableElName).css("-o-user-select", "none");
    $(unSelectableElName).css("user-select", "none");
}
var showErrorList = function () {
    var $result = $('#result');
    var needCollectErrorList = $result.css('display') == 'none';
    $result.find('u').html('');
    for (var index in itemsDict) {
        var entry = itemsDict[index][0];
        if (entry.isError && needCollectErrorList) {
            var linkName;
            var arr = entry.description[0].split(":");
            if (arr.length > 1) {
                linkName = arr[1].split("(")[0]
            } else {
                linkName = arr[0];
            }
            if (linkName.length > 20) {
                linkName = linkName.substr(0, 20) + "...";
            }
            var link = "#COMMAND_" + entry.id;
            var li = "<li><a class=\"commandList\" href='" + link + "' >" + linkName + "</a></li>";
            $result.find('u').append(li);
        }
    }
    setUnselectable('#result u li a');
    $result.find('u li a').click(function () {
        openHash($(this).attr('href'));
    });
    $result.css('display', needCollectErrorList ? "block" : "none");
    $(this).attr('textContent', needCollectErrorList ? 'hide errors list' : 'show errors list');
    resizeDescItem();
};
var openAllErrors = function () {
    var $btnOpenAllErrors = $('#btnOpenAllErrors');
    $btnOpenAllErrors.unbind("click");
    var needOpenError = $(this).attr('textContent') == 'open errors';
    $btnOpenAllErrors.addClass("disable");
    showErrors(needOpenError);
};
var showAllErrors = function () {
    var $btnShowAllErrors = $('#btnShowAllErrors');
    $btnShowAllErrors.unbind("click");
    show(false);
    var needShowError = $(this).attr('textContent') == 'show errors';
    var $tbody = $("tbody tr:not(.errorTD)");
    if (needShowError) {
        $tbody.css('display', 'none');
        $(this).attr('textContent', 'close errors');
    } else {
        $tbody.css('display', 'table-row');
        $(this).attr('textContent', 'show errors')
    }
    $btnShowAllErrors.bind("click", showAllErrors);
};

function showErrors(isOpen) {
    var timeOut = 10;
    var itemsCount = 1;
    for (var index in itemsDict) {
        var entry = itemsDict[index][0];
        if (entry.isError) {
            headerAreOpened = isHeaderOpened(entry.id);
            if ((headerAreOpened && !isOpen) || (!headerAreOpened && isOpen)) {
                itemsCount++;
                if (itemsCount > 100) {
                    setTimeout(openHeader, timeOut, entry.id);
                    timeOut += 5;
                } else {
                    openHeader(entry.id);
                }
            }
        }
    }
    setTimeout(function () {
        var $btnOpenAllErrors = $('#btnOpenAllErrors');
        $btnOpenAllErrors.bind("click", openAllErrors);
        $btnOpenAllErrors.removeClass("disable");
        update();
    }, timeOut);
    $('#btnOpenAllErrors').attr('textContent', !isOpen ? "open errors" : "close errors");
}

function show(isAll) {
    var timeOut = 10;
    var itemsCount = 0;
    for (var index in itemsDict) {
        var entry = itemsDict[index][0];
        headerAreOpened = isHeaderOpened(entry.id);
        if ((!headerAreOpened && isAll) || (headerAreOpened && !isAll)) {
            itemsCount++;
            if (itemsCount > 50) {
                setTimeout(openHeader, timeOut, entry.id);
                timeOut += 5;
            } else {
                openHeader(entry.id);
            }
        }
    }
    setTimeout(function () {
        var $btnShowAll = $('#btnShowAll');
        $btnShowAll.bind("click", showAll);
        $btnShowAll.removeClass("disable");
        update();
    }, timeOut);
}
var showAll = function (index) {
    var $btnShowAll = $('#btnShowAll');
    $btnShowAll.unbind("click");
    $btnShowAll.addClass("disable");
    var needOpenAll = $(this).attr('textContent') != 'hide all';
    show(needOpenAll);
    $btnShowAll.attr('textContent', needOpenAll ? "hide all" : "show all");
};
var showDebugInfo = function (index) {
    var needHideDebugInfo = $(this).attr('textContent') == 'hide debug information';
    $('.debug').css('display', (needHideDebugInfo ? "none" : "table-row"));
    $('#btnDebugInfo').attr('textContent', needHideDebugInfo ? "show debug information" : "hide debug information");
};
var showInfo = function (index) {
    var needShowInfoBlocks = $(this).attr('textContent') == 'show info blocks';
    $('.info').css('display', (needShowInfoBlocks ? "table-row" : "none"));
    $('#btnShowInfo').attr('textContent', needShowInfoBlocks ? "hide info blocks" : "show info blocks");
};
var prevScrollTop = 0;
var moveOnTop = function (index) {
    $("#btnMoveOnTop").addClass("disable");
    $("html, body").animate({ scrollTop: prevScrollTop }, "slow", function (e) {
        $("#btnMoveOnTop").removeClass("disable");
        $('#btnMoveOnTop').attr('textContent', prevScrollTop == 0 ? "move on top" : "return to test");
    });
    prevScrollTop = $(window).scrollTop();
};