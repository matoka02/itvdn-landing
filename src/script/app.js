document.addEventListener("DOMContentLoaded", function () {
  /**
   * Header Navigation and Mobile Menu Functionality
   *
   * This script handles the interactive elements in the page header:
   * - Mobile menu toggle (burger button)
   * - Search button expansion in mobile view
   *
   * @module HeaderInteraction
   */

  // const burgerBtn = document.querySelector("header button.burger");
  // const burgerBtnIcons = document.querySelectorAll("header button.burger img");
  const burgerBtn = document.getElementById("toggle-burger-menu");
  const burgerBtnIcons = document.querySelectorAll(
    ".burger-icon-open, .burger-icon-close",
  );
  const mobileNav = document.getElementById("mobile-navigation");

  burgerBtn.addEventListener("click", function () {
    burgerBtnIcons.forEach((icon) => {
      icon.classList.toggle("hidden");
    });

    // document
    //   .querySelector("header .mobile-menu .nav")
    //   .classList.toggle("visible");
    mobileNav.classList.toggle("visible");
  });

  const searchBtn = document.querySelector("header button.search-btn");

  searchBtn.addEventListener("click", function () {
    document
      .querySelector("header .mobile-menu .features .search")
      .classList.toggle("expanded");
  });

  /**
   * Product Cards "Load More/Load Less" Functionality
   *
   * This module handles dynamic loading and unloading of product cards
   * in section 4 of the page. It allows users to progressively reveal
   * more product cards and hide them back with smooth scrolling.
   *
   * @module ProductCardsLoader
   */

  const loadMoreProductCards = document.getElementById("load-more-cards");
  const productCards = document.querySelectorAll(".sec-4-card");
  let visibleCards = getVisibleCardValue();
  let activeVisibleCards = visibleCards;
  let cardToOpen = visibleCards / 2;

  function getVisibleCardValue() {
    return Array.from(productCards).filter(
      (card) => getComputedStyle(card).display !== "none",
    ).length;
  }

  function debounce(func, wait = 100) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, arguments);
      }, wait);
    };
  }

  function showCards() {
    const remainingCards = productCards.length - activeVisibleCards;
    const cardsToShow = Math.min(cardToOpen, remainingCards);

    for (
      let i = activeVisibleCards;
      i < activeVisibleCards + cardsToShow && i < productCards.length;
      i++
    ) {
      productCards[i].style.display = "block";
    }

    activeVisibleCards += cardsToShow;

    if (activeVisibleCards >= productCards.length) {
      loadMoreProductCards.querySelector("span").textContent = "Load Less";
    }
  }

  function hideCards() {
    activeVisibleCards = visibleCards;

    for (let i = productCards.length - 1; i >= visibleCards; i--) {
      productCards[i].style.display = "none";
    }

    loadMoreProductCards.querySelector("span").textContent = "Load More";

    const offset = 60;
    const section = document.querySelector(".sec-4");
    const sectionPosition =
      section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: sectionPosition + offset,
      behavior: "smooth",
    });
  }

  window.addEventListener(
    "resize",
    debounce(() => {
      visibleCards = getVisibleCardValue();
      activeVisibleCards = visibleCards;
      cardToOpen = visibleCards / 2;
    }, 200),
  );

  loadMoreProductCards.addEventListener("click", function () {
    if (activeVisibleCards < productCards.length) {
      showCards();
    } else {
      hideCards();
    }
  });
});
