//todo: need clean code;
var LOG_TYPES = {
    THROWABLE_ERROR: "throwable_error",
    DEBUG: "debug",
    PROGRESS: "progress",
    ERROR: "error",
    LOG: "log",
    WARNING: "warning",
    STRONG_WARNING: "strong_warning",
    BLINK: "blink",
    HEADER: "header",
    INFO: "info",
    EMPTY: ""

};
var uniqueKey=1;
var initialyHaveDebugs=false;
var dataHrefAttrKey = "dataHref";

function updateDescriptions() {
    var $setScreenScale = $('#setScreenScale');
    var $newSelectedItem = $setScreenScale.find("option:selected");
    var imgWidth = parseInt($newSelectedItem.text());
    $('.hiddenBody> .borderDiv').parent().filter(function () {
        return $(this).css('display') != 'none';
    }).each(function () {
        var $hiddenBody = $(this);
        var width = $hiddenBody.width();

        var commandsWidth = 250;
        var padding = 100;
        $hiddenBody.find("> .borderDiv> .descriptions").css("width", width - (imgWidth + commandsWidth) - padding);
    });
}

$(window).resize(function () {
    updateDescriptions();
});

var initialDuration = 100;
var duration = initialDuration;
function initializeClicks($selector, headerClass) {
    var $header = $selector.find(headerClass + "> .header");
    $header.unbind('click');
    $header.click(function () {
        clickOnHeader($(this));
    });
}
var animComplete = true;
var queueToOpenHeader = [];
function closeHeader($header, callbackF, addToQueue) {
    if(!animComplete){
        if(addToQueue){
            queueToOpenHeader.push(function(){closeHeader($header, callbackF, true)});
            return;
        }
        if(callbackF){
            if(callbackF.length>0) {
                callbackF(false);
            } else {
                callbackF();
            }
        }
        return;
    }
    animComplete = false;

    if($currentTag) {
        $currentTag.removeClass("selected");
    }
    $currentTag = $header;
    var parentAtHeader = $header.parent();
    var hiddenBody = parentAtHeader.find("> .hiddenBody");
    hiddenBody.slideUp(duration, "swing", function () {
        if(callbackF) {
            if (callbackF.length > 0) {
                callbackF(true);
            } else {
                callbackF();
            }
        }
        animComplete = true;
        if(queueToOpenHeader.length>0){
            queueToOpenHeader.shift()();
        }
    });

}
function addLogItemsToReport($hiddenBody) {
    if($hiddenBody[0].hasAttribute(dataHrefAttrKey)) {
        var headers = $hiddenBody.attr(dataHrefAttrKey);
        var splitHeaders = headers.split(".");
        var data = items;
        for (var headerKey in  splitHeaders) {
            var key = splitHeaders[headerKey];
            if (data.hasOwnProperty(key)) {
                data = data[key];
            }
        }
        reportDrawer.drawLogEntries(data.data, headers);
        $hiddenBody.removeAttr(dataHrefAttrKey);
    }
}
function openHeader($header, callbackF, addToQueue) {
    if(!animComplete){
        if(addToQueue){
            queueToOpenHeader.push(function(){openHeader($header, callbackF, true)});
            return;
        }
        if(callbackF){
            if(callbackF.length>0) {
                callbackF(false);
            } else {
                callbackF();
            }
        }
        return;
    }
    var numberOfAnim = 1;
    var savedPrevTag = $currentTag;
    var parentAtHeader = $header.parent();
    var hiddenBody = parentAtHeader.find("> .hiddenBody");

    animComplete = false;

    if($currentTag) {
        $currentTag.removeClass("selected");
    }
    $currentTag = $header;
    addLogItemsToReport(hiddenBody);

    if (hiddenBody.is(':visible')) {
        if(callbackF) {
            if (callbackF.length > 0) {
                callbackF(true);
            } else {
                callbackF();
            }
        }
        animComplete = true;
        if(queueToOpenHeader.length>0){
            queueToOpenHeader.shift()();
        }
        return;
    }
    var isAccordionUsed = false;
    if(isNeedUseAccordion) {
        var $hiddenBodyToClose = parentAtHeader.parent().find("> .items").find("> .hiddenBody").filter(function () {
            return $(this).is(':visible') && $(this) != hiddenBody;
        });
        if(savedPrevTag && savedPrevTag[0] != $header[0] && savedPrevTag.parent().find("> .hiddenBody").is(':visible') && savedPrevTag.parent().find($header).length==0){
            $hiddenBodyToClose.push(savedPrevTag.parent().find("> .hiddenBody")[0])
        }
        isAccordionUsed= $hiddenBodyToClose.length>0;
        if(isAccordionUsed){
            numberOfAnim++;
        }
        $hiddenBodyToClose.slideUp({
            duration: duration,
            always: function () {
                numberOfAnim--;
                if(numberOfAnim == 0) {
                    if(callbackF) {
                        if (callbackF.length > 0) {
                            callbackF(true);
                        } else {
                            callbackF();
                        }
                    }
                    animComplete = true;
                    if(queueToOpenHeader.length>0){
                        queueToOpenHeader.shift()();
                    }
                }
            },
            easing: "swing"
        });
    }
    hiddenBody.slideDown({
        duration: duration,
        easing: "linear",
        always: function () {
            updateDescriptions();
            gotoElement($header, function(){
                numberOfAnim--;
                if(numberOfAnim == 0) {
                    if(callbackF) {
                        if (callbackF.length > 0) {
                            callbackF(true);
                        } else {
                            callbackF();
                        }
                    }
                    animComplete = true;
                    if(queueToOpenHeader.length>0){
                        queueToOpenHeader.shift()();
                    }
                }
            });
        }
    });
}
function clickOnHeader($header, callbackF, addToQueue) {
    if(!animComplete){
        if(addToQueue){
            queueToOpenHeader.push(function(){clickOnHeader($header, callbackF, true)});
            return;
        }
        if(callbackF){
            if(callbackF.length>0) {
                callbackF(false);
            } else {
                callbackF();
            }
        }
        return;
    }
    var parentAtHeader = $header.parent();
    var hiddenBody = parentAtHeader.find("> .hiddenBody");

    if (hiddenBody.is(':visible')) {
        closeHeader($header, callbackF, addToQueue);
    } else {
        openHeader($header, callbackF, addToQueue);
    }
}

