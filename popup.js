// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  GetAllGameInfo("Death Stranding");
});

function DEBUG(message) {
  var bkg = chrome.extension.getBackgroundPage();
  chrome.extension.getBackgroundPage().console.log(message);
}

function GetAllGameInfo(gameTitle,data)
{
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 1) {
    }
    else if (xhr.readyState == 4) {
      xhr.response.result.forEach(function(item){
          DEBUG(`title is ${item["title"]}, platform is ${item["platform"]}`);
      });
      return xhr.response.result;
    }
  }
  var requestURI = `https://chicken-coop.p.rapidapi.com/games?title=${gameTitle}`;
  xhr.open("GET", requestURI);
  xhr.responseType = 'json';
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhr.setRequestHeader("x-rapidapi-host", "chicken-coop.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "c976920022msha45b1a7b96d279ap17e7aejsne930cb2ce86d");
  xhr.send(data);
}

function GetEachScore(gameTitle, platform) {
  var gameTitle = document.getElementById("gameTitle").value;

  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 1) {
    }
    else if (xhr.readyState == 4) {
      let score = xhr.response.result.score;
      DEBUG(score);
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

