(function () {
  var body = document.body;
  var page = body.getAttribute("data-page");

  var navLinks = document.querySelectorAll(".site-nav a[data-page]");
  navLinks.forEach(function (link) {
    if (link.getAttribute("data-page") === page) {
      link.classList.add("active");
    }
  });

  var menuToggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".site-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  var revealNodes = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealNodes.forEach(function (node) {
      obs.observe(node);
    });
  } else {
    revealNodes.forEach(function (node) {
      node.classList.add("in");
    });
  }

  var yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = form.querySelector("#name").value.trim();
      var email = form.querySelector("#email").value.trim();
      var message = form.querySelector("#message").value.trim();

      var subject = encodeURIComponent("Portfolio Contact - " + (name || "Website Visitor"));
      var bodyText = encodeURIComponent(
        "Name: " + (name || "") + "\n" +
          "Email: " + (email || "") + "\n\n" +
          "Message:\n" + (message || "")
      );

      window.location.href = "mailto:jingjing@gmail.com?subject=" + subject + "&body=" + bodyText;
    });
  }
})();