function addTreeBlock($selector, header, headerCaption, uniqueID, executionTime) {
    uniqueID = uniqueID || getUniqueID();
    executionTime = executionTime || "";
    var headerClass = "> ." + header.replace(" ", "");
    if (header != "") {
        var $headerClass = $selector.find(headerClass);
        if (header != "" && $headerClass.length == 0) {
            $selector.append("<div class='" + headerClass.replace("> .", "") + " items' date='" + uniqueID + "'/>");
            $headerClass = $selector.find(headerClass);
            var indicator           = "<div class='testIndicator' />";
            var executionTimeStr    = "<span class='executionTime'> " + executionTime + "</span>";
            var hiddenBodyContainer  = "<div class='hiddenBody'/>";
            $headerClass.append("<div class='header' >" + indicator + headerCaption + executionTimeStr + "</div></br>");
            $headerClass.append(hiddenBodyContainer);
            initializeClicks($selector, headerClass);
        }
        $selector = $selector.find(headerClass + "> .hiddenBody");
    }
    return $selector;
}
var reportHasDebug = false;
var reportHasErrors = false;

var ReportDrawer = function() {
    this.drawObj = function(entry, header) {
        if (entry.data) {
            this.drawTreeEntries(entry.data, header, entry);
        }
        for (var c in entry) {
            if (entry.hasOwnProperty(c) && isItemAsObject(entry[c])) {
                this.drawObj(entry[c], header + "." + c);
            }
        }
    };

    function getExecutionTimeFromEntry(entry) {
        var executionTime = 0;
        for (var entryKey in entry) {
            if (entry.hasOwnProperty(entryKey)) {
                var entryChild = entry[entryKey];
                if (isItemAsObject(entryChild)) {
                    if (entryChild.executionTime) {
                        executionTime += entryChild.executionTime;
                    } else {
                        executionTime += getExecutionTimeFromEntry(entryChild);
                    }
                }
            }
        }
        var data = entry.data;
        if (data.length > 0) {
            executionTime += data[data.length - 1].date - data[0].date
        }
        return executionTime;
    }

    function getDurationFromEntry(entry) {
        /**
         * @namespace entry.caption
         * @namespace entry.data
         * @namespace entry.date
         * @namespace entry.executionTime
         **/
        var executionTime = 0;

        if (entry.executionTime) {
            executionTime = entry.executionTime;
        } else {
            executionTime = getExecutionTimeFromEntry(entry);
        }
        return getDuration(executionTime);
    }

    function getDuration(timeMillis) {
        /** @namespace duration.minutes */
        /** @namespace duration.seconds */
        /** @namespace duration.hours */
        var units = [
            {label: "millis", mod: 1000},
            {label: "seconds", mod: 60},
            {label: "minutes", mod: 60},
            {label: "hours", mod: 24},
            {label: "days", mod: 7},
            {label: "weeks", mod: 52}
        ];
        var duration = {};
        var x = timeMillis;
        for (var i = 0; i < units.length; i++) {
            var tmp = x % units[i].mod;
            duration[units[i].label] = tmp;
            x = (x - tmp) / units[i].mod
        }
        return duration;
    }

    function clearEntries(entries) {
        var entryKey;
        var entryLine;
        var prevEntryLine;
        var entriesHasProgress = entries.length > 0;

        while (entriesHasProgress) {
            var prevCaption = "";
            var breakFor = false;
            for (entryKey in entries) {
                if (!entries.hasOwnProperty(entryKey)) continue;
                entryLine = entries[entryKey];
                switch (entryLine.type) {
                    case LOG_TYPES.PROGRESS:
                        if (prevCaption == entryLine.caption && prevEntryLine) {
                            for (var descriptionKey in entryLine.description) {
                                if (!entryLine.description.hasOwnProperty(descriptionKey)) continue;
                                var dateString = new Date(entryLine.date).toString("HH:mm:ss");
                                prevEntryLine.description.push(
                                    dateString + " => " + entryLine.description[descriptionKey]
                                );
                                entriesHasProgress = true;
                            }
                            delete entries[entryKey];
                            breakFor = true;
                        } else {
                            prevEntryLine = entryLine;
                            prevCaption = entryLine.caption;
                        }
                        break;
                    default :
                        prevCaption = "";
                        entryLine = null;
                }
                if (breakFor) {
                    breakFor = false;
                    break;
                }
                entriesHasProgress = false;
            }
        }
    }

    this.drawLogEntries = function(entries, headers) {
        var $headerSelector = $(headers.replace(/\./g,' .'));
        var lines = "";
        clearEntries(entries);
        for (var entryKey in entries) {
            if (!entries.hasOwnProperty(entryKey)) continue;
            var entryLine = entries[entryKey];
            if (!entryLine) continue;
            var line = "";
            switch (entryLine.type) {
                case LOG_TYPES.INFO:
                case LOG_TYPES.PROGRESS:
                case LOG_TYPES.DEBUG:
                    entryLine.type = "debug";
                    reportHasDebug = true;
                    line = getHiddenLine(entryLine, headers);
                    break;
                case LOG_TYPES.ERROR:
                case LOG_TYPES.WARNING:
                case LOG_TYPES.STRONG_WARNING:
                case LOG_TYPES.THROWABLE_ERROR:
                    line = getHiddenLine(entryLine, headers);
                    break;
                default:
                    line = getDefaultLine(entryLine, headers);

            }
            lines += line;
        }
        var $hiddenBody = $headerSelector.find("> .hiddenBody");
        if(lines!="") {
            $hiddenBody.append(lines);
            if($hiddenBody.find(".items").length == 0) {
                $hiddenBody.addClass("itemsContainer")
            }
        }
        if(!needHideDebugInfo){
            showDebugInfo("true");
        }
        $.superbox();
        changeIconSize();
        if(needShowOnlyError) {
            showOnlyErrors("true");
        }
    };
    this.drawTreeEntries = function(entries, headers, entry) {
        var headerSelector = 'body';
        var $headerSelector = $(headerSelector);
        var splitHeaders = headers.split(".");
        var count = 0;
        for (var headerKey in  splitHeaders) {

            var header = splitHeaders[headerKey];
            var headerClass = splitHeaders[headerKey].replace(" ", "");
            if (header == "") {
                continue;
            }
            count++;
            var headerCaption = headerClass;
            var time = "";
            var duration;
            if (count >= splitHeaders.length - 1) {
                duration = getDurationFromEntry(entry);
                time = "[" + duration.hours + ":" + duration.minutes + ":" + duration.seconds + "]";
                headerCaption = entry.caption;
            }
            $headerSelector = addTreeBlock($headerSelector, headerClass, headerCaption, entry.date, time);
            if (count >= splitHeaders.length - 1 && entry.subTag) {
                $headerSelector.parent().find("> .header").addClass("subTag");
            }
        }

        var hasErrors = false;
        var hasWarnings = false;
        var hasBlink = false;
        var hasStrongWarnings = false;
        clearEntries(entries);
        for (var entryKey in entries) {
            if (!entries.hasOwnProperty(entryKey)) continue;
            var entryLine = entries[entryKey];
            if (!entryLine) continue;
            switch (entryLine.type) {
                case LOG_TYPES.THROWABLE_ERROR:
                    hasErrors = true;
                    break;
                case LOG_TYPES.INFO:
                case LOG_TYPES.PROGRESS:
                case LOG_TYPES.DEBUG:
                    entryLine.type = "debug";
                    reportHasDebug = true;
                    break;
                case LOG_TYPES.ERROR:
                    hasErrors = true;
                    break;
                case LOG_TYPES.WARNING:
                    hasWarnings = true;
                    break;
                case LOG_TYPES.STRONG_WARNING:
                    hasStrongWarnings = true;
                    break;
                case LOG_TYPES.BLINK:
                    hasBlink = true;
                    break;
            }
        }
        if (entries.length>0) {
            $headerSelector.attr(dataHrefAttrKey, headers);
        }

        var $testIndicator = $headerSelector.parent();

        if (hasErrors) {
            reportHasErrors = true;
            changeIndicatorColor($testIndicator, "red");
        } else if (!hasBlink && !hasWarnings && !hasStrongWarnings) {
            changeIndicatorColor($testIndicator, "green");
        }
        if (hasBlink) {
            changeIndicatorColor($testIndicator, "blink");
        }
        if (hasWarnings) {
            changeIndicatorColor($testIndicator, "orange");
        }
        if (hasStrongWarnings) {
            changeIndicatorColor($testIndicator, "strong_orange");
        }
    };

    function getDefaultLine(entry, headers) {
        var line = "<div class=\'borderDiv " + entry.type + "\' date='" + entry.date + "'>";
        var uniqueID = "";//getUniqueID();
        var elementId = entry.type + entry.date + uniqueID;
        var logLink = headers+"-"+elementId;
        var caption = "<a id='"+elementId+"' href='#goto:" + logLink + "'>" + entry.caption + "</a>";
        line += "<div class='lineItem command' style='width: 250px;'>" + caption + " </br><span class='date'>" + new Date(entry.date).toString("yyyy-MM-dd HH:mm:ss") + "</span></div>";
        line += "<div class='lineItem descriptions' style='width: 1000px;'><pre style=''>";

        for (var descriptionKey in entry.description) {
            line += new StringUtils().expandHrefInTags(entry.description[descriptionKey]) + "\n";
        }
        line += "</pre></div>";

        if (entry.thumbImageLink) {
            // var parentOfImg = "http://teamcity.corp/repository/download/PlaytinetClient_SeleniumTests_SlotomaniaAutoTests_SlotsStageThree_Sanit_Regre_82/1765724:id/report.zip%21/";
            var parentOfImg = "";
            line += "<div class='lineItem imgBlock' style='width: 75px; height: 75px;'><a href='" + (parentOfImg + entry.imageLink) + "' rel='superbox[gallery][my_gallery]'>";
            line += "<img src='" + (parentOfImg + entry.thumbImageLink) + "' width='75' height='75' alt='" + entry.caption + "' />";
            line += "</a></div>";
        }
        line += "</div>";

        return line
    }

    function getHiddenLine(entry, headers) {
        var descriptions = entry.description;
        if (descriptions.length == 1 && descriptions[0].split("\n", 11).length > 10) {
            var index = 0;
            descriptions.unshift(descriptions[0].split("\n", 2 + index)[index]);
            while (descriptions.length > 0 && descriptions[0] == "") {
                descriptions.shift();
                descriptions.unshift(descriptions[0].split("\n", 2 + index)[index++]);
            }
        }
        for (var i = descriptions.length; i--;) {
            if (descriptions[i] === "") {
                descriptions.splice(i, 1);
            }
        }
        if (descriptions.length > 1) {
            var line = "<div class=\'borderDiv " + entry.type + "\' date='" + entry.date + "'>";

            var uniqueID = "";//getUniqueID();
            var elementId = entry.type + entry.date + uniqueID;
            var logLink = headers+"-"+elementId;
            var caption = "<a id='"+elementId+"' href='#goto:" + logLink + "'>" + entry.caption + "</a>";

            line += "<div class='lineItem command' style='width: 250px;'>" + caption + " </br><span class='date'>" + new Date(entry.date).toString("yyyy-MM-dd HH:mm:ss") + "</span></div>";

            var entry_id = "desc_item" + (uniqueKey++);
            var className = "desc_item";
            var hiddenDescriptions = "";


            var splitDescriptionHeader = descriptions[0].split("\n");
            var descriptionHeader = splitDescriptionHeader.shift();

            function isHeaderMsg(splitDescriptionHeader) {
                return splitDescriptionHeader.length > 0 &&
                    splitDescriptionHeader[0] != undefined &&
                    (
                        splitDescriptionHeader[0].indexOf("but found") > -1 ||
                        splitDescriptionHeader[0].indexOf("expected") > -1 ||
                        splitDescriptionHeader[0].indexOf("\t- ") > -1
                    );
            }

            while (isHeaderMsg(splitDescriptionHeader)) {
                descriptionHeader += "\n" + splitDescriptionHeader.shift();
            }
            descriptionHeader = new StringUtils().expandHrefInTags(descriptionHeader);

            var arrow = "<img src='icons/arrow_down.png'/>";
            hiddenDescriptions += "<div class='descTitle lineItem descriptions' onclick='showHiddenData(event, \"" + entry_id + "\")'>" +
                "<pre class='" + className + "'>" + arrow + descriptionHeader + "</pre>";
            hiddenDescriptions += "<div id='" + entry_id + "' class='lineItem descriptions' style='display: none'>";
            for (var splitKey in splitDescriptionHeader) {
                var splitDesc = splitDescriptionHeader[splitKey];
                splitDesc = new StringUtils().expandHrefInTags(splitDesc);
                hiddenDescriptions += "<pre class='" + className + "'>" + splitDesc + "</pre>";
            }
            for (var descriptionKey in descriptions) {
                if (descriptionKey == 0) continue;
                var desc = new StringUtils().expandHrefInTags(descriptions[descriptionKey]);
                hiddenDescriptions += "<pre class='" + className + "'>" + desc + "</pre>";
            }
            hiddenDescriptions += "</div></div>";
            line += hiddenDescriptions;
            if (entry.thumbImageLink) {
                line += "<div class='lineItem imgBlock' style='width: 75px; height=75px;'><a href='" + entry.imageLink + "' rel='superbox[gallery][my_gallery]'>";
                line += "<img src='" + entry.thumbImageLink + "' width='75' height='75' alt='" + entry.caption + "' />";
                line += "</a></div>";
            }
            line += "</div>";
            return line;
        } else {
            return getDefaultLine(entry, headers);
        }
    }
};
var reportDrawer = new ReportDrawer();

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function showHiddenData(event, entry_id) {
    if(event.target.href){
        return;
    }
    if(getSelectionText()){
        return;
    }

    var updateAfterFade = function () {
        updateDescriptions()
    };
    var $entry = $("#" + entry_id);
    if ($entry.css("display") == "inline-block") {
        $entry.fadeOut(200, updateAfterFade);
    } else {
        $entry.fadeIn(200, updateAfterFade);
    }
}
function changeIndicatorColor($testIndicator, color) {
    while ($testIndicator.parent().size() > 0 && $testIndicator.parent().parent().size() > 0) {
        $testIndicator.find("> .header> .testIndicator").addClass(color);
        $testIndicator = $testIndicator
            .parent()
            .parent();
    }
}
var hasEmptyNodes = false;
function beautifyEmptyNodes() {
    $(".testIndicator").each(function () {
        var parentAtIndicator = $(this).parent();
        var hindenBody = parentAtIndicator.parent().find("> .hiddenBody");
        if(hindenBody[0].hasAttribute(dataHrefAttrKey)){
            return;
        }
        if (hindenBody.html() == "") {
            $(this).css("background", "rgba(148, 222, 151, 0.27)");
            parentAtIndicator.addClass("disable");
            parentAtIndicator.parent().addClass("disable");
            parentAtIndicator.unbind("click");
            hasEmptyNodes = true;
        }
    });
    if(hasEmptyNodes) {
        $("#btnShowEmptyNodes").parent().fadeIn(duration);
    }
}

