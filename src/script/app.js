/**
 * Header Navigation and Mobile Menu Functionality
 * 
 * This script handles the interactive elements in the page header:
 * - Mobile menu toggle (burger button)
 * - Search button expansion in mobile view
 * 
 * @module HeaderInteraction
 */

document.addEventListener("DOMContentLoaded", function () {
  const burgerBtn = document.querySelector("header button.burger");
  const burgerBtnIcons = document.querySelectorAll("header button.burger img");

  burgerBtn.addEventListener("click", function () {
    burgerBtnIcons.forEach((icon) => {
      icon.classList.toggle("hidden");
    });

    document
      .querySelector("header .mobile-menu .nav")
      .classList.toggle("visible");
  });

  const searchBtn = document.querySelector("header button.search-btn");

  searchBtn.addEventListener("click", function () {
    document
      .querySelector("header .mobile-menu .features .search")
      .classList.toggle("expanded");
  });
});
