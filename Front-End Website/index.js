/**
 * Name: Anthony Chu
 * Date: 10/18/2022
 * Section: CSE 154 AF Max T Bi, Tara Elizabeth Wueger
 *
 * This js file is used to implement the button event and
 * it will change the text and style of content for about.html.
 * It adds a gif at every image and also delete and add some
 * section to the page.
 */
"use strict";
(function() {

  const BORED_API_URL = "http://www.boredapi.com/api/activity/";

  window.addEventListener("load", init);

  /**
   * Set up the button event after the page loads.
   */
  function init() {
    let button = document.querySelector("button");
    button.addEventListener("click", () => {
      hackTheImage();
      hideIntro();
      changeSkills();
      removeList();
      removeStyle();
      makeRequest();
      button.disabled = true;
    });
  }

  /**
   * Request the resource from the Bored API and changes
   * the text for the left sidebar of the page. Has an error
   * handling function to display messages when error occur
   * during the overall process.
   */
  function makeRequest() {
    fetch(BORED_API_URL)
      .then(statusCheck)
      .then(res => res.json())
      .then(textChange)
      .catch(errorHandle);
  }

  /**
   * Changes the text to things to do when bored.
   * @param {Response} res - the given response which has
   * the information about the things to do when bored.
   */
  function textChange(res) {
    let contact = document.getElementById("contact");
    let ed = document.getElementById("education");
    contact.innerHTML = "";
    ed.innerHTML = "";
    let word = document.createElement("p");
    word.textContent = "Bored of getting Rick Rolled? Go do this..";
    contact.appendChild(word);
    ed.textContent = res.activity;
  }

  /**
   * Check if the fetch result is a success or not.
   * @param {Response} response - the given response to check
   * @throws Error if the ok field in the given response is false
   * @returns {Response} the original passed in response if the result
   * fetched the data we want.
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }

  /**
   * Erro handling function when there are problems with the
   * fetch results or textChange. Change the page to the corresponding
   * error message.
   */
  function errorHandle() {
    document.querySelector("body").innerHTML = "";
    let message = document.createElement("p");
    message.textContent = "An error occured while trying the fetch the data" +
    "from the boring things to do API";
    message.classList.add("error");
    document.querySelector("body").appendChild(message);
  }

  /**
   * Change all the image in the page to the desired image
   * after the button has been clicked.
   */
  function hackTheImage() {
    let url = "https://media.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif";
    let images = document.querySelectorAll("img");
    let body = document.querySelector("body");
    for (let i = 0; i < images.length; i++) {
      images[i].src = url;
      images[i].alt = "Rick Rolled!";
    }
    body.classList.add("hacked");
  }

  /**
   * Hide the intro section after the button has been clicked.
   */
  function hideIntro() {
    let intro = document.querySelector("#intro");
    intro.classList.add("display");
  }

  /**
   * Replace the skill section of the page to HACKED!!
   * after the button has been clicked.
   */
  function changeSkills() {
    let word = document.createElement("p");
    word.textContent = "HACKED!!";
    let skills = document.querySelector("#skills");
    let ul = document.querySelector("ul");
    skills.replaceChild(word, ul);
  }

  /**
   * Remove the list bulletpoint description of the page
   * after the button has been clicked.
   */
  function removeList() {
    let experience = document.querySelectorAll("ul");
    for (let i = 0; i < experience.length; i++) {
      experience[i].remove();
    }
  }

  /**
   * Remove the style for the projects after the button
   * has been clicked.
   */
  function removeStyle() {
    let sections = document.querySelectorAll(".project");
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove("project");
      sections[i].classList.add("experience");
    }
  }
})();