function showFirstNotEmptyNode() {
    var showItem = function($item){
        if($item.length == 1){
            var $hiddenBody = $item.find("> .hiddenBody");
            if($hiddenBody.css("display")!="block") {
                openHeader($item.find("> .header"), function (isOpened) {
                    if (isOpened) {
                        showItem($hiddenBody.find("> .items:not(.disable)"))
                    }
                }, true);
            } else {
                showItem($hiddenBody.find("> .items:not(.disable)"));
            }
        }
    };
    var $items = $($(".items:not(.disable)")[0]);
    showItem($items);
}
function hideNodesWhenItMoreThatTen() {
    $(".hiddenBody").each(function () {
        var $items = $(this).find("> .items");
        if($items.length>10 || $($items).find("> .subTag").length>0) {
            $items.each(function () {
                $(this).find("> .hiddenBody").css("display", "none");
            });
        }
    });
}
var $currentTag;

var showInnerTag = function () {
    if(!$currentTag){
        $currentTag = $($(" .header:not(.disable)")[0]);
    }
    var $innerTag = $($currentTag.parent().find("> .hiddenBody> .items> .header:not(.disable)")[0]);
    if($innerTag.length) {
        if(!$innerTag.is(':visible')){
            openHeader($currentTag, function () {}, true);
        }
        $(".selected").removeClass("selected");
        $currentTag = $innerTag;
        $currentTag.addClass("selected");
    } else {
        if(!$currentTag.parent().find("> .hiddenBody").is(":visible")){
            openHeader($currentTag, function () {}, true);
            gotoElement($currentTag);
        }
    }
};
var showOuterTag = function () {
    $(".selected").removeClass("selected");
    if(!$currentTag){
        $currentTag = $($(" .header:not(.disable)")[0]);
    }
    if($currentTag.parent().find("> .hiddenBody").is(":visible")){
        closeHeader($currentTag, function () {}, true);
        return;
    }
    var parent = $currentTag.parent().parent().parent();
    if(parent.hasClass("items")) {
        if($currentTag.is(':visible')) {
            closeHeader($currentTag, function () {
            }, true);
        }
        $currentTag = $(parent.find("> .header:not(.disable)")[0]);
        closeHeader($currentTag, function () {}, true);
        $currentTag.addClass("selected");
    }
};

