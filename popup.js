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
          var platform = item["platform"];
          DEBUG(`platform is ${platform}`);
          GetEachScore(gameTitle,platform);
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
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 1) {
    }
    else if (xhr.readyState == 4) {
      let result = xhr.response.result;
      DEBUG(`${gameTitle}'s score is ${result.score}`);
      AddDataToTable(result.image,platform,gameTitle,result.score,"13:00")
    }
  }
  var modifiedGameTitle = gameTitle.replace(" ","%20");
  var convPlatformStr;
  if (platform == "PS4")
  {
    convPlatformStr = "playstation-4";
  }
  else if (platform == "PC")
  {
    convPlatformStr = "pc";
  }
  else if (platform == "XONE")
  {
    convPlatformStr = "xbox"
  }
  else if (platform == "Switch")
  {
    convPlatformStr = "switch";
  }
  var requestURI = `https://chicken-coop.p.rapidapi.com/games/${gameTitle}?platform=${convPlatformStr}`;
  xhr.open("GET", requestURI);
  xhr.responseType = 'json';
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhr.setRequestHeader("x-rapidapi-host", "chicken-coop.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "c976920022msha45b1a7b96d279ap17e7aejsne930cb2ce86d");
  xhr.send(data);
}

function AddDataToTable(imgURL,platform,title,score,playTime)
{
  var table = document.getElementById("resultTable");
  var row = table.insertRow();
  var imageURLCell = row.insertCell();
  var platformCell = row.insertCell();
  var titleCell = row.insertCell();
  var scoreCell = row.insertCell();
  var playTimeCell = row.insertCell();

  imageURLCell.innerHTML = `<img src=${imgURL}>`;
  platformCell.innerHTML = platform;
  titleCell.innerHTML = title;
  scoreCell.innerHTML = score;
  playTimeCell.innerHTML = playTime;
}

