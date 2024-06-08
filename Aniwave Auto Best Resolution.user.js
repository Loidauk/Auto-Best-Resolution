// ==UserScript==
// @name         Aniwave Auto Best Resolution
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Automatcially select the highest resolution on vidplay/mycloud streams
// @author       Loidauk / TellerMoose
// @match        https://vidplay.online/*
// @match        https://mcloud.bz/*
// @match        https://embtaku.pro/*
// @match        https://ea1928580f.site/*
// @match        https://a9bfed0818.nl/*
// @match        https://vid142.site/*
// @match        https://megacloud.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aniwave.to
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/487541/Aniwave%20Auto%20Best%20Resolution.user.js
// @updateURL https://update.greasyfork.org/scripts/487541/Aniwave%20Auto%20Best%20Resolution.meta.js
// ==/UserScript==

(async () => {
    'use strict';

    function waitForElement(selector, baseElement = document.body) {
        return new Promise(resolve => {
            if (baseElement.querySelector(selector)) {
                return resolve(baseElement.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (baseElement.querySelector(selector)) {
                    resolve(baseElement.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(baseElement, {
                childList: true,
                subtree: true
            });
        });
    }

    // Once the settings button is loaded, we know the player is loaded
    const settingsButtonSelector = 'div.jw-icon.jw-icon-inline.jw-button-color.jw-reset.jw-icon-settings.jw-settings-submenu-button';
    await waitForElement(settingsButtonSelector);

    // Set the quality to the highest with the jwplayer api
    const player = jwplayer();
    // 0 = auto, 1 = highest
    player.on('firstFrame', () => player.setCurrentQuality(1));
})();