var showNextTag = function () {
    $(".selected").removeClass("selected");
    if(!$currentTag){
        $currentTag = $($(" .header:not(.disable)")[0]);
    }
    var $innerTag = $($currentTag.parent().find("> .hiddenBody> .items> .header:not(.disable)")[0]);
    if($($currentTag.parent().find("> .hiddenBody> .items> .header:not(.disable)")[0]).is(":visible")){
        showInnerTag();
        return;
    }
    var $headers =  $currentTag.parent().parent().find("> .items> .header:not(.disable)");
    while($headers[$headers.length-1] == $currentTag[0]) {
        var parent = $currentTag.parent().parent().parent();
        if(parent.hasClass("items")){
            $currentTag = $(parent.find("> .header:not(.disable)")[0]);
            $headers =  $currentTag.parent().parent().find("> .items> .header:not(.disable)");
        } else {
            $innerTag = $($currentTag.parent().find("> .hiddenBody> .items> .header:not(.disable)")[0]);
            if ($innerTag.length) {
                if (!$innerTag.is(':visible')) {
                    openHeader($currentTag, function () {}, true);
                }
                $currentTag = $innerTag;
                $currentTag.addClass("selected");
                gotoElement($currentTag);
                return;
            }
            $headers = $(".header:not(.disable)");
        }
    }
    for (var i = 0; i<$headers.length-1; i++) {
        if($headers[i] == $currentTag[0]) {
            var $nextHeader = $headers[i + 1];
            var hiddenBodies = $($nextHeader).parent().parent();
            while(hiddenBodies.length>0){
                hiddenBodies.css("display", "block");
                hiddenBodies = hiddenBodies.parent().parent();
            }
            $currentTag = $($nextHeader);
            $currentTag.addClass("selected");
            gotoElement($currentTag);
            return;
        }
    }
};
var showPrevTag = function () {
    $(".selected").removeClass("selected");
    if(!$currentTag){
        $currentTag = $($(" .header:not(.disable)")[0]);
    }
    var $headers =  $currentTag.parent().parent().find("> .items> .header:not(.disable)");
    if($headers[0] == $currentTag[0]){
        var parent = $currentTag.parent().parent().parent();
        if(parent.hasClass("items")) {
            $currentTag = $(parent.find("> .header:not(.disable)")[0]);
            $currentTag.addClass("selected");
        }
        return;
    }
    for (var i = $headers.length-1; i>0; i--) {
        if($headers[i] == $currentTag[0]) {
            var $prevHeader = $headers[i - 1];
            var hiddenBodies = $($prevHeader).parent().parent();
            while(hiddenBodies.length>0){
                hiddenBodies.css("display", "block");
                hiddenBodies = hiddenBodies.parent().parent();
            }
            $currentTag = $($prevHeader);
            $currentTag.addClass("selected");
            gotoElement($currentTag);
            return;
        }
    }
};
var progressBar = new function() {
    this.progressId = 0;

    this.isInProgress = function () {
        return this.progressId != 0;
    };

    this.stopProgress = function () {
        clearInterval(this.progressId);
        $("#progressBoxTab").fadeOut(2000);
        this.progressId = 0;
        return this;
    };

    this.runProgressBar = function (timeout) {
        if(progressBar.isInProgress()){
            return this;
        }
        var $progressBar = $("#progressBar");
        $("#progressBoxTab").show();
        var startTime = new Date().getTime();
        this.progressId = setInterval(function () {
            var progress = parseInt(((new Date().getTime() - startTime) / timeout) * 100);
            if (progress >= 100) {
                progressBar.stopProgress();
                progress = 100;
            }
            $progressBar.css("width", (progress - 4) + "px");

        }, timeout / 100);
        setTimeout(function () {
            progressBar.stopProgress();
        }, timeout);
        return this;
    }
};

