document.addEventListener('DOMContentLoaded', function() {
  const items = [
      "Item1 Alex", "Item2 John", "Item3", "Item4 Jane", "Item5 CSS",
      "Item6 HTML", "Item7 JavaScript", "Item8 PHP", "Item9 Python", "Item10 Ruby",
      "Item11 Java", "Item12 C#", "Item13 C++", "Item14 Swift", "Item15 Go",
      "Item16 Kotlin", "Item17 TypeScript", "Item18 Dart", "Item19 Rust", "Item20 Scala"
  ];

  const itemList = document.getElementById('itemList');
  const searchInput = document.getElementById('searchInput');

  items.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.textContent = item;
      itemList.appendChild(card);
  });

  searchInput.addEventListener('input', function() {
      const query = searchInput.value.toLowerCase();
      const cards = document.querySelectorAll('.card');

      cards.forEach(card => {
          if (card.textContent.toLowerCase().includes(query)) {
              card.classList.remove('hidden');
          } else {
              card.classList.add('hidden');
          }
      });
  });
});
