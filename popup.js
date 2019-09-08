// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("confirmBtn").addEventListener("click", confirmBtnEvent);
});

function DEBUG(message) {
  var bkg = chrome.extension.getBackgroundPage();
  bkg.console.log(message);
}

function confirmBtnEvent() {
  var gameTitle = document.getElementById("gameTitle").value;

  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 1) {
      document.getElementById('content').innerText = 'Loading...';
    }
    else if (xhr.readyState == 4) {
      let score = xhr.response.result.score;
      DEBUG(score);
      if (score == null)
        document.getElementById('content').innerText = `;-( cannot find that game...`;
      else
        document.getElementById('content').innerText = `${gameTitle}'s score is ${score}`;
    }
  }
  var modifiedGameTitle = gameTitle.replace(" ","%20");
  var requestURI = `https://chicken-coop.p.rapidapi.com/games/${modifiedGameTitle}?platform=pc`;
  xhr.open("GET", requestURI);
  xhr.responseType = 'json';
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhr.setRequestHeader("x-rapidapi-host", "chicken-coop.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "c976920022msha45b1a7b96d279ap17e7aejsne930cb2ce86d");
  xhr.send(data);
}