function sortByName() {
    var $header = $("body> .items> .hiddenBody> .items");
    $header.sortElements(function (a, b) {
        var text1 = $($(a).find("> .header")).text();
        var text2 = $($(b).find("> .header")).text();
        return (text1 == text2)? 0:(text1 > text2 ? -1 : 1);
    });
}
function sortByTime() {
    var getTime = function(text){
        var result;
        var split = text.replace(/\[|]/gim, "").split(":");
        result = parseInt(split[0]) * 60 * 60;
        result += parseInt(split[1]) * 60;
        result += parseInt(split[2]);
        return result;
    };
    var $header = $("body> .items> .hiddenBody> .items");
    $header.sortElements(function (a, b) {
        var time1 = getTime($($(a).find("> .header> .executionTime")).text());
        var time2 = getTime($($(b).find("> .header> .executionTime")).text());
        return (time1 == time2)? 0:(time1 > time2 ? -1 : 1);
    });
}
function sortDraw($header) {
    $header = $header || $("body> .items");
    if ($header.attr("date")) {
        $header.sort(function (a, b) {
            return $(a).attr("date") > $(b).attr("date") ? 1 : -1;
        }).appendTo($header.parent());
        $header.each(function () {
            sortDraw($(this).find("> .hiddenBody> div"));
        });
    }

}
function draw() {
    $.registerCommand(openHash, "goto");
    reportDrawer.drawObj(items, "");
    setUnselectable(".header");
    if(reportHasDebug||initialyHaveDebugs){
        $('#btnDebugInfo').parent().fadeIn(duration);
    }
    if(reportHasErrors){
        $('#btnShowAllErrors, #btnShowOnlyErrors').parent().fadeIn(duration);
    }
}

var openHash = function (hash) {
    showTabByDate(hash);
};

$(window).scroll(function () {
    var $scrollTop = parseInt($(window).scrollTop());
    $("#menu").css({"margin-top": ($scrollTop - 14) + 'px'});
});

function unselectTabs() {
    setUnselectable("#menu");
}

function setUnselectable(unSelectableElName) {
    var $unSelectableElName = $(unSelectableElName);
    $unSelectableElName.css("-webkit-user-select", "none");
    $unSelectableElName.css("-moz-user-select", "none");
    $unSelectableElName.css("-ms-user-select", "none");
    $unSelectableElName.css("-o-user-select", "none");
    $unSelectableElName.css("user-select", "none");
}

var openAllErrors = function () {
    var $btnOpenAllErrors = $('#btnOpenAllErrors');
    $btnOpenAllErrors.unbind("click");
    var needOpenError = $(this).prop('textContent') == 'open errors';
    $btnOpenAllErrors.addClass("disable");
    showErrors(needOpenError);
};

var showAllErrors = function (command) {
    var $btnShowAllErrors = $("#btnShowAllErrors");
    var needShowError = command == "true";
    if (needShowError) {
        $(".testIndicator").not(".red").parent().parent().css("display", "none");
        $btnShowAllErrors.prop('textContent', 'close errors');
        $btnShowAllErrors.prop('href', '#showErrors:false');
    } else {
        $(".testIndicator").not(".red").parent().parent().css("display", "block");
        $btnShowAllErrors.prop('textContent', 'show errors');
        $btnShowAllErrors.prop('href', '#showErrors:true')
    }
};
var needShowOnlyError = false;
var showOnlyErrors = function (command) {
    showAllErrors(command);
    var $btnShowOnlyErrors = $("#btnShowOnlyErrors");
    needShowOnlyError = command == "true";
    if (needShowOnlyError) {
        $(".borderDiv").not(".throwable_error").not(".error").css("display", "none");
        $btnShowOnlyErrors.prop('textContent', 'close only errors');
        $btnShowOnlyErrors.prop('href', '#showOnlyErrors:false');
    } else {
        var $itemsToShow = $(".borderDiv").not(".throwable_error").not(".error");
        if(!isNeedShowDebugInfo()){
            $itemsToShow = $itemsToShow.not(".debug");
        }
        $itemsToShow.css("display", "block");
        $btnShowOnlyErrors.prop('textContent', 'show only errors');
        $btnShowOnlyErrors.prop('href', '#showOnlyErrors:true')
    }
};

