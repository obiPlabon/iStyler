"use strict";

var ColorSwitcher = (function() {
    
    function generateSwitch(colorSheet, index) {
        var colorSwitch = document.createElement("button");

        colorSwitch.classList.add("iStyler__switch")
        colorSwitch.title = colorSheet.title;
        colorSwitch.dataset.index = index;
        colorSwitch.style.backgroundColor = colorSheet.color;
        
        return colorSwitch;
    }

    function initColorSwitcher(colorSheets) {
        var tempCon, groupedSheets, colorSwitcher, controlBtn, colorSwitchs, linkHolderHtml, linkHolder;

        if (Object.prototype.toString.call(colorSheets) !== "[object Array]") {
            return;
        }

        groupedSheets = {};

        tempCon = document.createDocumentFragment();
        
        colorSwitcher = document.createElement("div");
        colorSwitcher.classList.add("iStyler");

        controlBtn = document.createElement("button");
        controlBtn.classList.add("iStyler__control");

        colorSwitchs = document.createElement("div");
        colorSwitchs.classList.add("iStyler__groups");

        linkHolderHtml = document.createElement("link");
        linkHolderHtml.rel = "stylesheet";
        linkHolderHtml.id = "iStylerLinkHolder";
        document.head.appendChild(linkHolderHtml);

        linkHolder = document.getElementById("iStylerLinkHolder");

        // var colorSwitch;

        // if (colorSheet.color && colorSheet.title && colorSheet.href) {
        //     colorSwitch = document.createElement("button");

        //     colorSwitch.classList.add("iStyler__switch")
        //     colorSwitch.title = colorSheet.title;
        //     colorSwitch.dataset.index = index;
        //     colorSwitch.style.backgroundColor = colorSheet.color;
            
        //     colorSwitchs.appendChild(colorSwitch);
        // }
        
        // colorSheets.forEach(function(colorSheet, index) {            
        //     if ((colorSheet.color || colorSheet.thumbnail) && colorSheet.title && colorSheet.href) {
        //         var group = colorSheet.group || "Color Scheme";

        //         colorSheet.group = group;

        //         if (!groupedSheets[group]) {
        //             groupedSheets[group] = [generateSwitch(colorSheet, index)];
        //         } else {
        //             groupedSheets[group].push(generateSwitch(colorSheet, index));
        //         }
        //     }
        // });
        
        colorSheets.forEach(function(colorSheet, index) {            
            if ((colorSheet.color || colorSheet.thumbnail) && colorSheet.title && colorSheet.href) {
                var group = colorSheet.group || "Color Scheme";

                colorSheet.group = group;

                if (!groupedSheets[group]) {
                    groupedSheets[group] = document.createDocumentFragment();
                    groupedSheets[group].appendChild(generateSwitch(colorSheet, index));
                } else {
                    groupedSheets[group].appendChild(generateSwitch(colorSheet, index));
                    // groupedSheets[group].push(generateSwitch(colorSheet, index));
                }
            }
        });

        // console.log(groupedSheets);

        for (var gs in groupedSheets) {
            var div = document.createElement("div");
            var heading = document.createElement("h3");
            heading.classList.add("iStyler__group-title");
            heading.textContent = gs;
            div.appendChild(heading);
            div.classList.add("iStyler__"+gs.toLowerCase().replace(" ", "-"));

            div.appendChild(groupedSheets[gs]);

            // groupedSheets[gs].forEach(function(iStylerSwitch) {
            //     div.appendChild(iStylerSwitch);
            // });
            colorSwitchs.appendChild(div);
        }
        // console.log(colorSwitchs);
        // colorSwitcher.appendChild(colorSwitchs);

        // colorSwitchs.addEventListener("click", function(event) {
        //     var index;

        //     if (event.target.nodeName !== "BUTTON") {
        //         return;
        //     }

        //     index = event.target.dataset.index;
        //     linkHolder.href = colorSheets[index].href;

        //     return false;
        // });

        controlBtn.addEventListener("click", function(event) {
            event.target.parentElement.classList.toggle("iStyler--open");

            return false;
        });

        colorSwitcher.addEventListener("blur", function() {
            // this.classList.toggle("iStyler--open");
            console.log("workig");
        });

        colorSwitcher.appendChild(controlBtn);
        colorSwitcher.appendChild(colorSwitchs);
        tempCon.appendChild(colorSwitcher);
        document.body.appendChild(tempCon);
    }

    return {
        init: initColorSwitcher
    };
})();