"use strict";

var iStyler = (function() {

    function getType(val) {
        return Object.prototype.toString.call(val).slice(8,-1).toLowerCase();
    }
    
    function getSwitch(stylerObj, stylerObjIndex) {
        var stylerSwitch = document.createElement("button");

        stylerSwitch.classList.add("iStyler__switch")
        stylerSwitch.title = stylerObj.title;
        stylerSwitch.dataset.index = stylerObjIndex;
        stylerSwitch.style.backgroundColor = stylerObj.color;
        
        return stylerSwitch;
    }

    function getSiblingSwitches(elem) {
        return Array.prototype.filter.call(elem.parentElement.children, function(child) {
            return (child.nodeName === "BUTTON" && elem !== child);
        });
    }

    function getGroups(stylerGroupedObjs) {
        var stylerGroups, stylerGroupName, stylerGroup, stylerGroupHeading, stylerGroupClass;

        stylerGroups = document.createElement("div");
        stylerGroups.classList.add("iStyler__groups");

        for (stylerGroupName in stylerGroupedObjs) {
            stylerGroup = document.createElement("div");
            stylerGroupHeading = document.createElement("h3");
            stylerGroupHeading.textContent = stylerGroupName;
            stylerGroupHeading.classList.add("iStyler__group-title");
            stylerGroupClass = stylerGroupName.toLowerCase().replace(" ", "-");
            stylerGroup.className = "iStyler__group iStyler__group-" + stylerGroupClass;

            stylerGroup.appendChild(stylerGroupHeading);
            stylerGroup.appendChild(stylerGroupedObjs[stylerGroupName]);
            stylerGroups.appendChild(stylerGroup);
        }

        return stylerGroups;
    }

    function initStyler(stylerArrayOfObjs) {
        var tempContainer, stylerGroupedObjs, stylerContainer, stylerControlBtn, stylerGroups, stylerLinkHtml, stylerLinkRef;

        if ("array" !== getType(stylerArrayOfObjs)) {
            return;
        }

        stylerGroupedObjs = {};

        tempContainer = document.createDocumentFragment();
        
        stylerContainer = document.createElement("div");
        stylerContainer.classList.add("iStyler");

        stylerControlBtn = document.createElement("button");
        stylerControlBtn.classList.add("iStyler__control");

        stylerLinkHtml = document.createElement("link");
        stylerLinkHtml.rel = "stylesheet";
        stylerLinkHtml.id = "iStylerLinkRef";
        document.head.appendChild(stylerLinkHtml);

        stylerLinkRef = document.getElementById("iStylerLinkRef");

        // var colorSwitch;

        // if (stylerObj.color && stylerObj.title && stylerObj.href) {
        //     colorSwitch = document.createElement("button");

        //     colorSwitch.classList.add("iStyler__switch")
        //     colorSwitch.title = stylerObj.title;
        //     colorSwitch.dataset.index = index;
        //     colorSwitch.style.backgroundColor = stylerObj.color;
            
        //     stylerGroups.appendChild(colorSwitch);
        // }
        
        // stylerArrayOfObjs.forEach(function(stylerObj, index) {            
        //     if ((stylerObj.color || stylerObj.thumb) && stylerObj.title && stylerObj.href) {
        //         var group = stylerObj.group || "Color Scheme";

        //         stylerObj.group = group;

        //         if (!stylerGroupedObjs[group]) {
        //             stylerGroupedObjs[group] = [getSwitch(stylerObj, index)];
        //         } else {
        //             stylerGroupedObjs[group].push(getSwitch(stylerObj, index));
        //         }
        //     }
        // });
        
        stylerArrayOfObjs.forEach(function(stylerObj, stylerObjIndex) {            
            if ((stylerObj.color || stylerObj.thumb) && stylerObj.title && stylerObj.src) {
                var group;

                group = stylerObj.group || "Color Scheme";
                stylerObj.group = group;

                if (!stylerGroupedObjs[group]) {
                    stylerGroupedObjs[group] = document.createDocumentFragment();
                    stylerGroupedObjs[group].appendChild(getSwitch(stylerObj, stylerObjIndex));
                    // console.log(getSwitch(stylerObj, stylerObjIndex));
                } else {
                    stylerGroupedObjs[group].appendChild(getSwitch(stylerObj, stylerObjIndex));
                    // console.log(getSwitch(stylerObj, stylerObjIndex));
                }
            }
        });

        stylerGroups = getGroups(stylerGroupedObjs);

        // console.log(stylerGroups);

        

        // console.log(stylerGroups);
        // stylerContainer.appendChild(stylerGroups);

        stylerGroups.addEventListener("click", function(event) {
            var stylerSwitch, src, index;

            stylerSwitch = event.target;

            if (stylerSwitch.nodeName !== "BUTTON") {
                return;
            }

            index = stylerSwitch.dataset.index;
            src = stylerArrayOfObjs[index].src;

            if ("string" === getType(src)) {
                stylerLinkRef.href = src;
            } else if ("function" === getType(src)) {
                src(event, stylerLinkRef);
            }

            stylerSwitch.classList.add("iStyler__switch--active");
            
            getSiblingSwitches(stylerSwitch).forEach(function(siblingSwitch) {
                siblingSwitch.classList.remove("iStyler__switch--active");
            });

            return false;
        });

        stylerControlBtn.addEventListener("click", function(event) {
            event.target.parentElement.classList.toggle("iStyler--open");

            return false;
        });

        stylerContainer.appendChild(stylerControlBtn);
        stylerContainer.appendChild(stylerGroups);
        tempContainer.appendChild(stylerContainer);
        document.body.appendChild(tempContainer);
    }



    return {
        init: initStyler
    };
})();