document.addEventListener('DOMContentLoaded', function () {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const stars = document.querySelectorAll('.star');

  // List of suspicious words
  const suspiciousTerms = [
    'fake', 'hoax', 'conspiracy', 'cover-up', 'suppressed',
    'they don\'t want you to know', 'mainstream media',
    'wake up', 'sheeple', '100% proven'
  ];

  // Analyze button logic
  analyzeBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "analyze" }, function (response) {
        if (response) {
          updateResults(response.text);
        }
      });
    });
  });

  // Update credibility score & highlight terms
  function updateResults(text) {
    const credibilityScore = Math.floor(Math.random() * 60) + 40; // Mock score
    const foundTerms = suspiciousTerms.filter(term =>
      text.toLowerCase().includes(term.toLowerCase())
    );

    document.getElementById('credibilityScore').textContent =
      `Credibility: ${credibilityScore}%`;
    document.getElementById('biasedTerms').textContent =
      `Biased terms found: ${foundTerms.length}`;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "highlight",
        terms: foundTerms
      });
    });
  }

  // Star rating click handling
  stars.forEach(star => {
    star.addEventListener('click', function () {
      const rating = parseInt(this.getAttribute('data-rating'));

      // Highlight selected stars
      stars.forEach(s => {
        s.classList.remove('active');
        if (parseInt(s.getAttribute('data-rating')) <= rating) {
          s.classList.add('active');
        }
      });

      // Get domain and update localStorage
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = new URL(tabs[0].url);
        const domain = url.hostname;

        const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
        ratings[domain] = ratings[domain] || { total: 0, count: 0 };

        ratings[domain].total += rating;
        ratings[domain].count += 1;

        localStorage.setItem('ratings', JSON.stringify(ratings));

        updateCommunityRating(domain);
      });
    });
  });

  // Show community rating if already exists
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = new URL(tabs[0].url);
    const domain = url.hostname;
    updateCommunityRating(domain);
  });

  // Display average rating and vote count
  function updateCommunityRating(domain) {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
    if (ratings[domain]) {
      const avg = (ratings[domain].total / ratings[domain].count).toFixed(1);
      document.getElementById('communityRating').textContent =
        `Community rating: ${avg}/5 (${ratings[domain].count} votes)`;
    }
  }
});