var isNeedShowDebugInfo = function () {
    var $btnDebugInfo = $('#btnDebugInfo');
    return $btnDebugInfo.prop('textContent') == 'hide debug information'
};
var needHideDebugInfo = true;
var showDebugInfo = function (command) {
    if((typeof command)!="string") return;
    if(initialyHaveDebugs){
        setTimeout(function () {
            window.location.reload(true);
        }, 500);
        return;
    }
    var $btnDebugInfo = $('#btnDebugInfo');
    needHideDebugInfo = command == "false";
    $btnDebugInfo.prop('href', '#showDebugInfo:' + needHideDebugInfo);
    $('.debug').css('display', (needHideDebugInfo ? "none" : "block"));
    $btnDebugInfo.prop('textContent', needHideDebugInfo ? "show debug information" : "hide debug information");
};

var showEmptyNodes = function (command) {
    if((typeof command)!="string") return;
    var $btnShowEmptyNodes = $('#btnShowEmptyNodes');
    var needShowEmptyNodes = command == "true";
    $btnShowEmptyNodes.prop('href', '#showEmptyNodes:' + !needShowEmptyNodes);
    if(needShowEmptyNodes) {
        $('.disable').addClass('show');
    } else {
        $('.disable').removeClass('show');
    }
    $btnShowEmptyNodes.prop('textContent', !needShowEmptyNodes ? "Show empty nodes" : "Hide empty nodes");
};

var isNeedUseAccordion = true;
var useAccordion = function (command) {
    if((typeof command)!="string") return;
    var $btnUseAccordion = $('#btnUseAccordion');
    isNeedUseAccordion = command == "true";
    $btnUseAccordion.prop('href', '#useAccordion:' + !isNeedUseAccordion);
    $btnUseAccordion.prop('textContent', !isNeedUseAccordion ? "Use accordion" : "Stop use accordion");
};

var uid = 0;
function getUniqueID() {
    return uid++;
}
var _showAllFirstCall = true;
function show(isOpen, callBackF) {
    console.log("show", isOpen);
    if (isOpen) {
        if(_showAllFirstCall) {
            var isNeedUseAccordionBeforeCall = isNeedUseAccordion;
            isNeedUseAccordion = false;
            var durationBeforeCall = duration;
            duration = 20;
            $('.header:not(.disable)').filter(function () {
                return !$(this).parent().find("> .hiddenBody").is(':visible');
            }).each(function () {
                openHeader($(this), function () {}, true);
            });
            queueToOpenHeader.push(function () {
                updateDescriptions();
                duration = durationBeforeCall;
                isNeedUseAccordion = isNeedUseAccordionBeforeCall;
                _showAllFirstCall = false;
                if(callBackF){
                    callBackF();
                }
            });
            progressBar.runProgressBar(queueToOpenHeader.length*Math.max(initialDuration, duration)*2);
        } else {
            $('.hiddenBody').filter(function () {
                return !$(this).is(':visible');
            }).each(function () {
                $(this).css("display", "block");
            });
            updateDescriptions();
            if (callBackF) {
                callBackF();
            }
        }
    } else {
        $('.hiddenBody').filter(function () {
            return $(this).is(':visible');
        }).each(function () {
            $(this).parent().find("> .hiddenBody").css("display", "none")
        });
        if (callBackF) {
            callBackF();
        }
    }
}
function gotoElement($scrollTo, callBackF) {
    if ($scrollTo && $scrollTo.offset()) {
        $scrollTo.focus();
        var params = {scrollTop: $scrollTo.offset().top - $scrollTo.height() * .5 - window.innerHeight * .5};
        var options = {always:callBackF, duration:duration*3};
        $('html, body').animate(params, options);
    } else {
        if(callBackF) {
            callBackF();
        }
    }
}
function openNode(nodeLinks, $prevHiddenBody, callBackF) {
    if(nodeLinks.length>0) {
        var shift = nodeLinks.shift();
        if(!$prevHiddenBody && shift!=""){
            $prevHiddenBody = $("." + shift);
        } else {
            $prevHiddenBody = $prevHiddenBody.find("> ." + shift);
        }
        var $header;
        $header = $prevHiddenBody.find("> .header");
        if($prevHiddenBody.find("> .hiddenBody").css("display")=="none") {
            openHeader($header, function () {
                openNode(nodeLinks, $prevHiddenBody.find("> .hiddenBody"), callBackF);
            }, true);
        } else {
            openNode(nodeLinks, $prevHiddenBody.find("> .hiddenBody"), callBackF);
        }
    } else {
        if(callBackF){
            callBackF()
        }
    }
}
var showTabByDate = function (fullElementLink) {
    if(fullElementLink){
        var elementLinkData = fullElementLink.split("-");
        var nodeLink = elementLinkData[0];
        var elementLink = elementLinkData[1];
        openNode(nodeLink.split(".").slice(1), null, function(){
            gotoElement($("#" + elementLink));
        });
    }
};
var $prevSortMethod = "date";
var changeSortMethod = function (data) {
    console.log("changeSortMethod: " + data);
    data = data ? data : $prevSortMethod;
    var $chooseTreeSortMethod = $("#chooseTreeSortMethod");
    if ($chooseTreeSortMethod.prop("value") != data) {
        $chooseTreeSortMethod.prop("value", data);
    }
    switch (data){
        case "date":
            sortDraw();
            break;
        case "execution_time":
            sortByTime();
            break;
        case "name":
            sortByName();
            break;
    }
};

