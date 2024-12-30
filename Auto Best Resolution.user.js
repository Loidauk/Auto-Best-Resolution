// ==UserScript==
// @name         Auto Best Resolution
// @namespace    http://github.com/
// @version      1.13
// @description  Automatcially select the highest resolution
// @author       Loidauk
// @match        https://mcloud.bz/*
// @match        https://vid2a41.site/*
// @match        https://megacloud.tv/*
// @match        https://1azayf9w.xyz/*
// @match        https://vidco.pro/*
// @match        https://embtaku.pro/*
// @match        https://embtaku.com/*
// @match        https://awish.pro/*
// @match        https://megaf.cc/*
// @match        https://vidsrc.cc/*
// @match        https://*.bunniescdn.online/*
// @icon         https://raw.githubusercontent.com/Loidauk/Auto-Best-Resolution/refs/heads/main/Images/Icon.png
// @grant        none
// @license      MIT
// @downloadURL https://github.com/Loidauk/Auto-Best-Resolution/raw/refs/heads/main/Auto%20Best%20Resolution.user.js
// @updateURL https://github.com/Loidauk/Auto-Best-Resolution/raw/refs/heads/main/Auto%20Best%20Resolution.user.js
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
