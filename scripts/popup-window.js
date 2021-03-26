'use strict';

export function centeredPopup(url, winName, w, h, scroll) {
  let popupWindow = null;
  let LeftPosition = (screen.width) ? (screen.width - w) / 2 : 0;
  let TopPosition = (screen.height) ? (screen.height - h) / 2 : 0;
  let settings =
    'height=' + h + ',width=' + w + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll + ',resizable'
  popupWindow = window.open(url, winName, settings)
  return popupWindow;
}