var $prevSelectedItemText = "75px";
var changeIconSize = function (data) {
    data = data ? data : $prevSelectedItemText;
    var $setScreenScale = $("#setScreenScale");
    if ($setScreenScale.prop("value") != data) {
        $setScreenScale.prop("value", data);
    }
    var $imgBlock = $(".imgBlock");
    var $img = $imgBlock.find("a img");
    $imgBlock.width(data);
    $imgBlock.height(data);
    var setToImgBlockWidthAndHeight = function (data, img) {
        var size = parseInt(data);
        if (img.naturalWidth > img.naturalHeight) {
            img.width = size;
            img.height = size * img.naturalHeight / img.naturalWidth;
        } else {
            img.height = size;
            img.width = size * img.naturalWidth / img.naturalHeight;
        }

    };
    $img.each(function (img) {
        if ($img[img].naturalWidth == 0) {
            $img[img].onload = function () {
                setToImgBlockWidthAndHeight(data, this);
            };
        } else {
            setToImgBlockWidthAndHeight(data, this);
        }
    });
    if (parseInt(data) > 600 && parseInt($prevSelectedItemText) < 600) {
        if ($img[0].src.indexOf("thumb") > -1) {
            $img.each(function (img) {
                var src = $img[img].src.replace(/ thumb/, "").replace(/%20thumb/, "");
                $($img[img]).attr("src", src);
            });
        }
    }
    $prevSelectedItemText = data;
    updateDescriptions();
};
var showAll = function (command) {
    var $btnShowAll = $('#btnShowAll');
    if($btnShowAll.parent().hasClass("disable")){
        return;
    }
    var isOpen = command == "true";
    $btnShowAll.prop('href', '#showAll:' + !isOpen);
    $btnShowAll.parent().addClass("disable");
    show(isOpen, function () {
        $btnShowAll.prop('textContent', isOpen ? "hide all" : "show all");
        $btnShowAll.parent().removeClass("disable");
    });
};
var showInfo = function () {
    var needShowInfoBlocks = $(this).prop('textContent') == 'show info blocks';
    $('.info').css('display', (needShowInfoBlocks ? "table-row" : "none"));
    $('#btnShowInfo').prop('textContent', needShowInfoBlocks ? "hide info blocks" : "show info blocks");
};
var prevScrollTop = 0;
var moveOnTop = function () {
    var $btnMoveOnTop = $("#btnMoveOnTop");
    $btnMoveOnTop.addClass("disable");
    $("html, body").animate({scrollTop: prevScrollTop}, "slow", function () {
        $btnMoveOnTop.removeClass("disable");
        $btnMoveOnTop.prop('textContent', prevScrollTop == 0 ? "move on top" : "return to test");
    });
    prevScrollTop = $(window).scrollTop();
};
(function (i) {
    var hash = {};
    var hashCommands = {};
    i.hashUtils = function () {
        window.onhashchange = onHashChanged;
        collectHash(window.location.hash);
    };
    i.setValue = function (valueName, value) {
        window.location.hash = valueName + ":" + value;
    };

    i.hasHash = function (hash) {
        return window.location.hash.split(hash, 2).length>1;
    };

    i.registerCommand = function (fCallBack, hashTrigger) {
        if (!hashCommands.hasOwnProperty(hashTrigger)) {
            hashCommands[hashTrigger] = [];
        }
        hashCommands[hashTrigger].push(fCallBack);
    };
    var callCommand = function (hashTrigger, data) {
        if (hashCommands.hasOwnProperty(hashTrigger)) {
            var hashTriggers = hashCommands[hashTrigger];
            for (var fCallBack in hashTriggers) {
                if (hashTriggers.hasOwnProperty(fCallBack)) {
                    hashTriggers[fCallBack].apply(this, [data]);
                }
            }
        }
    };
    var setHash = function () {
        var hashUrl = "";
        for (var hashTag in hash) {
            hashUrl += hashTag + ":" + hash[hashTag] + "&";
        }
        hashUrl = hashUrl.replace(/(&)$/, "");
        window.location.hash = hashUrl;
    };
    var collectHash = function (data) {
        var hashTags = data.replace("#", "").split("&");
        for (var hashTag in hashTags) {
            if (hashTags[hashTag] != "") {
                var command = hashTags[hashTag].split(":");
                if (command.length > 1) {
                    if (!hash.hasOwnProperty(command[0]) || (hash.hasOwnProperty(command[0]) && hash[command[0]] != command[1])) {
                        callCommand(command[0], command[1]);
                    }
                    hash[command[0]] = command[1];
                } else {
                    hash[hashTag] = hashTags[hashTag];
                }

            }
        }

    };

    var onHashChanged = function () {
        console.log("onHashChanged");
        collectHash(window.location.hash);
        setHash();
    }
})(jQuery);


function getKeys(items) {
    var keys = [];
    for (var key in items) {
        if(items.hasOwnProperty(key)) {
            if (isItemAsObject(items[key])) {
                keys.push(key);
            }
        }
    }
    return keys;
}
function getCountOfKeys($items) {
    return getKeys($items).length;
}

function isItemAsObject(item) {
    var typeOfItem = typeof item;
    return typeOfItem!= "string" && typeOfItem != "number"&& typeOfItem != "boolean" && !(item instanceof Array)
}
(function (i) {
    function recollectAllItemsIn($item) {
        var countOfKeysInNewObj = getCountOfKeys($item);
        for (var key1 in $item) {
            if ($item.hasOwnProperty(key1) && isItemAsObject($item[key1]) && !$item[key1].subTag) {
                if (countOfKeysInNewObj > 1) {
                    i.recollectItems($item[key1]);
                }
            }
        }

    }

    i.removeDebugLogs =  function($items) {

        for (var key in $items) {
            if(!$items.hasOwnProperty(key)){
                continue;
            }
            var $item = $items[key];
            if ($item instanceof Array || (isItemAsObject($item) && !$item.type)) {
                i.removeDebugLogs($item);
                continue;
            }
            if($item.type == LOG_TYPES.DEBUG){
                initialyHaveDebugs = true;
                $items.splice(key, 1);
            }

        }
    };
    i.recollectItems =  function($items) {
        for (var key in $items) {
            if(!isItemAsObject($items)) {
                continue;
            }
            if(!$items.hasOwnProperty(key)) {
                continue;
            }
            if(!isItemAsObject($items[key])){
                continue;
            }
            if($items[key].subTag){
                continue;
            }
            if($items.subTag){
                continue;
            }
            var newKey = key;

            while (getCountOfKeys($items)==1 && isExistOneNotLastItem($items, newKey) && $items[newKey].data.length==0) {
                var childKey = getKeys($items[newKey])[0];
                var oldKey = newKey;
                if($items[oldKey][childKey].subTag){
                    break;
                }
                newKey = newKey + "_" + childKey;
                $items[newKey] = $items[oldKey][childKey];
                if ((parseInt(childKey) + "").length == childKey.length) {
                    $items[newKey].caption = oldKey + "(" + childKey + ")";
                }
                delete $items[oldKey];
            }
            var $itemFromNewKey = $items[newKey];
            if(isItemAsObject($itemFromNewKey) && !$itemFromNewKey.subTag) {
                recollectAllItemsIn($itemFromNewKey);
            }
        }
    };
    i.collapseItems = function($items, key) {
        key = key?key:getKeys($items)[0];
        if (isExistOneItem($items, key) && $items[key].data.length==0 && !$items[key].subTag) {
            var oldCaption = $items[key].caption;
            var keyToCollapse = getKeys($items[key])[0];
            if(!$items[key][keyToCollapse].subTag) {
                $items[key + "_" + keyToCollapse] = $items[key][keyToCollapse];
                $items[key + "_" + keyToCollapse].caption = oldCaption + "." + $items[key + "_" + keyToCollapse].caption;
                delete $items[key];
                i.collapseItems($items, key + "_" + keyToCollapse);
                return key + "_" + keyToCollapse;
            }
        }
        for (var newKey in $items[key]) {
            if($items[key].hasOwnProperty(newKey) && isItemAsObject($items[key][newKey])) {
                i.collapseItems($items[key], newKey);
            }
        }
        return key;
    };

    function isExistOneNotLastItem($items, newKey) {
        if(isExistOneItem($items, newKey)){
            var newItem = $items[newKey];
            var newItemChild = newItem[getKeys(newItem)[0]];
            return !(newItemChild instanceof Array) && getCountOfKeys(newItemChild) > 0;
        }
        return false;
    }

    function isExistOneItem($items, newKey) {
        var newItem = $items;
        if(newKey){
            newItem = $items[newKey];
        }
        return !(newItem instanceof Array) && getCountOfKeys(newItem) == 1;
    }
})(jQuery);

