(() => {
  // Theme switch
  const body = document.body;
  const lamp = document.getElementById("mode");

  const toggleTheme = (state) => {
    if (state === "dark") {
      localStorage.setItem("theme", "light");
      body.removeAttribute("data-theme");
    } else if (state === "light") {
      localStorage.setItem("theme", "dark");
      body.setAttribute("data-theme", "dark");
    } else {
      initTheme(state);
    }
  };

  lamp.addEventListener("click", () =>
    toggleTheme(localStorage.getItem("theme"))
  );

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const menuItems = document.getElementById("menu-items");
  const area = document.querySelector(".wrapper");

  if (menuToggle && menuItems) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuItems.classList.remove("is-open");
      if (area) area.classList.remove("blurry");
      document.body.style.overflow = "";
    };

    const openMenu = () => {
      menuToggle.setAttribute("aria-expanded", "true");
      menuItems.classList.add("is-open");
      if (area) area.classList.add("blurry");
      document.body.style.overflow = "hidden";
    };

    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menuItems.querySelectorAll(".menu-link").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }
})();
