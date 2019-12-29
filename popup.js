// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var input;
var loader;
var table;

document.addEventListener('DOMContentLoaded', function() {
input = document.getElementById("gameTitle");
loader = document.getElementById("loader");
table = document.getElementById("resultTable");

input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    var gameTitle = input.value;
    //DEBUG(gameTitle);
    if (gameTitle != ""){
      table.innerHTML = "";
      ShowLoader();
      GetAllGameInfo(gameTitle);
    }
  }
});
});

function ShowLoader()
{
  if (loader == null)
    return;
  loader.style.display = "block";
}

function HideLoader()
{
  if (loader == null)
    return;
  loader.style.display = "none";
}

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
      if (xhr.response.result == "No result")
      {
        HideLoader();
        var row = table.insertRow();
        var indicator = row.insertCell();
        indicator.innerHTML = "No search results found.";
        indicator.style.fontSize = "14pt";
        return;
      }
      var row = table.insertRow();
      var imageURLCell = row.insertCell();
      var platformCell = row.insertCell();
      var titleCell = row.insertCell();
      var scoreCell = row.insertCell();
      imageURLCell.innerHTML = ``;
      platformCell.innerHTML = "<b>platform</b>";
      platformCell.style.fontSize = "18pt";
      titleCell.innerHTML = "<b>title</b>";
      titleCell.style.fontSize = "18pt";
      scoreCell.innerHTML = "<b>score</b>";
      scoreCell.style.fontSize = "18pt";
      xhr.response.result.forEach(function(item){
          var resultTitle = item["title"];
          var platform = item["platform"];
          GetEachScore(resultTitle,platform);
        });
        HideLoader();
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
      AddDataToTable(result.image,platform,gameTitle,result.score,"N/A")
    }
  }
  var convPlatformStr;
  if (platform == "PS4")
  {
    convPlatformStr = "playstation-4";
  }
  else if (platform == "PS3")
  {
    convPlatformStr = "playstation-3";
  }
  else if (platform == "PC")
  {
    convPlatformStr = "pc";
  }
  else if (platform == "XONE")
  {
    convPlatformStr = "xbox-one";
  }
  else if (platform == "X360")
  {
    convPlatformStr = "xbox-360";
  }
  else if (platform == "XBOX")
  {
    convPlatformStr = "xbox";
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
  var row = table.insertRow();
  var imageURLCell = row.insertCell();
  var platformCell = row.insertCell();
  var titleCell = row.insertCell();
  var scoreCell = row.insertCell();
  //var playTimeCell = row.insertCell();
  if (imgURL != null)
    imageURLCell.innerHTML = `<img src=${imgURL}>`;
  platformCell.innerHTML = platform;
  platformCell.style.fontSize = "14pt";
  titleCell.innerHTML = title;
  titleCell.style.fontSize = "14pt";
  if (score != null){
    scoreCell.innerHTML = score;
    scoreCell.style.fontSize = "14pt";
  }
  //playTimeCell.innerHTML = playTime;
  //playTimeCell.style.fontSize = "14pt";
}