var StringUtils = function() {
    // expandHrefInTags = expandHrefInTags
    this.expandHrefInTags = function(string) {
        var inputText = string?string:"";
        var replacedText, imgReplacePattern, replacePattern1, replacePattern2, replacePattern3;
        //URLs starting with http://, https://, or ftp:// and ended with image format
        var htmlPattern = /(<.\w+>.*<\/.*>)/gim;
        if (inputText.match(htmlPattern)){
            inputText = inputText.replace(htmlPattern,
                '<XMP>$1</XMP>'
            );
            return inputText;
        }
        htmlPattern = /(<.*>)/gim;
        if (inputText.match(htmlPattern)){
            inputText = inputText.replace(htmlPattern,
                '<XMP style="display: inline-block">$1</XMP>'
            );
        }
        imgReplacePattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|](\.(jpg|png|gif|img|bmp|jpeg)){1})/gim;
        if (inputText.match(imgReplacePattern)){
            replacedText = inputText.replace(imgReplacePattern, '<img src="$1" alt="$1"/>');
            return replacedText;
        } else {
            replacedText = inputText;
        }
        //URLs starting with http://, https://, for cheat service
        replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#%=~_|]\/([\w-]{1,20}\/[\w-]{1,20}\/[\w-]{1,20}).[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        if (replacedText.match(replacePattern1)) {
            return replacedText.replace(replacePattern1, '<a href="$1" class="descLink" target="_blank" title="$1">$3</a>');
        }
        //URLs starting with http://, https://, or ftp://
        replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        if (replacedText.match(replacePattern1)) {
            return replacedText.replace(replacePattern1, '<a href="$1" class="descLink" target="_blank">$1</a>');
        }

        //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" class="descLink" target="_blank">$2</a>');

        replacedText = this.expandBracketsInTags(replacedText);

        //Change email addresses to mailto:: links.
        replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
        if (replacedText.match(replacePattern3)) {
            return replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1" class="descLink">$1</a>');
        }
        return replacedText
    };

    this.expandBracketsInTags = function(string) {
        var replacedText, replacePattern1;

        replacedText = string;

        replacePattern1 = /"([\w]+)"(:[ \t]*)([\w\d.@]+)/gim;
        replacedText = replacedText.replace(replacePattern1,
            '<span class="valueField">"$1"</span>'+
            '$2'+
            '<span class="beautifulNumber">$3</span>'
        );

        replacePattern1 = /"([\w]+)"(:[ \t]*[{]+)/gim;
        replacedText = replacedText.replace(replacePattern1,
            '<span class="valueField">"$1"</span>'+
            '$2'
        );
        /**
         * example
         * balanceToUpdate:1.0E8
         * balanceToUpdate:   1.0E8
         * balanceToUpdate = 	1.0E8
         * balanceToUpdate - 	1.0E8
         **/
        replacePattern1 = /([\a-z ]+)([ \t]*[:=-][ \t]*)(true|false|[-\d:,./]+(E[\d,./]+)?)/gim;
        replacedText = replacedText.replace(replacePattern1,
            // '<span class="valueField">$1</span>'+
            '$1'+
            '$2'+
            '<span class="beautifulNumber">$3</span>'
        );

        replacePattern1 = /([\a-z ]+)([ \t]*[:-][ \t]*)(["'])([\w .,:_!#$-]+)(["'])/gim;
        replacedText = replacedText.replace(replacePattern1,
            '$1'+
            '$2'+
            '<span class="bracket">$3</span>'+
            '<span class="beautifulStrings">$4</span>'+
            '<span class="bracket">$5</span>'
        );
        /**
         * example
         * "userMail": {      "userMail": "gleb.savenko@gmail.com",      "appSnId": "100001414108781",      "userSnId": "100001414108781"   }
         **/
        replacePattern1 = /"([\w]+)"(:[ \t]*)"([\w ,.!%&*()$/+\@_\d{},;/\\-]+)"/gim;
        replacedText = replacedText.replace(replacePattern1,
            '<span class="valueField">"$1"</span>'+
            '$2'+
            '"<span class="beautifulStrings">$3</span>"'
        );

        replacePattern1 = /(\[)([^\]^\[]+)(])/gim;
        replacedText = replacedText.replace(replacePattern1,
            '<span class="bracket">$1</span>'+
            '<span class="inBracket">$2</span>'+
            '<span class="bracket">$3</span>'
        );

        replacePattern1 = /((\()([\w\d /|\\+_*&$#@!-]+)(\)))/gim;
        replacedText = replacedText.replace(replacePattern1,
            '<span class="bracket">$2</span>'+
            '<span class="inBracket">$3</span>'+
            '<span class="bracket">$4</span>'
        );

        replacePattern1 = /(\{)([^}^\{]+)(})/gim;
        replacedText = replacedText.replace(replacePattern1,
            '<span class="bracket">$1</span>'+
            '$2'+
            '<span class="bracket">$3</span>'
        );

        return replacedText;
    };
};
