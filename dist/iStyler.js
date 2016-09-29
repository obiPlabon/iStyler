"use strict";

var ColorSwitcher = (function() {
    
    function initColorSwitcher(colorSheets) {
        var tempCon, groupedSheets, colorSwitcher, controlBtn, colorSwitchs, linkHolderHtml, linkHolder;

        if (Object.prototype.toString.call(colorSheets) !== "[object Array]") {
            return;
        }

        groupedSheets = {};

        tempCon = document.createDocumentFragment();
        
        colorSwitcher = document.createElement("div");
        colorSwitcher.classList.add("ColorSwitcher");

        controlBtn = document.createElement("button");
        controlBtn.classList.add("ColorSwitcher__control");

        colorSwitchs = document.createElement("div");
        colorSwitchs.classList.add("ColorSwitcher__switchs");

        linkHolderHtml = document.createElement("link");
        linkHolderHtml.rel = "stylesheet";
        linkHolderHtml.id = "ColorSwitcherLinkHolder";
        document.head.appendChild(linkHolderHtml);

        linkHolder = document.getElementById("ColorSwitcherLinkHolder");

        // var colorSwitch;

        // if (colorSheet.color && colorSheet.title && colorSheet.href) {
        //     colorSwitch = document.createElement("button");

        //     colorSwitch.classList.add("ColorSwitcher__switch")
        //     colorSwitch.title = colorSheet.title;
        //     colorSwitch.dataset.index = index;
        //     colorSwitch.style.backgroundColor = colorSheet.color;
            
        //     colorSwitchs.appendChild(colorSwitch);
        // }
        
        colorSheets.forEach(function(colorSheet, index) {            
            if ((colorSheet.color || colorSheet.thumbnail) && colorSheet.title && colorSheet.href) {
                var group = colorSheet.group || "Color Scheme";

                colorSheet.group = group;

                if (!groupedSheets[group]) {
                    groupedSheets[group] = [colorSheet];
                } else {
                    groupedSheets[group].push(colorSheet);
                }
            }
        });

        console.log(groupedSheets);

        // colorSwitchs.addEventListener("click", function(event) {
        //     var index;

        //     if (event.target.nodeName !== "BUTTON") {
        //         return;
        //     }

        //     index = event.target.dataset.index;
        //     linkHolder.href = colorSheets[index].href;

        //     return false;
        // });

        // controlBtn.addEventListener("click", function(event) {
        //     event.target.parentElement.classList.toggle("ColorSwitcher--open");

        //     return false;
        // });

        // colorSwitcher.appendChild(controlBtn);
        // colorSwitcher.appendChild(colorSwitchs);
        // tempCon.appendChild(colorSwitcher);
        // document.body.appendChild(tempCon);
    }

    return {
        init: initColorSwitcher
    };
})();